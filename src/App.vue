<template>
  <div class="container">
    <button @click="handleShow(1)" class="bookmark">1A2B</button>&nbsp;
    <button @click="handleShow(2)" class="bookmark">todoList</button>&nbsp;
    <button @click="handleShow(3)" class="bookmark">LV11</button>

    <div v-if="showComponent == 1">
      <HelloWorld />
    </div>
    <div v-else-if="showComponent == 2">
      <HelloWorld2 />
    </div>
    <div v-else>
      <HelloWorld3 />
    </div>
  </div>

  <!-- <div class="container"> -->
  <!-- <router-link to="/1a2b" class="bookmark">1a2b</router-link>&nbsp;
    <router-link to="/todoList" class="bookmark">todoList</router-link> -->
  <!-- <router-view /> -->
  <!-- </div> -->
</template>

<script>
import HelloWorld from "./components/1a2b_v2.vue";
import HelloWorld2 from "./components/todoList_v2.vue";
import HelloWorld3 from "./components/lv_eleven.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    HelloWorld2,
    HelloWorld3,
  },
  data() {
    return {
      showComponent: 1,
    };
  },
  methods: {
    //添加
    handleShow(val) {
      if (val == 1) {
        this.showComponent = 1;
      }
      if (val == 2) {
        this.showComponent = 2;
      }
      if (val == 3) {
        this.showComponent = 3;
      }
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container {
  height: 70vh;
  margin-top: 16px;
}
.bookmark {
  background-color: #004b97;
  color: white;
  font-size: 16px;
  padding: 13px 28px;
  border-radius: 6px;
  border: none;
  height: 40px;
}
.bookmark:hover {
  background-color: #d2e9ff;
  color: #004b97;
  font-size: 16px;
  padding: 13px 28px;
  border-radius: 6px;
  border: none;
}
</style>
