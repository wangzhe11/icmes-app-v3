export interface RemoteConfigResultModel {
  defaultCallRecordDayPeriod: number;
  dicts: Dict;
  features: Feature[];
  menus: Menu;
  needCheckPLCStatus: boolean;
  needFaceRecognition: boolean;
  passwordValidation: string;
  sipServerUri: string;
}

export interface Dict {
  [index: string]: {
    /** 数据字典中的选项是否被禁用 */
    disabled?: boolean;
    /** 数据字典中的选项中文名 */
    name?: string;
    options?: Dict | null;
    /** 数据字典中的选项排序字段，越小越靠前 */
    order?: number;
  };
}

export interface Feature {
  children: Feature[];
  id: string;
  isFeature: boolean;
  label: string;
}

export interface Menu {
  [index: string]: {
    childs: Menu[] | null;
    /** 目录中文名 */
    name: string;
    /** 排序字段，越小越靠前 */
    order: number;
  };
}
