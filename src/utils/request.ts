import axios from 'axios';
import { toastMessage } from '/@/utils/index';
import { useConfigStore } from '/@/store/modules/config';
import { useUserStore } from '/@/store/modules/user';
import app from '../main';
// import router from '@/router';

const { getConfig } = useConfigStore();

let needLoadingRequestCount = 0;

function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    app.config.globalProperties.LOADING.show();
  }
  needLoadingRequestCount++;
}

function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    // 300ms 间隔内的 loading 合并为一个loading
    setTimeout(tryCloseLoading, 300);
  }
}

const tryCloseLoading = () => {
  if (needLoadingRequestCount === 0) {
    app.config.globalProperties.LOADING.hide();
  }
};

const baseURL = getConfig.serverUrl;
const service = axios.create({
  baseURL: baseURL,
  timeout: 50000,
});

service.interceptors.request.use(
  (config) => {
    const { getAccessToken } = useUserStore();

    config.headers['TerminalType'] = 'WECHAT';

    if (config.config && config?.config.showLoading) {
      showFullScreenLoading();
    }

    if (
      getAccessToken &&
      ![
        '/account/login',
        '/info/configs/dict',
        '/account/publicKey',
        '/account/face/login',
      ].includes(config.url as string)
    ) {
      config.headers['Authorization'] = ['Bearer ', getAccessToken].join('');
    } else {
      config.headers['Authorization'] = '';
    }
    const { getConfig } = useConfigStore();
    const baseURL = getConfig && getConfig.serverUrl;
    config.url = ((baseURL as string) + config.url) as string;
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {
    if (response.config.config && response.config.config.showLoading) {
      tryHideFullScreenLoading();
    }

    const {
      data: { data, status, errorcode, message },
      config,
    } = response;

    if (data && ![0, 1000028].includes(status) && errorcode !== '200') {
      toastMessage(message);
      return Promise.reject(`${config.url} >>: ${JSON.stringify(data)}`);
    } else {
      // 如果返回的data中items为null，则将其变为空数组，否则如果对null进行数组操作会报错
      if (data.hasOwnProperty('items') && data.items === null) {
        data.items = [];
      }
      return data;
    }
  },
  (error) => {
    const { config, response } = error;
    if (config.config && config.config.showLoading) {
      tryHideFullScreenLoading(); //消除loading
    }

    if (response && response.status && error.response.status !== 1000028) {
      app.config.globalProperties.LOADING.hide();
      const status = response.status;

      switch (status) {
        case 401:
          break;
        case 500:
          if (response) {
            toastMessage(response.data.message || '发生未知错误，请联系管理员');
          }
          break;
      }
      return Promise.reject(response.data.message);
    }
  },
);
export default service;
