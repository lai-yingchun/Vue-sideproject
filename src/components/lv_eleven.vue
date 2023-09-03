<template>
  <el-table :data="tableData" class="tableData">
    <el-table-column fixed prop="name" label="姓名" class="tableCol" />
    <el-table-column prop="remark" label="備註" class="tableCol" />
    <el-table-column prop="sex" label="性別" class="tableCol" />
    <el-table-column prop="license" label="需要之證照" class="tableCol">
      <template #default="scope">
        <el-select v-model="scope.row.license" placeholder="Select" multiple>
          <el-option label="A" value="A" />
          <el-option label="B" value="B" />
          <el-option label="C" value="C" />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column fixed="right">
      <el-button
        type="danger"
        circle
        size="small"
        @click.prevent="deleteRow(index)"
      >
        X
      </el-button>
    </el-table-column>
  </el-table>
  <el-button class="tableData" @click="addItem">Add Item</el-button>
  <el-dialog v-model="dialogVisible" title="新增" style="width: 70%">
    <el-form :model="form">
      <el-row>
        <el-col :span="6">
          <el-form-item label="姓名" :rules="[{ required: true }]">
            <el-input v-model="form.name" />
          </el-form-item> </el-col
        >&nbsp;
        <el-col :span="10">
          <el-form-item label="備註">
            <el-input v-model="form.remark" />
          </el-form-item> </el-col
        >&nbsp;
        <el-col :span="6">
          <el-form-item label="性別" :rules="[{ required: true }]">
            <el-select v-model="form.sex" placeholder="性別">
              <el-option label="Male" value="Male" />
              <el-option label="Female" value="Female" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="需要證照">
            <el-select
              v-model="form.license"
              placeholder="Select"
              multiple
              collapse-tags
            >
              <el-option label="A" value="A" />
              <el-option label="B" value="B" />
              <el-option label="C" value="C" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row justify="end">
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="submitForm">Create</el-button>
            <el-button @click="cancelForm">Cancel</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import { ElButton, ElDialog, ElForm, ElMessageBox } from "element-plus";
export default {
  components: {
    ElButton,
    ElDialog,
    ElForm,
  },
  data() {
    return {
      tableData: [
        {
          name: "A",
          remark: "none",
          sex: "Male",
          license: "test1",
        },
        {
          name: "B",
          remark: "none",
          sex: "Female",
          license: "test2",
        },
      ],
      dialogVisible: false,
      form: {
        name: "",
        remark: "",
        sex: "",
        license: "",
      },
    };
  },
  watch: {},
  methods: {
    // 刪除
    deleteRow(index) {
      ElMessageBox.confirm("Are you sure to delete this item?", "Delete", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          console.log("Item deleted.");
          this.tableData.splice(index, 1);
        })
        .catch(() => {
          console.log("Item deletion canceled.");
        });
    },
    //彈跳視窗
    addItem() {
      this.dialogVisible = true;
    },
    // 送出表單
    submitForm() {
      if (this.form.name == "") {
        ElMessageBox.alert("姓名未填寫", "Error", {
          confirmButtonText: "OK",
          callback: (action) => {
            console.log(action);
          },
          type: "error",
        });
        return;
      }
      if (this.form.sex == "") {
        ElMessageBox.alert("性別未填寫", "Error", {
          confirmButtonText: "OK",
          callback: (action) => {
            console.log(action);
          },
          type: "error",
        });
        return;
      }
      this.tableData.push({
        name: this.form.name,
        remark: this.form.remark,
        sex: this.form.sex,
        license: this.form.license,
      });
      this.dialogVisible = false;
      this.resetForm();
    },
    // 取消
    cancelForm() {
      this.resetForm();
      this.dialogVisible = false;
    },
    // 重置表單
    resetForm() {
      this.form.name = "";
      this.form.remark = "";
      this.form.sex = "";
      this.form.license = "";
    },
  },
};
</script>

<style scoped>
.tableData {
  width: 100%;
}
.tableCol {
  width: 20%;
}
</style>
