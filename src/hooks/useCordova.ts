import { useConfigStore } from '../store/modules/config';
import { useUserStore } from '../store/modules/user';
import { useRouter } from 'vue-router';
import { getMessageRouterName } from '../utils';

declare let cordova: any;

export interface Notification {
  id: number;
  businessId: number;
  businessType: string;
  messageType: string;
  planType: string;
  title: string;
  content: string;
  text: string;
  vibrate: boolean;
  smallIcon: string;
  foreground: boolean;
}

const { getUserInfo } = useUserStore();
const { getConfig } = useConfigStore();
const router = useRouter();
let isOneShowing = false;

console.log('getConfig :>> ', getUserInfo, getConfig);
export function useNotification() {
  if (window.cache) {
    window.cache.listenNotification(
      [`${getUserInfo.employeeId}_web,${getConfig.socketUrl}`],
      (success: Notification) => {
        if (
          success.messageType === 'APPROVAL' ||
          success.messageType === 'TASK' ||
          success.messageType === 'CARBON' ||
          success.messageType === 'MESSAGE'
        ) {
          cordova.plugins.notification.local.schedule({
            id: new Date().getTime(),
            businessId: success.businessId,
            businessType: success.businessType,
            planType: success.planType,
            title: success.title,
            text: success.content,
            vibrate: false,
            smallIcon: 'res://mipmap-xhdpi/icon_task.png',
            foreground: true,
          });
        }
      },
      (error: any) => {
        console.log('error' + error);
      },
    );
  }
  cordova.plugins.backgroundMode.setEnabled(true);
  cordova.plugins.notification.local.on('click', (notification: Notification) => {
    if (notification.businessType) {
      const routerName = getMessageRouterName(notification);
      if (routerName === 'checkPowerCutList') {
        router.push({
          name: routerName,
          params: {
            code: notification.businessId,
          },
        });
      } else if (routerName === 'maintenanceScheduleDetail') {
        router.push({
          name: routerName,
          query: {
            id: notification.businessId,
            type: notification.planType,
          },
        });
      } else if (routerName === 'powerCutTask') {
        router.push({
          name: routerName,
          query: {
            code: notification.businessId,
          },
        });
      } else if (routerName === 'Index') {
        router.push({
          name: routerName,
        });
      } else {
        router.push({
          name: routerName,
          query: {
            id: notification.businessId,
          },
        });
      }
    } else {
      router.push({
        name: 'Index',
      });
    }
  });
  cordova.plugins.notification.local.on('clear', (notification: Notification) => {
    if (notification.id == 1 && isOneShowing) {
      isOneShowing = false;
    }
  });
  // eslint-disable-next-line no-undef
  cordova.plugins.notification.local.on('add', (notification: Notification) => {
    if (notification.id == 1 && !isOneShowing) {
      isOneShowing = true;
    }
  });
}
