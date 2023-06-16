<template>
  <div :class="{ loading_out: !loadedStatus }" class="loading_progress flex-col space-y-2" :style="{ background: backgroundColor }">
    <lottie :options="EzLoading" class="h-[150px] w-[300px]" />
    <div v-if="barHide" class="relative h-2 w-[300px] rounded-full bg-gray-200">
      <div :style="{ width: `${progress}%` }" class="absolute h-full rounded-full bg-blue-500"></div>
    </div>
    <p v-if="barHide" class="text-xl">{{ progress }}%</p>
  </div>
</template>

<script>
import Lottie from "vue-lottie";
import EzLoading from "@/assets/ez_loading.json";
export default {
  name: "loadingPage",
  components: {
    Lottie,
  },
  props: {
    progress: {
      type: Number,
      default: 0,
    },
    barHide: {
      type: Boolean,
      default: true,
    },
    backgroundColor: {
      type: String,
      default: "#ffffff",
    },
  },
  data() {
    return {
      loadedStatus: true,
      EzLoading: { animationData: EzLoading, loop: true },
    };
  },
  watch: {
    progress(value) {
      if (value === 100) {
        this.loadedStatus = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.loading_progress {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  z-index: 9999;
  transition: width 0.2s ease;
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background: #fff;
}
.loading_out {
  transform: scale(0, 0);
  animation: fadenum 3s;
}
@keyframes fadenum {
  0% {
    transform: scale(1, 1);
    opacity: 1;
  }
  100% {
    transform: scale(0, 0);
    opacity: 0;
    filter: blur(1500px);
  }
}
</style>
