import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import "./assets/tailwind.css";
import router from "./router";
import store from "./store";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import locale from "element-plus/es/locale/lang/zh-tw";

import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";

// Sweetalert2
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
const options = {
  confirmButtonColor: "#41b882",
  cancelButtonColor: "#ff7674",
};

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus, { locale: locale });
app.use(VueSweetalert2, options);
app.use(ArcoVue);
app.mount("#app");

// createApp(App).use(store).use(router).use(ElementPlus, { locale: locale }).use(ArcoVue).mount("#app");
