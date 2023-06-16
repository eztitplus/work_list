<template>
  <div class="flex flex-col space-y-4 w-full py-10 px-16 absolute top-[60px] overflow-scroll">
    <a-form :model="editForm" auto-label-width>
      <a-form-item tooltip="請輸入姓名" label="姓名">
        <a-input v-model="editForm.user" placeholder="請輸入姓名" />
      </a-form-item>
      <a-form-item tooltip="請輸入大項目名稱" label="專案名稱">
        <a-input v-model="editForm.project" placeholder="請輸入內容" />
      </a-form-item>
      <a-form-item tooltip="請輸入子項目名稱" label="子項目">
        <a-input v-model="editForm.subitems" placeholder="請輸入內容" />
      </a-form-item>
      <a-form-item tooltip="請選擇執行類型" label="類型">
        <a-select v-model="editForm.type" placeholder="請選擇" allow-clear>
          <a-option value="BUG">BUG</a-option>
          <a-option value="新需求">新需求</a-option>
          <a-option value="優化">優化</a-option>
          <a-option value="測試">測試</a-option>
          <a-option value="其他">其他</a-option>
        </a-select>
      </a-form-item>
      <a-form-item v-if="editForm.type === 'BUG'" tooltip="請輸入禪道單號即可" label="禪道單號">
        <a-input v-model="editForm.bug_number" placeholder="請輸入內容" />
      </a-form-item>
      <a-form-item tooltip="請選擇目前執行的狀態" label="執行狀態">
        <a-select v-model="editForm.status" placeholder="請選擇" allow-clear>
          <a-option value="已完成">已完成</a-option>
          <a-option value="進行中">進行中</a-option>
          <a-option value="未開始">未開始</a-option>
          <a-option value="暫停">暫停</a-option>
        </a-select>
      </a-form-item>
      <a-form-item tooltip="請選擇指派的時間" label="指派日期">
        <a-date-picker v-model="editForm.assign_time" placeholder="請選擇時間" />
      </a-form-item>
      <a-form-item tooltip="請選擇預計開始的時間" label="開始日期">
        <a-date-picker v-model="editForm.start_time" placeholder="請選擇時間" />
      </a-form-item>
      <a-form-item tooltip="請選擇預計完成的時間" label="預計完成日期">
        <a-date-picker v-model="editForm.end_time" placeholder="請選擇時間" />
      </a-form-item>
      <a-form-item v-if="editForm.status === '已完成'" label="實際完成時間">
        <div class="flex space-x-2">
          <a-date-picker v-model="editForm.reality_end_time" placeholder="請選擇時間" />
          <p>共{{ editForm.days }}天</p>
        </div>
      </a-form-item>
      <a-form-item label="說明">
        <a-textarea v-model="editForm.commit" placeholder="請輸入說明" allow-clear />
      </a-form-item>
    </a-form>
    <div class="flex w-full items-center justify-center space-x-2">
      <a-button type="primary" @click="dataPost">確定123</a-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      editForm: {
        user: "",
        project: "",
        subitems: "",
        type: "",
        bug_number: "",
        status: "",
        assign_time: "",
        start_time: "",
        end_time: "",
        reality_end_time: "",
        updated_at: "",
      }, //搜尋表格
      name: "",
      phone: "",
      selectedItems: [],
      items: [
        { id: 1, name: "商品1", price: 100 },
        { id: 2, name: "商品2", price: 200 },
        { id: 3, name: "商品3", price: 300 },
      ],
      nameError: false,
      phoneError: false,
    };
  },
  methods: {
    dataPost() {
      const data = {
        user: this.editForm.user,
        project: this.editForm.project,
        subitems: this.editForm.subitems,
        type: this.editForm.type,
        bug_number: this.editForm.bug_number,
        status: this.editForm.status,
        assign_time: this.editForm.assign_time,
        start_time: this.editForm.start_time,
        end_time: this.editForm.end_time,
        reality_end_time: this.editForm.reality_end_time,
        updated_at: this.editForm.updated_at,
      };
      axios
        .get("https://script.google.com/macros/s/AKfycbwrlrukf9c944pjr7eaCNPLNF2oxupe7WMfWErpLnKFqBLcCV6YXt9vKdwtHh8PKvQ/exec", {
          params: data,
        })
        .then((response) => {
          console.log(response.data);
          alert("新增成功");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    dataPatch() {
      const data = {
        user: this.editForm.user,
        project: this.editForm.project,
        subitems: this.editForm.subitems,
        type: this.editForm.type,
        bug_number: this.editForm.bug_number,
        status: this.editForm.status,
        assign_time: this.editForm.assign_time,
        start_time: this.editForm.start_time,
        end_time: this.editForm.end_time,
        reality_end_time: this.editForm.reality_end_time,
        updated_at: this.editForm.updated_at,
      };
      axios
        .get("https://script.google.com/macros/s/AKfycbwrlrukf9c944pjr7eaCNPLNF2oxupe7WMfWErpLnKFqBLcCV6YXt9vKdwtHh8PKvQ/exec", {
          params: data,
        })
        .then((response) => {
          console.log(response.data);
          alert("新增成功");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
