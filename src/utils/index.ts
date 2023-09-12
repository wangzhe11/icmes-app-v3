import { Snackbar } from '@varlet/ui';
import '@varlet/ui/es/button/style/index';
import '@varlet/ui/es/snackbar/style/index';

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
