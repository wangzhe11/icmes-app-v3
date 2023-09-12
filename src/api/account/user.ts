import request from '/@/utils/request';
import { LoginParams, LoginResultModel, PublicKeyResultModel } from './model/userModel';

enum Api {
  baseUrl = '/account/',
}

// 获取publicKey
export function getPublicKeyApi(config = { showLoading: true }) {
  return request<any, PublicKeyResultModel>({
    config,
    url: Api.baseUrl + 'publicKey',
    method: 'get',
  });
}

export function loginApi(data: LoginParams, config = { showLoading: true }) {
  return request<any, LoginResultModel>({
    config,
    url: Api.baseUrl + 'login',
    method: 'post',
    data,
  });
}
