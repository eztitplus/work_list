<template>
  <loading-page :bar-hide="false" v-if="loading" :background-color="'#ffffff99'"></loading-page>
  <div class="flex flex-col space-y-4 w-full py-10 px-10 absolute top-[60px] overflow-scroll mode-bg">
    <div class="flex space-x-5">
      <p class="text-2xl flex-1 text-left mode-text">工作排程表</p>
      <a-button type="primary" @click="addForm">新增</a-button>
    </div>
    <div class="flex flex-col space-y-5 p-4 rounded-xl mode-white-bg items-center shadow-lg">
      <div class="flex space-x-5 w-full">
        <a-input v-model="search.keyword" placeholder="請輸入關鍵字" />
        <a-button v-if="searchMore === false" @click="searchMore = !searchMore">更多</a-button>
        <a-button v-else @click="searchMore = !searchMore">收起</a-button>
        <a-button @click="clearSearch" status="danger">清空搜尋</a-button>
      </div>
      <div v-if="searchMore" class="grid gap-x-8 gap-y-4 grid-cols-3 w-full">
        <div class="flex items-center space-x-4 w-full">
          <p class="min-w-[90px] max-w-[90px] mode-text text-left">類型</p>
          <a-select clearable filterable v-model="search.type" placeholder="請選擇">
            <a-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </a-select>
        </div>
        <div class="flex items-center space-x-4 w-full">
          <p class="min-w-[90px] max-w-[90px] mode-text text-left">執行狀態</p>
          <a-select clearable filterable v-model="search.status" placeholder="請選擇">
            <a-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
          </a-select>
        </div>
        <div class="flex items-center space-x-4 w-full">
          <p class="min-w-[90px] max-w-[90px] mode-text text-left">指派日期</p>
          <a-range-picker v-model="search.assign_time" class="w-full" />
        </div>
        <div class="flex items-center space-x-4 w-full">
          <p class="min-w-[90px] max-w-[90px] mode-text text-left">開始日期</p>
          <a-range-picker v-model="search.start_time" class="w-full" />
        </div>
        <div class="flex items-center space-x-4 w-full">
          <p class="min-w-[90px] max-w-[90px] mode-text text-left">預計完成日期</p>
          <a-range-picker v-model="search.end_time" class="w-full" />
        </div>
        <div class="flex items-center space-x-4 w-full">
          <p class="min-w-[90px] max-w-[90px] mode-text text-left">實際完成日期</p>
          <a-range-picker v-model="search.reality_end_time" class="w-full" />
        </div>
      </div>
      <!--<a-form v-if="searchMore" :model="search" auto-label-width layout="inline">
        &lt;!&ndash;<a-form-item label="員工姓名">
          <a-select clearable filterable v-model="search.user" placeholder="請選擇">
            <a-option v-for="item in staffName" :key="item.value" :label="item.label" :value="item.value" />
          </a-select>
        </a-form-item>
        <a-form-item label="專案名稱">
          <a-input placeholder="關鍵字" v-model="search.project"></a-input>
        </a-form-item>
        <a-form-item label="子項目">
          <a-input placeholder="關鍵字" v-model="search.subitems"></a-input>
        </a-form-item>&ndash;&gt;
        <a-form-item label="類型">
          <a-select clearable filterable v-model="search.type" placeholder="請選擇">
            <a-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </a-select>
        </a-form-item>
        <a-form-item label="執行狀態">
          <a-select clearable filterable v-model="search.status" placeholder="請選擇">
            <a-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
          </a-select>
        </a-form-item>
        <a-form-item label="指派日期">
          <a-range-picker v-model="search.assign_time" />
        </a-form-item>
        <a-form-item label="開始日期">
          <a-range-picker v-model="search.start_time" />
        </a-form-item>
        <a-form-item label="預計完成日期">
          <a-range-picker v-model="search.end_time" />
        </a-form-item>
        <a-form-item label="實際完成日期">
          <a-range-picker v-model="search.reality_end_time" />
        </a-form-item>
      </a-form>-->
    </div>
    <div class="p-4 rounded-xl mode-white-bg shadow-lg" style="height: calc(100vh - 265px)">
      <el-table :data="tables" class="w-full" :height="`calc(100vh - 290px)`" border>
        <el-table-column sortable fixed type="index" label="序" width="50" align="center"></el-table-column>
        <el-table-column sortable fixed prop="user" label="姓名" width="100" align="center">
          <!--<el-table-column prop="user" width="150" align="center">
            <template #header>
              <el-select clearable filterable v-model="search.user" class="m-2" placeholder="請選擇" size="large">
                <el-option v-for="item in staffName" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </template>
          </el-table-column>-->
          <template #default="scope">
            <span v-html="showDate(scope.row.user)"></span>
          </template>
        </el-table-column>
        <el-table-column sortable fixed prop="project" label="專案名稱" width="150" align="center">
          <!--<el-table-column prop="project" width="150" align="center">
            <template #header>
              <el-input placeholder="關鍵字" v-model="search.project"></el-input>
            </template>
          </el-table-column>-->
          <template #default="scope">
            <span v-html="showDate(scope.row.project)"></span>
          </template>
        </el-table-column>
        <el-table-column sortable prop="subitems" label="子項目" width="150" align="center">
          <!--<el-table-column prop="subitems" width="150" align="center">
            <template #header>
              <el-input placeholder="關鍵字" v-model="search.subitems"></el-input>
            </template>
          </el-table-column>-->
          <template #default="scope">
            <span v-html="showDate(scope.row.subitems)"></span>
          </template>
        </el-table-column>
        <el-table-column sortable prop="commit" label="說明" width="350" align="left">
          <!--<el-table-column prop="commit" width="250" align="left">
            <template #header>
              <el-input placeholder="關鍵字" v-model="search.commit"></el-input>
            </template>
          </el-table-column>-->
          <template #default="scope">
            <span v-html="showDate(scope.row.commit)"></span>
          </template>
        </el-table-column>
        <el-table-column sortable prop="type" label="類型" width="150" align="center">
          <!--<el-table-column prop="type" width="150" align="center">
            <template #header>
              <el-select clearable filterable v-model="search.type" class="m-2" placeholder="請選擇" size="large">
                <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </template>
          </el-table-column>-->
          <template #default="scope">
            <span v-html="showDate(scope.row.type)"></span>
          </template>
        </el-table-column>
        <el-table-column sortable prop="bug_number" label="禪道單號" width="120" align="center">
          <!--<el-table-column prop="bug_number" width="150" align="center">
            <template #header>
              <el-input placeholder="關鍵字" v-model="search.bug_number"></el-input>
            </template>
            <template #default="scope">
              <a-button type="text" @click="goPage(scope.$index, scope.row)">{{ scope.row.bug_number }}</a-button>
            </template>
          </el-table-column>-->
          <template #default="scope">
            <a-button type="text" @click="goPage(scope.$index, scope.row)" v-html="showDate(scope.row.bug_number)"></a-button>
          </template>
        </el-table-column>
        <el-table-column sortable prop="status" label="執行狀態" width="120" align="center">
          <!--<el-table-column prop="status" width="150" align="center">
            <template #header>
              <el-select clearable filterable v-model="search.status" class="m-2" placeholder="請選擇" size="large">
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </template>
            <template #default="scope">
              <a-tag v-if="scope.row.status === '已完成'" color="blue">{{ scope.row.status }}</a-tag>
              <a-tag v-if="scope.row.status === '進行中'" color="green">{{ scope.row.status }}</a-tag>
              <a-tag v-if="scope.row.status === '未開始'" color="red">{{ scope.row.status }}</a-tag>
              <a-tag v-if="scope.row.status === '暫停'" color="purple">{{ scope.row.status }}</a-tag>
            </template>
          </el-table-column>-->
          <template #default="scope">
            <a-tag v-if="scope.row.status === '已完成'" color="blue" v-html="showDate(scope.row.status)"></a-tag>
            <a-tag v-if="scope.row.status === '進行中'" color="green" v-html="showDate(scope.row.status)"></a-tag>
            <a-tag v-if="scope.row.status === '未開始'" color="red" v-html="showDate(scope.row.status)"></a-tag>
            <a-tag v-if="scope.row.status === '暫停'" color="purple" v-html="showDate(scope.row.status)"></a-tag>
          </template>
        </el-table-column>
        <el-table-column sortable prop="assign_time" label="指派日期" width="120" align="center">
          <!--<el-table-column prop="assign_time" width="280" align="center">
            <template #header>
              <el-date-picker v-model="search.assign_time" class="w-[250px]" type="daterange" range-separator="到" start-placeholder="開始日期" end-placeholder="結束日期" />
              &lt;!&ndash;<a-range-picker @change="onChange" @select="onSelect" style="width: 220px" />&ndash;&gt;
            </template>
          </el-table-column>-->
          <template #default="scope">
            <span v-html="showDate(scope.row.assign_time)"></span>
          </template>
        </el-table-column>
        <el-table-column sortable prop="start_time" label="開始日期" width="120" align="center">
          <!--<el-table-column prop="start_time" width="280" align="center">
            <template #header>
              <el-date-picker v-model="search.start_time" class="w-[250px]" type="daterange" range-separator="到" start-placeholder="開始日期" end-placeholder="結束日期" />
            </template>
          </el-table-column>-->
          <template #default="scope">
            <span v-html="showDate(scope.row.start_time)"></span>
          </template>
        </el-table-column>
        <el-table-column sortable prop="end_time" label="預計完成日期" width="140" align="center">
          <!--<el-table-column prop="end_time" width="280" align="center">
            <template #header>
              <el-date-picker v-model="search.end_time" class="w-[250px]" type="daterange" range-separator="到" start-placeholder="開始日期" end-placeholder="結束日期" />
            </template>
          </el-table-column>-->
          <template #default="scope">
            <span v-html="showDate(scope.row.end_time)"></span>
          </template>
        </el-table-column>
        <el-table-column sortable prop="reality_end_time" label="實際完成日期" width="140" align="center">
          <!--<el-table-column prop="reality_end_time" width="280" align="center">
            <template #header>
              <el-date-picker v-model="search.reality_end_time" class="w-[250px]" type="daterange" range-separator="到" start-placeholder="開始日期" end-placeholder="結束日期" />
            </template>
            <template #default="scope">
              <p v-if="new Date(scope.row.reality_end_time) > new Date(scope.row.end_time)" class="text-red-500">{{ scope.row.reality_end_time }}</p>
              <p v-else>{{ scope.row.reality_end_time }}</p>
            </template>
          </el-table-column>-->
          <template #default="scope">
            <span v-html="showDate(scope.row.reality_end_time)"></span>
          </template>
        </el-table-column>
        <el-table-column sortable prop="versions" label="版本" width="100" align="center">
          <template #default="scope">
            <span v-html="showDate(scope.row.versions)"></span>
          </template>
        </el-table-column>
        <el-table-column sortable prop="days" label="執行天數" width="120" align="center" />
        <!--<el-table-column sortable prop="updated_at" label="最後編輯時間" width="200" align="center">
          <el-table-column prop="updated_at" width="280" align="center">
            <template #header>
              <el-date-picker v-model="search.updated_at" class="w-[250px]" type="daterange" range-separator="到" start-placeholder="開始日期" end-placeholder="結束日期" />
            </template>
          </el-table-column>
        </el-table-column>-->
        <el-table-column fixed="right" label="操作" width="100" align="center">
          <template #default="scope">
            <a-button type="text" @click="handelEdit(scope.$index, scope.row)">編輯</a-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <a-modal v-model:visible="editDialog" draggable>
      <template #title>
        <p v-if="dialogTitle === 0" class="flex-1 mode-text">新增排程</p>
        <p v-if="dialogTitle === 1" class="flex-1 mode-text">編輯排程</p>
      </template>
      <a-form ref="formRef" :model="editForm" auto-label-width>
        <p v-if="dialogTitle === 1" class="text-sm mb-5 text-center">最後修改時間：{{ editForm.updated_at }}</p>
        <a-form-item tooltip="下拉選單中若沒有資料，請手動輸入" label="姓名">
          <div class="flex flex-col w-full">
            <a-select v-model="editForm.user" placeholder="請選擇" allow-clear allow-create allow-search :error="rules">
              <a-option v-for="item in editStaffName" :key="item.value" :label="item.label" :value="item.value" />
            </a-select>
            <!--<a-input v-model="editForm.user" placeholder="請輸入姓名" :error="rules" />-->
            <p v-if="rules" class="text-red-500 text-[12px]">請輸入姓名</p>
          </div>
        </a-form-item>
        <a-form-item tooltip="請輸入大項目名稱" label="專案名稱">
          <a-input v-model="editForm.project" placeholder="請輸入內容" />
        </a-form-item>
        <a-form-item tooltip="請輸入子項目名稱" label="子項目">
          <a-input v-model="editForm.subitems" placeholder="請輸入內容" />
        </a-form-item>
        <a-form-item tooltip="請選擇執行類型" label="類型">
          <div class="flex space-x-4 w-full">
            <a-select v-model="editForm.type" placeholder="請選擇" allow-clear>
              <a-option value="BUG">BUG</a-option>
              <a-option value="新需求">新需求</a-option>
              <a-option value="優化">優化</a-option>
              <a-option value="測試">測試</a-option>
              <a-option value="其他">其他</a-option>
            </a-select>
            <a-input v-model="editForm.bug_number" placeholder="請輸入禪道單號共4碼" />
          </div>
        </a-form-item>
        <!--<a-form-item v-if="editForm.type === 'BUG'" tooltip="請輸入禪道單號即可" label="禪道單號">
          <a-input v-model="editForm.bug_number" placeholder="請輸入內容" />
        </a-form-item>-->
        <a-form-item tooltip="請選擇目前執行的狀態" label="執行狀態">
          <a-select v-model="editForm.status" placeholder="請選擇" allow-clear>
            <a-option value="未開始">未開始</a-option>
            <a-option value="進行中">進行中</a-option>
            <a-option value="已完成">已完成</a-option>
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
          <a-date-picker v-model="editForm.reality_end_time" placeholder="請選擇時間" />
          <!-- <div class="flex space-x-2">
            <a-date-picker v-model="editForm.reality_end_time" placeholder="請選擇時間" />
            <p>共{{ editForm.days }}天</p>
          </div>-->
        </a-form-item>
        <a-form-item tooltip="請輸入版本號碼" label="版本號碼">
          <a-input v-model="editForm.versions" placeholder="請輸入內容" />
        </a-form-item>
        <div class="h-[32px] flex mb-4">
          <p class="w-[102px] text-right mr-[16px] mode-text">執行天數</p>
          <div class="flex space-x-2">
            <p class="mode-text">共 {{ editForm.days }} 天</p>
            <p class="text-gray-400 mode-text">(不含六日)</p>
          </div>
        </div>
        <a-form-item label="說明">
          <a-textarea v-model="editForm.commit" placeholder="請輸入說明" allow-clear />
        </a-form-item>
      </a-form>
      <template #footer>
        <div class="flex w-full items-center justify-center space-x-2">
          <a-button type="text" @click="addAgain" v-if="dialogTitle === 0">儲存後繼續新增</a-button>
          <div class="flex w-full items-center justify-end space-x-2 flex-1">
            <a-button type="outline" @click="userDialogCancel">取消</a-button>
            <a-button type="primary" @click="dataPost" v-if="dialogTitle === 0">確定</a-button>
            <a-button type="primary" @click="dataPatch" v-if="dialogTitle === 1">確定</a-button>
          </div>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import axios from "axios";
import loadingPage from "@/components/loadingPage";
export default {
  name: "HomeView",
  components: { loadingPage },
  props: {
    theme: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      modeTheme: this.theme,
      loading: false,
      dataList: [], //表格

      // 搜尋相關
      search: {
        keyword: "",
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
      searchMore: false,
      staffName: [], //員工選單
      typeOptions: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "BUG",
          label: "BUG",
        },
        {
          value: "新需求",
          label: "新需求",
        },
        {
          value: "優化",
          label: "優化",
        },
        {
          value: "測試",
          label: "測試",
        },
        {
          value: "其他",
          label: "其他",
        },
      ], //類型選單
      statusOptions: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "未開始",
          label: "未開始",
        },
        {
          value: "進行中",
          label: "進行中",
        },
        {
          value: "已完成",
          label: "已完成",
        },
        {
          value: "暫停",
          label: "暫停",
        },
      ], //狀態選單

      // 新增編輯表單
      rules: false,
      dialogTitle: 0,
      editDialog: false,
      editForm: {
        id: "",
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
        days: "0",
        commit: "",
        created_at: "",
        updated_at: "",
      },
      editStaffName: [],
    };
  },
  methods: {
    getAPI() {
      function getAPI() {
        return axios.get("https://sheets.googleapis.com/v4/spreadsheets/1eb8LZ0dGop8WJ-1tteH2b-Wt7XTFdruTQ6wOYd-WbsY/values/work?alt=json&key=AIzaSyBfxlcGiftVBhSljybwPGMHhofAvn0Nk04");
      }
      Promise.all([getAPI()]).then((responses) => {
        const rawData = responses[0].data.values;
        const headers = rawData[0];
        const data = rawData.slice(1);
        this.dataList = data.map((row) => {
          const obj = {};
          headers.forEach((header, index) => {
            obj[header] = row[index];
          });
          return obj;
        });

        /*this.staffName = [
          { label: "全部", value: "" },
          ...this.dataList.map((item) => {
            return { value: item.user, label: item.user };
          }),
        ];*/
        // 將列表中的user整合為選單內容
        this.staffName = [
          { label: "全部", value: "" },
          ...this.dataList.map((item) => {
            return { value: item.user, label: item.user };
          }),
        ];
        this.editStaffName = [
          ...this.dataList.map((item) => {
            return { value: item.user, label: item.user };
          }),
        ];

        // 將陣列轉換為 Set 物件，這將自動移除重複項目
        const uniqueStaffNameSet = new Set(this.staffName.map(JSON.stringify));
        const uniqueEditStaffNameSet = new Set(this.editStaffName.map(JSON.stringify));
        // 將 Set 物件轉換回陣列
        this.staffName = Array.from(uniqueStaffNameSet).map(JSON.parse);
        this.editStaffName = Array.from(uniqueEditStaffNameSet).map(JSON.parse);
      });
    },
    goPage(index, row) {
      window.open(`https://zen.ezplus.com.tw/index.php?m=bug&f=view&bugID=${row.bug_number}`, "_blank");
    },

    //新增畫面
    addForm() {
      this.dialogTitle = 0;
      this.editDialog = true;
      this.editForm = {
        id: "",
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
        days: "0",
        commit: "",
        versions: "",
        created_at: "",
        updated_at: "",
      };
    },
    // 新增存檔
    dataPost() {
      if (this.editForm.user === "") {
        this.rules = true;
      } else {
        this.rules = false;
        this.loading = true;
        const now = new Date();
        const formattedDate = now
          .toLocaleString("zh-TW", { timeZone: "UTC", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" })
          .replace(/\//g, "-")
          .replace(",", "");

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
          days: this.editForm.days,
          commit: this.editForm.commit,
          versions: this.editForm.versions,
          created_at: formattedDate,
          updated_at: formattedDate,
        };
        axios
          .get("https://script.google.com/macros/s/AKfycbwrlrukf9c944pjr7eaCNPLNF2oxupe7WMfWErpLnKFqBLcCV6YXt9vKdwtHh8PKvQ/exec", {
            params: data,
          })
          .then(() => {
            this.loading = false;
            this.$swal
              .fire({
                title: "存檔完成！",
                icon: "success",
                allowOutsideClick: false, //防止點擊外部關閉
                confirmButtonColor: "#0084ff",
                confirmButtonText: "確定",
              })
              .then((result) => {
                if (result.isConfirmed) {
                  this.editDialog = false;
                  this.getAPI();
                }
              });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    //繼續新增
    addAgain() {
      if (this.editForm.user === "") {
        this.rules = true;
      } else {
        this.rules = false;
        this.loading = true;
        const now = new Date();
        const formattedDate = now
          .toLocaleString("zh-TW", { timeZone: "UTC", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" })
          .replace(/\//g, "-")
          .replace(",", "");

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
          days: this.editForm.days,
          commit: this.editForm.commit,
          versions: this.editForm.versions,
          created_at: formattedDate,
          updated_at: formattedDate,
        };
        axios
          .get("https://script.google.com/macros/s/AKfycbwrlrukf9c944pjr7eaCNPLNF2oxupe7WMfWErpLnKFqBLcCV6YXt9vKdwtHh8PKvQ/exec", {
            params: data,
          })
          .then(() => {
            this.loading = false;
            this.$swal
              .fire({
                title: "存檔完成！",
                icon: "success",
                allowOutsideClick: false, //防止點擊外部關閉
                confirmButtonColor: "#0084ff",
                confirmButtonText: "確定",
              })
              .then((result) => {
                if (result.isConfirmed) {
                  this.getAPI();
                  this.editForm = {
                    id: "",
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
                    days: "0",
                    commit: "",
                    versions: "",
                    created_at: "",
                    updated_at: "",
                  };
                }
              });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },

    // 編輯畫面
    handelEdit(index, row) {
      this.dialogTitle = 1;
      this.editDialog = true;
      this.editForm = JSON.parse(JSON.stringify(row));
    },
    // 編輯存檔
    dataPatch() {
      if (this.editForm.user === "") {
        this.rules = true;
      } else {
        this.rules = false;
        this.loading = true;
        const rowNumber = +this.editForm.id + 1;

        const now = new Date();
        const formattedDate = now
          .toLocaleString("zh-TW", { timeZone: "UTC", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" })
          .replace(/\//g, "-")
          .replace(",", "");

        const data = {
          rowNumber: rowNumber,
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
          commit: this.editForm.commit,
          days: this.editForm.days,
          versions: this.editForm.versions,
          updated_at: formattedDate,
        };
        axios
          .get("https://script.google.com/macros/s/AKfycbwrlrukf9c944pjr7eaCNPLNF2oxupe7WMfWErpLnKFqBLcCV6YXt9vKdwtHh8PKvQ/exec", {
            params: data,
          })
          .then(() => {
            this.loading = false;
            this.$swal
              .fire({
                title: "存檔完成！",
                icon: "success",
                allowOutsideClick: false, //防止點擊外部關閉
                confirmButtonColor: "#0084ff",
                confirmButtonText: "確定",
              })
              .then((result) => {
                if (result.isConfirmed) {
                  this.getAPI();
                  this.editDialog = false;
                }
              });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },

    //清空搜尋
    clearSearch() {
      this.search = {
        keyword: "",
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
      };
    },

    // 取消
    userDialogCancel() {
      this.editDialog = false;
      this.editForm = {};
    },

    /*calculateDays() {
      const startDate = this.editForm.start_time;
      const endDate = this.editForm.reality_end_time || this.editForm.end_time;

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const timeDiff = end.getTime() - start.getTime();
        const totalDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        this.editForm.days = totalDays;
      } else {
        this.editForm.days = 0;
      }
    },*/
    calculateDays() {
      const startDate = new Date(this.editForm.start_time);
      const endDate = new Date(this.editForm.reality_end_time || this.editForm.end_time);
      let totalDays = 0;

      if (startDate && endDate) {
        const dayMilliseconds = 24 * 60 * 60 * 1000;

        while (startDate <= endDate) {
          const dayOfWeek = startDate.getDay();

          // 避開週六和週日
          if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            totalDays++;
          }

          startDate.setTime(startDate.getTime() + dayMilliseconds);
        }
      }

      this.editForm.days = totalDays;
    },

    // 搜尋高光
    showDate(val) {
      val = val + "";
      if (val.indexOf(this.search.keyword) !== -1 && this.search.keyword !== "") {
        return val.replace(this.search.keyword, '<span style="color: #000; background: gold">' + this.search.keyword + "</span>");
      } else {
        return val;
      }
    },
  },
  watch: {
    /*modeTheme: function (newVal) {
      // 監聽
      if (newVal === "dark") {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    },*/
    "editForm.start_time": "calculateDays",
    "editForm.end_time": "calculateDays",
    "editForm.reality_end_time": "calculateDays",
  },
  mounted() {
    this.getAPI();
  },
  computed: {
    tables() {
      const search1 = this.search.user;
      const search2 = this.search.project;
      const search3 = this.search.subitems;
      const search4 = this.search.type;
      const search5 = this.search.bug_number;
      const search6 = this.search.status;
      const search7 = this.search.assign_time;
      const search8 = this.search.start_time;
      const search9 = this.search.end_time;
      const search10 = this.search.reality_end_time;
      const search11 = this.search.updated_at;
      const search12 = this.search.commit;
      const searchKeyword = this.search.keyword;

      return this.dataList.filter((data) => {
        if (searchKeyword) {
          return Object.keys(data).some(function (key) {
            return String(data[key]).toLowerCase().indexOf(searchKeyword) > -1;
          });
        }
        if (search1) {
          return String(data.user).toLowerCase().includes(search1.toLowerCase());
        }
        if (search2) {
          return String(data.project).toLowerCase().includes(search2.toLowerCase());
        }
        if (search3) {
          return String(data.subitems).toLowerCase().includes(search3.toLowerCase());
        }
        if (search4) {
          return String(data.type).toLowerCase().includes(search4.toLowerCase());
        }
        if (search5) {
          return String(data.bug_number).toLowerCase().includes(search5.toLowerCase());
        }
        if (search6) {
          return String(data.status).toLowerCase().includes(search6.toLowerCase());
        }
        if (search7) {
          const assignTime = new Date(data.assign_time);
          const [start, end] = this.search.assign_time;

          if (start && end) {
            const startDate = new Date(start);
            const endDate = new Date(end);

            return assignTime >= startDate && assignTime <= endDate;
          } else if (start && !end) {
            const startDate = new Date(start);

            return assignTime >= startDate;
          } else if (!start && end) {
            const endDate = new Date(end);

            return assignTime <= endDate;
          }
        }
        if (search8) {
          const assignTime = new Date(data.start_time);
          const [start, end] = this.search.start_time;

          if (start && end) {
            const startDate = new Date(start);
            const endDate = new Date(end);

            return assignTime >= startDate && assignTime <= endDate;
          } else if (start && !end) {
            const startDate = new Date(start);

            return assignTime >= startDate;
          } else if (!start && end) {
            const endDate = new Date(end);

            return assignTime <= endDate;
          }
        }
        if (search9) {
          const assignTime = new Date(data.end_time);
          const [start, end] = this.search.end_time;

          if (start && end) {
            const startDate = new Date(start);
            const endDate = new Date(end);

            return assignTime >= startDate && assignTime <= endDate;
          } else if (start && !end) {
            const startDate = new Date(start);

            return assignTime >= startDate;
          } else if (!start && end) {
            const endDate = new Date(end);

            return assignTime <= endDate;
          }
        }
        if (search10) {
          const assignTime = new Date(data.reality_end_time);
          const [start, end] = this.search.reality_end_time;

          if (start && end) {
            const startDate = new Date(start);
            const endDate = new Date(end);

            return assignTime >= startDate && assignTime <= endDate;
          } else if (start && !end) {
            const startDate = new Date(start);

            return assignTime >= startDate;
          } else if (!start && end) {
            const endDate = new Date(end);

            return assignTime <= endDate;
          }
        }
        if (search11) {
          const assignTime = new Date(data.updated_at);
          const [start, end] = this.search.updated_at;

          if (start && end) {
            const startDate = new Date(start);
            const endDate = new Date(end);

            return assignTime >= startDate && assignTime <= endDate;
          } else if (start && !end) {
            const startDate = new Date(start);

            return assignTime >= startDate;
          } else if (!start && end) {
            const endDate = new Date(end);

            return assignTime <= endDate;
          }
        }
        if (search12) {
          return String(data.commit).toLowerCase().includes(search12.toLowerCase());
        }

        return true;
      });
    },
  },
};
</script>
<style lang="scss">
//表頭顏色
.el-table thead.is-group th.el-table__cell {
  background: #f2f3f5 !important;
}
/*.el-table th.el-table__cell.is-sortable,
.el-table__header-wrapper tr th.el-table-fixed-column--left,
.el-table__header-wrapper tr th.el-table-fixed-column--right {
  background: #f2f3f5 !important;
}*/
</style>
