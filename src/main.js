import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import "./assets/main.css";

import { Quasar, Notify } from "quasar";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.use(Quasar, {
    plugins: {
        Notify,
    },
});
app.use(router);
app.mount("#app");
