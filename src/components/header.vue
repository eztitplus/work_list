<template>
  <div class="fixed top-0 z-[99] w-full">
    <!--header-->
    <div class="bg-white flex h-[60px] w-full items-center justify-center space-x-2 px-5">
      <img class="h-[35px] cursor-pointer" src="../assets/LOGO/EZPLUS_Black.svg" alt="億集科技" @click="this.$router.push({ path: '/' })" />
      <div class="flex flex-1 justify-end">
        <div class="mode-text cursor-pointer rounded border border-transparent px-2 py-1 text-lg hover:border-[#165DFF]" @click="goPage">前往禪道</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "headerPage",
  components: {},
  data() {
    return {
      modeStatus: true,
      showSideMenu: false,
      menuList: [
        {
          index: 0,
          label: "首頁",
          name: "HOME",
          link: "/",
        },
        {
          index: 1,
          label: "最新消息",
          name: "NEWS",
          link: "/newsPage",
        },
        {
          index: 2,
          label: "產品介紹",
          name: "PRODUCT",
          link: "/productPage",
        },
        {
          index: 3,
          label: "應用案例",
          name: "SUCCESS STORY",
          link: "/successPage",
        },
        {
          index: 4,
          label: "顧問服務",
          name: "COUNSELING",
          link: "/counselingPage",
        },
        {
          index: 5,
          label: "關於我們",
          name: "ABOUT US",
          link: "/aboutPage",
        },
      ],
    };
  },
  methods: {
    // 前往分頁
    goPage() {
      window.open("https://zen.ezplus.com.tw/index.php", "_blank");
    },
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
  --current-background-color: var(--dark-background-color);
  --current-primary-color: var(--dark-primary-color);

  /* 深色主题 */
  --dark-primary-color: #fff;
  --dark-background-color: #0e1116;
}

:root[data-theme="light"] {
  /* 模式變量切換：預設light模式 */
  --current-background-color: var(--light-background-color);
  --current-primary-color: var(--light-primary-color);

  /* 淺色主題 */
  --light-primary-color: #000;
  --light-background-color: #f2f2f2;
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
</style>
