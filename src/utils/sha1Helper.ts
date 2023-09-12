import MD5 from 'crypto-js/md5';
import UTF8 from 'crypto-js/enc-utf8';
import HEX from 'crypto-js/enc-hex';
import AES from 'crypto-js/aes';
import padding from 'crypto-js/pad-zeropadding';
import { isString, isObject, forEach } from 'lodash-es';

export function encryptSalt(data: string) {
  return MD5(MD5(data).toString() + data).toString();
}

export function encryptPwd(data: string | { [index: string]: {} }, aesKey: string) {
  const key = UTF8.parse(aesKey + aesKey.substr(0, 6));
  const iv = key;
  console.log('padding :>> ', padding);
  const aesOption = {
    iv: iv,
    padding,
  };
  if (isString(data)) {
    const cliphertext = AES.encrypt(data, key, aesOption).ciphertext;
    return HEX.stringify(cliphertext).toString();
  }

  if (isObject(data)) {
    const obj: { [index: string]: {} } = {};
    forEach(data, function (value, key) {
      obj[key] = key === 'key' ? value : encryptPwd(value, aesKey);
    });
    return obj;
  }

  return '';
}
