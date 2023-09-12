import 'virtual:uno.css';
import './styles/index.scss';
import { createApp } from 'vue';
import App from './App.vue';
import router from '/@/router';
import { setupStore } from '/@/store';
import Indicator from '/@/plugins/indicator';
import '@purge-icons/generated';

const app = createApp(App);

app.use(router);
app.use(Indicator);

interface LOADING {
  show(): null;
  hide(): null;
}

declare module 'vue' {
  export interface ComponentCustomProperties {
    LOADING: LOADING;
  }
}

app.config.globalProperties.$loading = Indicator;

// 配置 pinia
setupStore(app);

app.mount('#app');

export default app;
