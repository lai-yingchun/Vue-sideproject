<template>
    <el-row id="header">
        <el-col :span="4" :offset="8">
            <el-input v-model="newTodo" placeholder="Ex:Anything" maxlength="10" @keyup.enter="addTodo" class="newTodo"></el-input>
        </el-col>
        <el-col :span="12" >
            &nbsp;
            <el-button :disabled="!isValidTodo" @click="addTodo" id="enterBtn">add Todo</el-button>
            <el-button @click="hideCompleted" id="hide" v-show="hideButton">Hide completed</el-button>
            <el-button  @click="showAll" id="show" v-show="showButton">Show All</el-button>
        </el-col>
    </el-row>
        <el-col>
            <li  v-for="(todo, index) in toDos" :key="index" :class="{'hideList': todo.hided, 'showList': !todo.hided}">
                <template v-if="!todo.editing">
                    <el-checkbox v-model="todo.finished" name="finishCheck"></el-checkbox>
                    <label :class="{'line': todo.finished, 'noLine': !todo.finished}" name="tasks">{{ todo.task }}</label>&nbsp;
                    <el-button @click="edit(index)" class="edit">Edit</el-button>&nbsp;
                    <label class="changeText">{{ todo.day }}</label>
                    <el-button @click="cancel(index)" class="btn" circle>X</el-button>        
                </template>
                <template v-if="todo.editing">
                    <el-input v-model="todo.task" maxlength="10" class="editTodo"></el-input>&nbsp;
                    <el-button @click="done(index)" class="done">Done</el-button>
                    <el-button @click="cancel(index)" class="btn" circle>X</el-button>   
                </template>      
            </li>
        </el-col>
</template>
<script>
import dayjs from 'dayjs';
import { ElButton, ElInput, ElCheckbox, ElMessageBox } from 'element-plus';
export default {
    components: {
        ElButton,
        ElInput,
        ElCheckbox,
    },
  data() {
    return {
      newTodo: '',
      toDos: [{
        task: 'aaaa',
        editing: false,
        hided: false, 
        day :dayjs(new Date).format('YYYY/MM/DD')
      }],
      showButton: false,
      hideButton: true,
      isValidTodo : false,
      original: "",
    };
  },
  watch: {
    // 長度檢查
    newTodo(newItem) {
      this.isValidTodo = newItem.length >= 1;
    },
  },
  methods: {
    //添加
    addTodo() {
        if(this.newTodo.trim() === ''){
            ElMessageBox.alert('Write Something!', 'Error', {
                confirmButtonText: 'OK',
                callback: action => {
                console.log(action);
                },
                type :'error'
            });
            this.newTodo = '';
            return;
        }
        this.toDos.push({
            task: this.newTodo.trim(),
            hided: false,
            editing: false,
            day :dayjs(new Date).format('YYYY/MM/DD')
        });
        this.newTodo = '';
    },
    cancel(index) {
        ElMessageBox.confirm('Are you sure to delete this item?', 'Delete', {
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            type: 'warning'
        })
        .then(() => {
            console.log('Item deleted.');
            this.toDos.splice(index, 1);
        })
        .catch(() => {
            console.log('Item deletion canceled.');
        });
    },
    hideCompleted() {
        this.showButton = true;
        this.hideButton = false;
        const finishCheck = document.getElementsByName('finishCheck');
        for(let i=0;i<finishCheck.length;i++){
            if(finishCheck[i].checked){
                this.toDos[i].hided = true;
            }
        }
    },
    showAll() {
        this.showButton = false;
        this.hideButton = true;
        const finishCheck = document.getElementsByName('finishCheck');
        for(let i=0;i<finishCheck.length;i++){
            if(finishCheck[i].checked){
                this.toDos[i].hided = false;
            }
        }
    },
    edit(index) {
        this.original = this.toDos[index].task;
        this.toDos[index].editing = true;
    },
    done(index){
        this.toDos[index].editing = false;
        if(this.toDos[index].task.trim() === ''){
            ElMessageBox.alert('Write Something!', 'Error', {
                confirmButtonText: 'OK',
                callback: action => {
                console.log(action);
                },
                type:'error'
            });
            this.toDos[index].task = this.original;
        }
    },
  },
};
</script>

<style scoped>
.newTodo{
    height: 25px;
}
.editTodo{
    height: 25px;
    width: 150px;
}
#header{
    display: flex;
    justify-content: center;
    align-items: center;
    background: #004B97;
    flex-wrap: wrap;
    height: 36px;
}
div li {
    padding: 12px 8px 12px 40px;
    background: #ECF5FF;
    font-size: 18px;
    text-align: left;
}
div li:nth-child(odd){
    background: #C4E1FF;
}
div li:hover {
    background: #97CBFF;
}
.btn {
    background-color: #004B97;
    border: none;
    color: white;
    font-size: 10px;
    float: right;
    width: 20px;
    height: 20px;
}
#enterBtn:disabled{
    cursor: not-allowed;
    background-color: #ADADAD;
    border: 1px solid #4F4F4F;
    color: white;
    padding: 2px;
    text-align: center;
    display: inline-block;
    font-size: 16px;
    border-radius: 5%;
    height: 25px;
}
#enterBtn:not([disabled]){
    cursor: pointer;
    background-color: #7373B9;
    border: 1px solid #5A5AAD;
    color: white;
    padding: 2px;
    text-align: center;
    display: inline-block;
    font-size: 16px;
    border-radius: 5%;
    height: 25px;
}
#hide{
    background-color: #7373B9;
    border: 1px solid #5A5AAD;
    color: white;
    padding: 2px;
    text-align: center;
    display: inline-block;
    font-size: 16px;
    border-radius: 5%;
    height: 25px;
}
#show{
    background-color: #46A3FF;
    border: 1px solid #5A5AAD;
    color: white;
    padding: 2px;
    text-align: center;
    display: inline-block;
    font-size: 16px;
    border-radius: 5%;
    height: 25px;
}
.noLine{
    text-decoration:none;
    font-family: monospace;
    font-size: 20px;  
}
.line{
    text-decoration : line-through;
    font-family: monospace;
    font-size: 20px;
}
.showList{
    display:""; 
}
.hideList{
    display:none; 
}
input[type=text]:focus {
    border: 1.5px solid #7373B9;
}
.edit{
    background-color: #004B97;
    border: none;
    color: white;
    font-size: 10px;
    border-radius: 5%;
    width: 40px;
    height: 15px;
}
.done{
    background-color: #004B97;
    border: none;
    color: white;
    font-size: 10px;
    border-radius: 5%;
    width: 40px;
    height: 20px;
}
.changeText{
    font-family: sans-serif;
    font-size: 15px;
}
</style>