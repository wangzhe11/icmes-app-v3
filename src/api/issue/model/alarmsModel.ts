export enum BusinessType {
  ALARM_PLC,
  ALARM_REPORT,
  ALARM_OVERDUE,
  ALARM_PRODUCE_DATA,
  ALARM_CHECK_DEVICE,
  ALARM_POWER_SAFETY,
  ALARM_PERSONNEL_ORIENTATION,
}

export enum HandleType {
  /** 线上处理 */
  HANDLE_ONLINE,
  /** 报修单处理 */
  HANDLE_REPAIR_ORDER,
  /** 督办 */
  HANDLE_SUPERVISE,
  /** 已读未读 */
  HANDLE_READ_OR_NOT,
}

export interface Other {
  /** 业务类型 */
  businessType: BusinessType;
  /** 未处理数量 */
  count: number;
  /** 处理方式 */
  handleType: HandleType;
}

export interface AlarmsNotStartNumResultModel {
  /** 总数 */
  all: number;
  /** 各业务统计 */
  others: Other[];
}
