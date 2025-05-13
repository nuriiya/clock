<template>
  <div class="value-editor">
    <div v-for="item in items" :key="item.id" class="editor-row">
      <span class="tag">{{ item.label }}</span>
      <div class="value-control">
        <button @click="decrement(item)">-</button>
        <input
          type="number"
          v-model.number="item.value"
          step="item.step"
          readonly
          @click="showKeyboard(item)"
        />
        <button @click="increment(item)">+</button>
      </div>
    </div>
    
    <!-- 虚拟键盘 -->
    <div v-if="showKeypad" class="keypad-overlay" @click.self="hideKeyboard">
      <div class="virtual-keypad">
        <div class="keypad-display">{{ inputValue }}</div>
        <div class="keypad-grid">
          <button
            v-for="n in 9"
            :key="n"
            @click="appendNumber(n)"
          >{{ n }}</button>
          <button @click="appendDot()">.</button>
          <button @click="appendNumber(0)">0</button>
          <button @click="deleteLast()">&larr;</button>
        </div>
        <button class="confirm-btn" @click="confirmInput">完成</button>
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
        { id: 1, label: '血糖值(mmol/L)', value: 5.0, step: 0.1 },
        { id: 2, label: '胰岛素剂量(U)', value: 10.0, step: 0.5 },
        { id: 3, label: '距离用餐时间(小时)', value: 0.0, step: 0.5 }
      ],
      showKeypad: false,
      currentItem: null,
      inputValue: '0'
    }
  },
  methods: {
    showKeyboard(item) {
      this.currentItem = item;
      this.inputValue = item.value.toString();
      this.showKeypad = true;
    },
    hideKeyboard() {
      this.showKeypad = false;
      this.currentItem = null;
    },
    appendNumber(n) {
      if (this.inputValue === '0') {
        this.inputValue = n.toString();
      } else {
        this.inputValue += n.toString();
      }
      this.formatInput();
    },
    appendDot() {
      if (!this.inputValue.includes('.')) {
        this.inputValue += '.';
      }
    },
    deleteLast() {
      this.inputValue = this.inputValue.slice(0, -1);
      if (this.inputValue === '') this.inputValue = '0';
      this.formatInput();
    },
    formatInput() {
      // 处理多余的小数点
      if (this.inputValue.endsWith('.') && this.inputValue.split('.').length > 2) {
        this.inputValue = this.inputValue.slice(0, -1);
      }
      // 限制小数位数
      if (this.inputValue.includes('.')) {
        const parts = this.inputValue.split('.');
        this.inputValue = parts[0] + '.' + parts[1].slice(0, 1);
      }
    },
    confirmInput() {
      const value = parseFloat(this.inputValue);
      if (!isNaN(value)) {
        this.currentItem.value = Math.max(0, parseFloat(value.toFixed(1)));
      }
      this.hideKeyboard();
    },
    increment(item) {
      item.value = parseFloat((item.value + item.step).toFixed(1));
    },
    decrement(item) {
      item.value = Math.max(0, parseFloat((item.value - item.step).toFixed(1)));
    },
    async submitData() {
      const payload = {
        timestamp: new Date().toISOString(),
        data: this.items.reduce((acc, cur) => {
          acc[cur.label] = cur.value;
          return acc;
        }, {})
      };

      try {
        const response = await axios.post('/api/save', payload);
        alert(`数据保存成功！\n${JSON.stringify(response.data, null, 2)}`);
      } catch (error) {
        alert(`保存失败: ${error.response?.data?.message || error.message}`);
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

.value-control input {
  width: 100px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px;
  font-size: 16px;
  background-color: white;
}

/* 虚拟键盘样式 */
.keypad-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.virtual-keypad {
  background: white;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.keypad-display {
  text-align: center;
  font-size: 24px;
  padding: 15px;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.keypad-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 15px;
}

.keypad-grid button {
  padding: 20px;
  font-size: 24px;
  border-radius: 8px;
  background: #12d422;
  border: none;
}

.keypad-grid button:active {
  background: #e9ecef;
}

.confirm-btn {
  width: 100%;
  padding: 15px;
  background-color: #42b983;
  color: white;
  font-size: 18px;
  border-radius: 8px;
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