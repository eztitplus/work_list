<template>
  <loading-page :progress="progress"></loading-page>
  <div class="hiddens relative w-screen items-center justify-center" :class="{ flex: !loadStatus }">
    <header-page @mode-change="changMode"></header-page>
    <a-config-provider :locale="zhTW">
      <router-view :loading="loadStatus" :theme="theme" class="mode-bg" />
    </a-config-provider>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import loadingPage from "@/components/loadingPage";
import headerPage from "@/components/header";
import zhTW from "@arco-design/web-vue/es/locale/lang/zh-tw";
export default {
  name: "appPage",
  components: {
    loadingPage,
    headerPage,
  },
  data() {
    return {
      zhTW,
    };
  },
  setup() {
    const loadStatus = ref(true);
    const progress = ref(0);
    const theme = ref("");
    const changMode = (value) => {
      theme.value = value;
    };

    const countTo100 = () => {
      let count = 0;
      const interval = setInterval(() => {
        if (count <= 100) {
          progress.value = count;
          count++;
        } else {
          clearInterval(interval);
          loadStatus.value = false;
        }
      }, 10);
    };
    onMounted(() => {
      countTo100();
    });

    /*watch(loadStatus, (newValue) => {
      console.log(loadStatus.value, newValue, loadStatus);
      if (newValue) {
        countTo100();
      }
    });*/

    return {
      loadStatus,
      progress,
      theme,
      changMode,
    };
  },
};
</script>
<style lang="scss">
body {
  background: var(--current-background-color) !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  //background: #f5f7fa;
  height: 100vh;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
