import request from '/@/utils/request';
import {
  MessageListParams,
  MessageListResultModel,
  MessageReadResultModel,
} from './model/messageModel';

enum Api {
  baseUrl = '/notice/message/',
}

/** 获取消息列表 */
export function getMessageListApi(data: MessageListParams, config = { showLoading: true }) {
  return request<any, MessageListResultModel>({
    config,
    url: Api.baseUrl + 'list',
    method: 'post',
    data,
  });
}

/** 修改消息已读状态 */
export function setMessageReadApi(id: number, config = { showLoading: true }) {
  return request<any, MessageReadResultModel>({
    config,
    url: Api.baseUrl + id + '/readed',
    method: 'put',
  });
}
