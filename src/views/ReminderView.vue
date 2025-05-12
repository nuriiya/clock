<template>
  <div class="reminder-container">
    <h1>用药提醒系统</h1>
    <div class="reminder-list">
      <div
        v-for="(reminder, index) in reminders"
        :key="index"
        class="reminder-item"
      >
        <div class="time">{{ reminder.time }}</div>
        <div class="message">{{ reminder.message }}</div>
      </div>
    </div>
    <button @click="triggerCall" class="call-button">立即测试通话</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'ReminderView',
  data() {
    return {
      reminders: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get("/api/reminders");
      this.reminders = response.data;
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  },
  methods: {
    async triggerCall() {
      try {
        await axios.post("/api/call");
        alert("通话请求已发送");
      } catch (error) {
        alert("通话请求失败");
      }
    },
  },
};
</script>

<style scoped>
.reminder-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 20px;
}

.reminder-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #eee;
  border-radius: 4px;
}

.call-button {
  background-color: #42b983;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
</style>
