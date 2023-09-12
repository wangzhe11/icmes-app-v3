import { defineStore } from 'pinia';
import { LoginParams, LoginResultModel, PasswordValidation } from '/@/api/account/model/userModel';
import { getRemoteConfigApi } from '/@/api/info/config';
import { encryptPwd, encryptSalt } from '/@/utils/sha1Helper';
import { Dict, Feature, Menu } from '/@/api/info/model/configModel';
import { getPublicKeyApi, loginApi } from '/@/api/account/user';
import { compile } from '/@/utils';
import { useConfigStore } from './config';
import { getDepartmentListApi } from '/@/api/info/organization';
import { listToTreeAsParentId } from '/@/utils/tree';
import { DepartmentListModel } from '/@/api/info/model/organizationModel';
import { getEmployeesListApi, getOrganizationListApi } from '/@/api/info/callrecords';
import { CallRecordOrganizationsModel } from '/@/api/info/model/callrecordsModel';
import router from '/@/router';
import avatarImg from '/@/assets/images/avatar.png';

interface UserState {
  token: string;
  remoteConfig: {
    needFaceRecognition: boolean;
    dicts: Dict | null;
    passwordValidation: PasswordValidation | null;
    features: Feature[] | null;
    menus: Menu | null;
  };
  userInfo: LoginResultModel | null;
  departmentList: DepartmentListModel[] | null;
  departmentTree: DepartmentListModel[] | null;
  organizationList: CallRecordOrganizationsModel[] | null;
  organizationTree: CallRecordOrganizationsModel[] | null;
}

export const useUserStore = defineStore('app-user', {
  state: (): UserState => ({
    token: '',
    remoteConfig: {
      needFaceRecognition: false,
      dicts: null,
      passwordValidation: null,
      features: [],
      menus: null,
    },
    userInfo: null,
    departmentList: [],
    departmentTree: [],
    organizationList: [],
    organizationTree: [],
  }),
  getters: {
    getAccessToken(): string {
      return this.userInfo?.accessToken as string;
    },
    getMenus(): Menu {
      return this.remoteConfig.menus as Menu;
    },
    getUserInfo(): LoginResultModel {
      return this.userInfo as LoginResultModel;
    },
  },
  actions: {
    async login(params: LoginParams) {
      const { getConfig } = useConfigStore();
      console.log('getConfig :>> ', getConfig, getConfig.serverUrl);

      const remoteConfig = await getRemoteConfigApi();
      const { key, codeList } = await getPublicKeyApi();

      // 加盐加密
      const encryptSaltPassword = encryptSalt(params.password);

      const aesKey = codeList.reduce((res, pre, index) => {
        res += pre[index];
        return res;
      }, '');

      const password = encryptPwd(encryptSaltPassword, aesKey) as string;

      const userInfo = await loginApi({
        employeeCode: params.employeeCode,
        password: password,
        key: key,
      });

      // 保存配置信息，是否开启人脸登录、字典、权限列表、密码校验格式
      const { needFaceRecognition, dicts, features, menus } = remoteConfig;
      this.remoteConfig = {
        needFaceRecognition,
        dicts,
        features,
        menus,
        passwordValidation: JSON.parse(remoteConfig.passwordValidation),
      };

      this.userInfo = {
        ...userInfo,
        ...{
          password: params.password ? compile(params.password) : '',
          avatar: userInfo.avatar
            ? `${getConfig.serverUrl}/info/files/image/${userInfo.avatar}?access_token=${userInfo.accessToken}`
            : avatarImg,
        },
      };

      await this.setDepartmentData();
      await this.setOrganizationData();
      console.log('router :>> ', router);
      router.replace({
        name: 'Home',
      });
    },
    async setDepartmentData() {
      const { items } = await getDepartmentListApi({
        ascending: false,
        pageNo: 0,
        pageSize: 0,
      });
      const tree = listToTreeAsParentId(items!);
      this.departmentList = items;
      this.departmentTree = tree;
    },
    async setOrganizationData() {
      // 查询所有的组织和成员,重新组织数据结构
      (async () => {
        const { items: organizations } = await getOrganizationListApi({
          ascending: false,
          pageNo: 0,
          pageSize: 0,
        });

        const { items: employees } = await getEmployeesListApi({
          ascending: false,
          organizationId: 0,
          pageNo: 0,
          pageSize: 0,
        });

        return { organizations, employees };
      })()
        .then(({ organizations, employees }) => {
          organizations?.map((value) => {
            // fullOrganizationIds 参数格式改为数组,方便操作
            value.fullOrganizationIds = value.fullOrganizationIds[0].split(',');
          });
          // 将人员插入到对应的部门下
          employees?.map((employee) => {
            employee.isEmployee = true;
            organizations?.map((organization) => {
              organization.isEmployee = false;
              if (employee.organizationId === organization.id) {
                organization.children
                  ? organization.children.push(employee)
                  : (organization.children = [employee]);
              }
            });
          });
          /**
           * 将有父子关系的一维数组转换成关系树
           * @param {data} 需要转换的一维数组
           * @returns 整合完成的树形数组
           */
          function translateDataToTree(data: CallRecordOrganizationsModel[]) {
            // 根节点
            const parents = data.filter((value) => value.fullOrganizationIds.length === 1);
            // 子节点
            const children = data.filter((value) => value.fullOrganizationIds.length > 1);
            const translator = (
              parents: CallRecordOrganizationsModel[],
              children: CallRecordOrganizationsModel[],
            ) => {
              parents.map((parent) => {
                children.map((current, index) => {
                  if (current.parentId === parent.id) {
                    const temp = JSON.parse(JSON.stringify(children));
                    temp.splice(index, 1);
                    translator([current], temp);
                    parent.children ? parent.children.push(current) : (parent.children = [current]);
                    // 是否有孩子节点
                    parent.hasChild = parent.children ? parent.children.length > 0 : false;
                  }
                });
              });
            };
            translator(parents, children);
            return parents;
          }
          this.organizationList = organizations;
          this.organizationTree = translateDataToTree(organizations!);
        })
        .catch((error) => {
          throw error;
        });
    },
  },
});
