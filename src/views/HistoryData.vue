<template>
  <div class="history-container">
    <h2>健康数据历史记录</h2>
    
    <!-- 加载状态 -->
    <div v-if="loading" class="loading">
      <span class="loader"></span> 正在加载数据...
    </div>

    <!-- 数据表格 -->
    <div v-else-if="records.length > 0" class="data-table">
      <table>
        <thead>
          <tr>
            <th v-for="header in headers" :key="header">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, index) in records" :key="index">
            <td>{{ formatDate(record.Timestamp) }}</td>
            <td>{{ record['血糖值(mmol/L)'] }}</td>
            <td>{{ record['胰岛素剂量(U)'] }}</td>
            <td>{{ record['心率(bpm)'] }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 空状态 -->
    <div v-else class="empty-state">
      <span class="icon">📭</span>
      <p>暂无历史数据</p>
    </div>

    <!-- 错误提示 -->
    <div v-if="error" class="error-message">
      <span class="icon">⚠️</span>
      {{ error }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HistoryData',
  data() {
    return {
      loading: true,
      records: [],
      headers: ['时间戳', '血糖值(mmol/L)', '胰岛素剂量(U)', '心率(bpm)'],
      error: null
    };
  },
  async mounted() {
    try {
      const response = await axios.get('/api/history');
      this.records = response.data;
      console.log('response.data: \n', response.data);
    } catch (err) {
      this.error = `数据加载失败: ${err.response?.data?.message || err.message}`;
      console.error('API Error:', err);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    formatDate(isoString) {
      return new Date(isoString).toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    }
  }
};
</script>

<style scoped>
.history-container {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px;
  color: #666;
}

.loader {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid #f3f3f3;
  border-radius: 50%;
  border-top: 3px solid #3498db;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.data-table {
  overflow-x: auto;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
}

tr:hover {
  background-color: #f5f5f5;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #666;
}

.empty-state .icon {
  font-size: 48px;
  display: block;
  margin-bottom: 10px;
}

.error-message {
  color: #dc3545;
  background: #f8d7da;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #f5c6cb;
  margin-top: 20px;
}
</style>