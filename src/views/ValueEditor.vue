<template>
    <div class="value-editor">
      <div v-for="item in items" :key="item.id" class="editor-row">
        <span class="tag">{{ item.label }}</span>
        <div class="value-control">
          <button @click="decrement(item)">-</button>
          <input type="number" v-model.number="item.value" step="0.1" readonly />
          <button @click="increment(item)">+</button>
        </div>
      </div>
      <button class="submit-btn" @click="submitData">提交数据</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ValueEditor',
    data() {
      return {
        items: [
          { id: 1, label: '血糖值(mmol/L)', value: 5.0 },
          { id: 2, label: '胰岛素剂量(U)', value: 10.0 },
          { id: 3, label: '心率(bpm)', value: 75.0 }
        ]
      }
    },
    methods: {
      increment(item) {
        item.value = parseFloat((item.value + 0.1).toFixed(1))
      },
      decrement(item) {
        const newVal = item.value - 0.1
        item.value = newVal >= 0 ? parseFloat(newVal.toFixed(1)) : 0.0
      },
      async submitData() {
        const payload = {
          timestamp: new Date().toISOString(),
          data: this.items.reduce((acc, cur) => {
            acc[cur.label] = cur.value
            return acc
          }, {})
        }
  
        try {
          const response = await axios.post('/api/save', payload)
          alert(`数据保存成功！\n${JSON.stringify(response.data, null, 2)}`)
        } catch (error) {
          alert(`保存失败: ${error.response?.data?.message || error.message}`)
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .value-editor {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 8px;
  }
  
  .editor-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 0;
    padding: 10px;
    background-color: #f8f9fa;
    border-radius: 4px;
  }
  
  .tag {
    font-weight: bold;
    color: #2c3e50;
  }
  
  .value-control {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .value-control input {
    width: 60px;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 4px;
  }
  
  button {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    background-color: #42b983;
    color: white;
    cursor: pointer;
  }
  
  button:hover {
    opacity: 0.9;
  }
  
  button:active {
    transform: scale(0.98);
  }
  
  .submit-btn {
    display: block;
    width: 100%;
    padding: 12px;
    margin-top: 20px;
    font-size: 16px;
  }
  </style>