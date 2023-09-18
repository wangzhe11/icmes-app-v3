/*
  js 语言特性: JSON 循环,key 是数字,for in 循环的结果不是按顺序遍历而是按 key 值从小到大
  处理方式:
    加上 . 强制变成字符串,保证按照顺序遍历,取值的时候使用 `~~key` 得到真实的 key
    ~~'123' === 123
*/

const requireImg = (imgPath: string) => {
  return new URL(`${imgPath}`, import.meta.url).href;
};

interface Routes {
  [key: string]: {
    name: string;
    title: string;
    icon: string;
  };
}

export const mineActivityRoutes: Routes = {
  '91001.': {
    name: 'MyApprove',
    title: '我的审批',
    icon: requireImg('./images/icon-approve.png'),
  },
  '91002.': {
    name: 'MyTask',
    title: '我的任务',
    icon: requireImg('./images/icon-task.png'),
  },
  '91003.': {
    name: 'CarbonCopyMyself',
    title: '抄送我的',
    icon: requireImg('./images/icon-copy.png'),
  },
  '92019.': {
    name: 'SafeProductionPlatform',
    title: '安全生产处置',
    icon: requireImg('./images/icon-call-police.png'),
  },
  // '91004.': {
  //   name: 'callPolice',
  //   title: '报警看板',
  //   icon: requireImg('./images/icon-call-police.png')
  // },
  // '91005.': {
  //   name: 'ProductionBoard',
  //   title: '生产看板',
  //   icon: requireImg('./images/icon-prod-board.png')
  // }
};

export const otherRoutes: Routes = {
  // TODO! 测试权限，一定要删除
  // '20540.': {
  //   name: 'tree',
  //   title: '测试数据',
  //   icon: requireImg('./images/icon-yichangchaxun.png')
  // },
  '92010.': {
    name: 'ProductionPlan',
    title: '生产计划',
    icon: requireImg('./images/icon-prod-plan.png'),
  },
  '92011.': {
    name: 'YieldReport',
    title: '产量报表',
    icon: requireImg('./images/icon-yield-report.png'),
  },
  '92007.': {
    name: 'EquipmentFile',
    title: '设备档案',
    icon: requireImg('./images/icon-equipment-file.png'),
  },
  '92015.': {
    name: 'CreatePowerCutList',
    title: '新建停送电',
    icon: requireImg('./images/icon-new-power-cut.png'),
  },
  '92001.': {
    name: 'PowerFailure',
    title: '停送电申请单',
    icon: requireImg('./images/icon-power-failure.png'),
  },
  '92002.': {
    name: 'ConfigPowerOperation',
    title: '配电操作',
    icon: requireImg('./images/icon-zlw-power-task.png'),
  },
  '92009.': {
    name: 'ArrangeWorksList',
    title: '排班管理',
    icon: requireImg('./images/icon-arrange-works-list.png'),
  },
  '92008.': {
    name: 'Schedule',
    title: '我的排班',
    icon: requireImg('./images/icon-my-schedule.png'),
  },
  '92014.': {
    name: 'QualityInspection',
    title: '质量检测',
    icon: requireImg('./images/icon-quality-inspection.png'),
  },

  '29200.': {
    name: 'CommercialCoalList',
    title: '商品煤检测',
    icon: requireImg('./images/icon-commercial-coal.png'),
  },
  '92006.': {
    name: 'RepairForm',
    title: '现场问题上报',
    icon: requireImg('./images/icon-repair-form.png'),
  },
  '92013.': {
    name: 'Maintenance',
    title: '检修单',
    icon: requireImg('./images/icon-maintenance.png'),
  },
  '92012.': {
    name: '<aintenanceSchedule',
    title: '检修计划',
    icon: requireImg('./images/icon-maintenance-schedule.png'),
  },
  '92003.': {
    name: 'EquipmentLubrication',
    title: '设备润滑',
    icon: requireImg('./images/icon-equipment-lubrication.png'),
  },
  // '92016.': {
  //   name: 'analysisYield',
  //   title: '精煤产率分析',
  //   icon: requireImg('./images/icon-analysis-yield.png')
  // },
  '92017.': {
    name: 'AnalysisAsh',
    title: '灰分预警分析',
    icon: requireImg('./images/icon-analysis-ash.png'),
  },
  '92018.': {
    name: 'AnalysisQuantity',
    title: '平均带煤量预警分析',
    icon: requireImg('./images/icon-analysis-quantity.png'),
  },
  '25050.': {
    name: 'CoalSlurryPool',
    title: '煤泥水池数据',
    icon: requireImg('./images/icon-coal-slurry-pool.png'),
  },
  '20540.ANALYSIS_MEDIUM_VIEW': {
    name: 'analysisMedium',
    title: '介耗异常预警分析',
    icon: requireImg('./images/icon-yichangchaxun.png'),
  },
  '23410.': {
    name: 'DeviceUnload',
    title: '拆装记录',
    icon: requireImg('./images/icon-yichangchaxun.png'),
  },
  '92020.': {
    name: 'ProductionDataRecordList',
    title: '生产数据记录',
    icon: requireImg('./images/icon-coal-slurry-pool.png'),
  },
  '23430.': {
    name: 'DeviceMonitoring',
    title: '设备监测',
    icon: requireImg('./images/icon_deviceMonitoring.png'),
  },
  '92063.': {
    name: 'BeltInspection',
    title: '皮带保护试验',
    icon: requireImg('./images/icon_belt_test.png'),
  },
};
