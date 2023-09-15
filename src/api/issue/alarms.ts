import request from '/@/utils/request';
import { AlarmsNotStartNumResultModel } from './model/alarmsModel';

enum Api {
  baseUrl = '/issue/',
}

/** 报警看板页统计数(首页安全生产处置报警数) */
export function getAlarmsNotStartNumApi() {
  return request<any, AlarmsNotStartNumResultModel>({
    url: Api.baseUrl + 'alarms/statistics/notStart',
    method: 'get',
  });
}
