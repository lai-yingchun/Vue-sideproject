<template>
  <el-row  id="header" justify="center">
    <el-col :span="10" :offset="9"><img :src="logo" class="titleImg"></el-col>
  </el-row>

  <el-row id="inputGroup" justify="center">
    <el-col :span="5" :offset="7"><el-input maxlength="4" placeholder="ex:1234" v-model="guess" :readonly="isReadOnly" @keyup.enter="checkGuess" class="guessTextbox"></el-input></el-col>
    <el-col :span="12">
      &nbsp;
      <el-button id="enterBtn" :disabled="!isValidGuess" @click="checkGuess" class="btn">Enter</el-button>
      <el-button id="answerBtn" @click="showAnswer" class="btn">Answer</el-button>
      <el-button id="reloadBtn" @click="reloadPage" class="btn">Reload</el-button>
    </el-col>
  </el-row>

  <el-row id="inputGroup">
    <el-col :span="8" :offset="8">
      <div id="timer">{{ formattedTime }}</div>
    </el-col>
  </el-row>

  <el-row id="inputGroup">
    <el-col :span="8" :offset="8">
      <div id="history" v-for="record in history" :key="record.text">
        {{ record }}
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { ElButton, ElInput, ElMessageBox } from 'element-plus';
export default {
  components: {
    ElButton,
    ElInput,
  },
  data() {
    return {
      logo: "https://purplefirestudio.cc/wp-content/uploads/2022/05/1024x500logo-transparent.png",
      number : [],
      guess: "",
      isValidGuess: false,
      isReadOnly : false,
      history : [],
      answer : null,
      allGuess : [],
      count: 0,
      formattedTime: ''
    };
  },
  // 長度檢查
  watch: {
    guess(newGuess) {
      this.isValidGuess = newGuess.length === 4;
    },
  },
  // 產生答案
  mounted() {
    this.createAnswer();
    this.startTimer();
  },
  methods: {
    createAnswer(){
      const number = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      let randomNumbers = [];
      while (randomNumbers.length < 4){
        const randomNum = Math.floor(Math.random() * number.length);
        if(!randomNumbers.includes(randomNum)){
          randomNumbers.push(randomNum);
        }
      }
      this.answer = randomNumbers.join('');
    },
    checkGuess() {
      // 檢查重複
      if (this.allGuess.includes(this.guess)) {
        ElMessageBox.alert('已輸入相同的猜測', 'Error',{
          confirmButtonText: 'OK',
          callback: action => {
            console.log(action);
          },
          type: 'error'
        });
        this.guess = "";
        return;
      }
      // 檢查英文輸入
      let engRemove = this.guess.replace(/[^\d]/g, '');
      if(this.guess != engRemove){
        ElMessageBox.alert('請輸入數字', 'Error',{
          confirmButtonText: 'OK',
          callback: action => {
            console.log(action);
          },
          type: 'error'
        });
        this.guess = "";
        return;  
      }
      //輸入相同數字
      for (let i = 0; i < 4; i++){
        for(let j = i+1; j < 4; j++){
          if (this.guess[i] === this.guess[j]){
            ElMessageBox.alert('請輸入不同數字', 'Error',{
              confirmButtonText: 'OK',
              callback: action => {
                console.log(action);
              },
              type: 'error'
            });
            this.guess = "";
            return;
          }
        }
      }
      // 計算AB
      let numA = 0;
      let numB = 0;
      for (let i = 0; i < 4; i++) {
        if (this.guess[i] === this.answer[i]) {
          numA++;
        } else if (this.answer.includes(this.guess[i])) {
          numB++;
        }
      }
      this.count++;
      const record = `${this.count}. ${this.guess}   ${numA}A${numB}B`;
      this.history.push(record);
      this.allGuess.push(this.guess);
      if (numA === 4) {
        this.pauseTimer();
        this.history.push("恭喜答對");
        this.isReadOnly = true;
        setTimeout(() => {
          ElMessageBox.confirm(`花費時間 : ${this.formattedTime}  答題次數 : ${this.count}`,'WIN', {
            confirmButtonText: 'Again',
            cancelButtonText: 'Cancel',
            type: 'success'
          })
          .then(() => {
            console.log('Item reload.');
            location.reload();
          })
          .catch(() => {
            console.log('Item reload canceled.');
          });
        }, 500);
      }
      this.guess = "";
    },
    // 顯示答案
    showAnswer() {
      ElMessageBox.alert('Answer : '+this.answer, 'Answer', {
        confirmButtonText: 'OK',
        callback: action => {
          console.log(action);
        },
        type:'info'
      });
    },
    // 重整
    reloadPage() {
      ElMessageBox.confirm('確定要重新開始遊戲？', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
      .then(() => {
        console.log('Item reload.');
        location.reload();
      })
      .catch(() => {
        console.log('Item reload canceled.');
      });
    },
    // 計時
    updateTimer() {
      const currentTime = new Date().getTime();
      const timeDiff = currentTime - this.startTime;
      const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDiff / 1000) % 60);
      this.formattedTime = this.formatTime(hours) + ':' + this.formatTime(minutes) + ':' + this.formatTime(seconds);
    },
    formatTime(time) {
      return time < 10 ? '0' + time : time;
    },
    startTimer() {
      this.startTime = new Date().getTime();
      this.updateTimer();
      this.timerInterval = setInterval(this.updateTimer, 1000);
    },
    pauseTimer() {
      clearInterval(this.timerInterval);
    },
  },
};
</script>
  
<style scoped>
.btn {
  border-radius: 55px;
}

.btn:not([disabled]):hover {
  background-color: #004B97;
  color: white;
}

.titleImg {
  height: 36px;
  width: 72px;
}
#header {
  background-color: #004B97;
  height: 36px;
}

#inputGroup{
  margin-top: 20px;
}
#history{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: monospace;
  font-size: 18px;
}
#timer{
  font-family: monospace;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
  