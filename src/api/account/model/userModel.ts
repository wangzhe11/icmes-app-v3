/* 获取公钥接口返回数据 */
export interface PublicKeyResultModel {
  /** 字符编码列表 */
  codeList: string[];
  /** 公钥 */
  key: string;
}

/* 登录接口请求参数 */
export interface LoginParams {
  /** 员工工号 */
  employeeCode: string;
  /** 登录密码 */
  password: string;
  /** 登录私钥 */
  key?: string;
}

/** 登录接口返回数据 */
export interface LoginResultModel {
  /** 登录权限验证token */
  accessToken: string;
  /** 员工头像路径 */
  avatar: string;
  /** 表示账号是否需要更改密码 */
  changePassword: boolean;
  /** 员工编号 */
  employeeCode: string;
  /** 员工标识Id */
  employeeId: number;
  /** 功能范围 map */
  featureScopes: { [index: string]: number[] };
  /** 功能映射 map */
  features: { [index: string]: { [index: string]: boolean } };
  /** 是否有脸部信息 */
  hasFaceInfo: boolean;
  /** 员工姓名 */
  name: string;
  /** 员工所属部门 */
  organization: string;
  /** 员工所属部门标识 */
  organizationId: number;
  /** 专用设备号 */
  specialDevice: string;
  /** 登录用户Id */
  userId: number;
}

export interface Length {
  min: number;
  max: number;
}

export interface Complex {
  number: number;
  lowercase: number;
  capital: number;
  character: number;
}

export interface ErrorMessage {
  excludingNumber: string;
  containNumber: string;
  excludingLowercase: string;
  containLowercase: string;
  excludingCapital: string;
  containCapital: string;
  excludingCharacter: string;
  containCharacter: string;
  lengthTips: string;
  containSpace: string;
}

/** 密码校验 */
export interface PasswordValidation {
  lockedUserMessage: string;
  lockNumber: number;
  length: Length;
  complex: Complex;
  errorMessage: ErrorMessage;
}
