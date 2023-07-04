<template>
  <div class="fixed top-0 z-[99] w-full">
    <!--header-->
    <div class="mode-white-bg flex h-[60px] w-full items-center justify-center space-x-2 px-5">
      <img v-if="this.modeStatus === true" class="h-[35px] cursor-pointer" src="../assets/LOGO/EZPLUS-textW.svg" alt="億集科技" @click="this.$router.push({ path: '/' })" />
      <img v-else class="h-[35px] cursor-pointer" src="../assets/LOGO/EZPLUS_Black.svg" alt="億集科技" @click="this.$router.push({ path: '/' })" />
      <div class="flex flex-1 justify-end">
        <!--<a-select clearable filterable v-model="userSelect" placeholder="請選擇" class="w-[220px]">
          <a-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.name" @click="userChange" />
        </a-select>-->
        <div v-if="this.modeStatus === true" class="mode-text cursor-pointer rounded border border-transparent px-2 py-1 text-lg hover:border-[#165DFF] items-center flex" @click="ModeLight">
          <MoonIcon class="mode-text h-[20px] w-[20px] text-right" />
        </div>
        <div v-else class="mode-text cursor-pointer rounded border border-transparent px-2 py-1 text-lg hover:border-[#165DFF] hover:text-black items-center flex" @click="ModeDark">
          <SunIcon class="mode-text h-[20px] w-[20px] text-right" />
        </div>
        <div class="mode-text cursor-pointer rounded border border-transparent px-2 py-1 text-lg hover:border-[#165DFF]" @click="goPage">前往禪道</div>
      </div>
    </div>
  </div>
</template>

<script>
import { SunIcon } from "@heroicons/vue/24/solid";
import { MoonIcon } from "@heroicons/vue/24/solid";
import axios from "axios";
export default {
  name: "headerPage",
  components: { SunIcon, MoonIcon },
  data() {
    return {
      modeStatus: true,
      themeMode: "light",
      userList: [],
      userSelect: "",
    };
  },
  watch: {
    modeStatus(value) {
      localStorage.setItem("modeStatus", value.toString());
      if (value === false) {
        this.themeMode = "light";
        this.$emit("mode-change", this.themeMode);
        window.document.documentElement.setAttribute("class", "light");
        window.document.body.setAttribute("arco-theme", "light");
      } else {
        this.themeMode = "dark";
        this.$emit("mode-change", this.themeMode);
        window.document.documentElement.setAttribute("class", "dark");
        window.document.body.setAttribute("arco-theme", "dark");
      }
    },
  },
  methods: {
    // 前往分頁
    goPage() {
      window.open("https://zen.ezplus.com.tw/index.php", "_blank");
    },

    // 切換模式
    ModeLight() {
      this.modeStatus = false;
      this.themeMode = "light";
      this.$emit("mode-change", this.themeMode);
    },
    ModeDark() {
      this.modeStatus = true;
      this.themeMode = "dark";
      this.$emit("mode-change", this.themeMode);
    },

    userChange() {
      this.$emit("user-change", this.userSelect);
    },

    getUserAPI() {
      function getAPI() {
        return axios.get("https://sheets.googleapis.com/v4/spreadsheets/1XFUzU9uINCLrKhVd7YKg1CZ81dDtaDHyJ5pqeG5nwxI/values/user?alt=json&key=AIzaSyBfxlcGiftVBhSljybwPGMHhofAvn0Nk04");
      }
      Promise.all([getAPI()]).then((responses) => {
        const rawData = responses[0].data.values;
        const headers = rawData[0];
        const data = rawData.slice(1);
        this.userList = data.map((row) => {
          const obj = {};
          headers.forEach((header, index) => {
            obj[header] = row[index];
          });
          return obj;
        });
      });
    },
  },
  mounted() {
    this.getUserAPI();

    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    this.modeStatus = !prefersDark;

    //以下為網頁紀錄模式
    const savedModeStatus = localStorage.getItem("modeStatus");
    if (savedModeStatus === false) {
      this.modeStatus = savedModeStatus === "false";
      this.themeMode = "light";
      this.$emit("mode-change", this.themeMode);
      window.document.documentElement.setAttribute("class", "light");
      window.document.body.setAttribute("arco-theme", "light");
    } else {
      this.modeStatus = savedModeStatus === "true";
      this.themeMode = "dark";
      this.$emit("mode-change", this.themeMode);
      window.document.documentElement.setAttribute("class", "dark");
      window.document.body.setAttribute("arco-theme", "dark");
    }
  },
};
</script>

<style lang="scss">
.menu {
  .menuOption {
    @apply flex h-full flex-col justify-center space-y-10;

    .optionItem {
      @apply cursor-pointer text-start text-2xl text-white hover:text-blue-200;
    }
  }
  .menuClose {
    @apply absolute left-0 top-10 cursor-pointer text-white;
  }
}

/* 導航樣式 */
.sideMenu {
  transform: translateX(100vw);
  transition: all 0.5s ease;
  width: 100%;
  left: 0;
  position: absolute;

  .MenuBg {
    background: #165dff;
  }
}
.showMenu {
  transform: translateX(0);

  .menuClose {
    @apply absolute left-10 top-10 cursor-pointer text-white;
  }

  .MenuBg {
    background: #165dff;
  }
}

@media (min-width: 768px) {
  .sideMenu {
    transform: translateX(100vw);
    transition: all 0.5s ease;
    width: 100%;
    left: 100px;
    position: absolute;

    .MenuBg {
      background: #165dff;
      transition: all 0.7s ease;
      transform: skewX(-12deg);
    }
  }
  .showMenu {
    transform: translateX(0);

    .MenuBg {
      background: #165dff;
      transform: skewX(12deg);
    }
  }
}

:root[class="dark"] {
  /* 模式變量切換：預設light模式 */
  --current-primary-color: var(--dark-primary-color);
  --current-white-background-color: var(--dark-white-background-color);
  --current-background-color: var(--dark-background-color);

  /* 深色主题 */
  --dark-primary-color: #fff;
  --dark-white-background-color: #232324;
  --dark-background-color: #0e1116;
}

:root[class="light"] {
  /* 模式變量切換：預設light模式 */
  --current-primary-color: var(--light-primary-color);
  --current-white-background-color: var(--light-white-background-color);
  --current-background-color: var(--light-background-color);

  /* 淺色主題 */
  --light-primary-color: #000;
  --light-white-background-color: #fff;
  --light-background-color: #f5f7fa;
}

.header-wrap {
  height: 60px;
  background-color: var(--current-background-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.mode-text {
  color: var(--current-primary-color) !important;
}

.mode-bg {
  background: var(--current-background-color) !important;
}

.mode-white-bg {
  background: var(--current-white-background-color) !important;
}

.el-table th.el-table__cell.is-sortable,
.el-table__header-wrapper tr th.el-table-fixed-column--left,
.el-table__header-wrapper tr th.el-table-fixed-column--right {
  background: var(--current-background-color) !important;
}
</style>
