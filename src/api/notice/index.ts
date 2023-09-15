import request from '/@/utils/request';
import { UnreadNotificationNumResultModel } from './model/indexModel';

enum Api {
  baseUrl = '/notice/',
}

/** 获取未读通知数 */
export function getUnreadNotificationNumApi() {
  return request<any, UnreadNotificationNumResultModel>({
    url: Api.baseUrl + 'unreadNotificationNum',
    method: 'get',
  });
}
