import request from '/@/utils/request';
import { RemoteConfigResultModel } from './model/configModel';

enum Api {
  baseUrl = '/info/configs/',
}

/** 获取系统配置信息 */
export function getRemoteConfigApi(config = { showLoading: true }) {
  return request<any, RemoteConfigResultModel>({
    config,
    url: Api.baseUrl + 'dict',
  });
}
