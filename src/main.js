import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

// const express = require('express')
// const { createObjectCsvWriter } = require('csv-writer')
// const fs = require('fs')
// const path = require('path')
// const App = express()





// App.use(express.json())

// // 创建CSV文件（如果不存在）
// const csvPath = path.join(__dirname, 'data.csv')
// if (!fs.existsSync(csvPath)) {
//   fs.writeFileSync(csvPath, '')
// }

// const csvWriter = createObjectCsvWriter({
//   path: csvPath,
//   header: [
//     { id: 'timestamp', title: 'Timestamp' },
//     { id: 'blood_glucose', title: '血糖值(mmol/L)' },
//     { id: 'insulin', title: '胰岛素剂量(U)' },
//     { id: 'heart_rate', title: '心率(bpm)' }
//   ],
//   Append: true
// })

// App.post('/api/save', async (req, res) => {
//   try {
//     const { data, timestamp } = req.body
    
//     const record = {
//       timestamp,
//       blood_glucose: data['血糖值(mmol/L)'],
//       insulin: data['胰岛素剂量(U)'],
//       heart_rate: data['心率(bpm)']
//     }

//     await csvWriter.writeRecords([record])
    
//     res.json({
//       status: 'success',
//       message: 'Data saved to CSV',
//       data: record
//     })
//   } catch (error) {
//     res.status(500).json({
//       status: 'error',
//       message: error.message
//     })
//   }
// })