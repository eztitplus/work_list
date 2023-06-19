<template>
  <div class="fixed top-0 z-[99] w-full">
    <!--header-->
    <div class="mode-white-bg flex h-[60px] w-full items-center justify-center space-x-2 px-5">
      <img v-if="this.modeStatus === true" class="h-[35px] cursor-pointer" src="../assets/LOGO/EZPLUS-textW.svg" alt="億集科技" @click="this.$router.push({ path: '/' })" />
      <img v-else class="h-[35px] cursor-pointer" src="../assets/LOGO/EZPLUS_Black.svg" alt="億集科技" @click="this.$router.push({ path: '/' })" />
      <div class="flex flex-1 justify-end">
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
export default {
  name: "headerPage",
  components: { SunIcon, MoonIcon },
  data() {
    return {
      modeStatus: true,
      themeMode: "light",
    };
  },
  watch: {
    modeStatus(value) {
      localStorage.setItem("modeStatus", value.toString());
      if (value === false) {
        this.themeMode = "light";
        this.$emit("mode-change", this.themeMode);
        window.document.documentElement.setAttribute("data-theme", "light");
      } else {
        this.themeMode = "dark";
        this.$emit("mode-change", this.themeMode);
        window.document.documentElement.setAttribute("data-theme", "dark");
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
  },
  mounted() {
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    this.modeStatus = !prefersDark;

    //以下為網頁紀錄模式
    const savedModeStatus = localStorage.getItem("modeStatus");
    if (savedModeStatus === false) {
      this.modeStatus = savedModeStatus === "false";
      this.themeMode = "light";
      this.$emit("mode-change", this.themeMode);
      window.document.documentElement.setAttribute("data-theme", "light");
    } else {
      this.modeStatus = savedModeStatus === "true";
      this.themeMode = "dark";
      this.$emit("mode-change", this.themeMode);
      window.document.documentElement.setAttribute("data-theme", "dark");
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

:root[data-theme="dark"] {
  /* 模式變量切換：預設light模式 */
  --current-primary-color: var(--dark-primary-color);
  --current-line-color: var(--dark-line-color);
  --current-line-2-color: var(--dark-line-2-color);
  --current-white-background-color: var(--dark-white-background-color);
  --current-background-color: var(--dark-background-color);
  --current-input-bg-color: var(--dark-input-bg-color);

  /* 深色主题 */
  --dark-primary-color: #fff;
  --dark-line-color: #000;
  --dark-line-2-color: #363637;
  --dark-white-background-color: #232324;
  --dark-background-color: #0e1116;
  --dark-input-bg-color: #343435;
}

:root[data-theme="light"] {
  /* 模式變量切換：預設light模式 */
  --current-primary-color: var(--light-primary-color);
  --current-line-color: var(--light-line-color);
  --current-line-2-color: var(--light-line-2-color);
  --current-white-background-color: var(--light-white-background-color);
  --current-background-color: var(--light-background-color);
  --current-input-bg-color: var(--light-input-bg-color);

  /* 淺色主題 */
  --light-primary-color: #000;
  --light-line-color: #e5e6eb;
  --light-line-2-color: #ebeef5;
  --light-white-background-color: #fff;
  --light-background-color: #f5f7fa;
  --light-input-bg-color: #f2f3f5;
}

.header-wrap {
  height: 60px;
  background-color: var(--current-background-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.mode-text,
.arco-form-item-label-col > .arco-form-item-label,
.arco-picker input {
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
  color: var(--current-primary-color) !important;
}

.arco-input-wrapper,
.arco-picker,
.arco-textarea-wrapper,
.arco-select-view-single,
.arco-select-dropdown,
.arco-select-dropdown .arco-select-option {
  background: var(--current-input-bg-color) !important;
  color: var(--current-primary-color) !important;
}

.arco-select-popup .arco-select-option-hover,
.arco-select-dropdown .arco-select-option-active {
  background: var(--current-white-background-color) !important;
}

.el-table__empty-block,
.el-scrollbar__wrap,
.el-table__row,
.el-table__body-wrapper tr td.el-table-fixed-column--left,
.el-table__body-wrapper tr td.el-table-fixed-column--right,
.el-table__body tr.hover-row > td.el-table__cell,
.arco-modal {
  background: var(--current-white-background-color) !important;
  color: var(--current-primary-color) !important;
}

.arco-modal-header {
  border-bottom: 1px solid var(--current-line-color) !important;
}

.arco-modal-footer {
  border-top: 1px solid var(--current-line-color) !important;
}

.el-table td.el-table__cell,
.el-table th.el-table__cell.is-leaf {
  border-bottom: 1px solid var(--current-line-2-color) !important;
}

/*.arco-btn-secondary,
.arco-btn-secondary[type="button"],
.arco-btn-secondary[type="submit"] {
  background: var(--current-input-bg-color) !important;
  color: var(--current-primary-color) !important;
}*/
</style>
