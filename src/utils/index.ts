import { Snackbar } from '@varlet/ui';
import '@varlet/ui/es/button/style/index';
import '@varlet/ui/es/snackbar/style/index';
import { Notification } from '../hooks/useCordova';

// 消息提示
export function toastMessage(text: string) {
  Snackbar({
    content: text,
    position: 'bottom',
  });
}

// 登录密码加密
export function compile(code: string) {
  let c = String.fromCharCode(code.charCodeAt(0) + code.length);
  for (let i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
  }
  return escape(c);
}

// 登录密码解密
export function unCompile(code: string) {
  code = unescape(code);
  let c = String.fromCharCode(code.charCodeAt(0) - code.length);
  for (let i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
  }
  return c;
}

// 获取不同类型跳转路由名称
export function getMessageRouterName(item: Notification) {
  const routerIndex: { [key: string]: string } = {
    // 停送电申请单
    BT_POWER_CUT: 'checkPowerCutList',
    // 停送电任务
    BT_POWER_TASK: 'powerCutTask',
    // 质量检测
    NBT_QUALITY_INSPECTION: 'QualityInspectionDetail',
    // 设备档案
    NBT_DEVICE_PROBLEM: 'CheckResume',
    // 商品煤审批的通知
    BT_PROD_CHECK: 'commercialCoalInfo',
    // 检修单
    BT_MAINT_ORDER: 'CheckMaintenance',
    // 检修计划
    BT_MAINT_PLAN: 'maintenanceScheduleDetail',
    // 检修任务
    NBT_MAINTENANCE_ORDER_TASK: 'Maintenance',
    // 润滑任务
    NBT_DEVICE_LUBRICATE: 'LubricationTask',
    // 产量报表
    NBT_PRODUCTION_REPORT: 'YieldReport',
    // 报警看板
    NBT_PLC_ALERT: 'alarmInfo',
    // 设备报修单通知
    BT_REPAIR_ORDER: 'CheckRepairForm',
  };
  const businessType = item.businessType;
  let routerName = '';
  if (routerIndex[businessType]) {
    routerName = routerIndex[businessType];
  } else {
    routerName = 'Index';
  }
  return routerName;
}
