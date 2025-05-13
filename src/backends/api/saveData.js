const express = require('express');
const bodyParser = require('body-parser');
const { createObjectCsvWriter } = require('csv-writer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
console.log("i am called")
// 允许跨域
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.json());

// 确保CSV文件存在
const csvPath = path.join(__dirname, 'health_data.csv');
const csvHeader = [
  { id: 'timestamp', title: 'Timestamp' },
  { id: '血糖值(mmol/L)', title: '血糖值(mmol/L)' },
  { id: '胰岛素剂量(U)', title: '胰岛素剂量(U)' },
  { id: '心率(bpm)', title: '心率(bpm)' }
];

// 初始化CSV文件
if (!fs.existsSync(csvPath)) {
  fs.writeFileSync(csvPath, csvHeader.map(h => h.title).join(',') + '\n');
}

app.post('/api/save', async (req, res) => {
  try {
    const csvWriter = createObjectCsvWriter({
      path: csvPath,
      header: csvHeader,
      append: true
    });

    const record = {
      timestamp: req.body.timestamp,
      ...req.body.data
    };

    await csvWriter.writeRecords([record]);
    
    res.status(200).json({
      message: '数据保存成功',
      data: record
    });
  } catch (error) {
    res.status(500).json({
      message: '保存失败',
      error: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});