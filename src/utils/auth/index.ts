import { Persistent, BasicKeys } from '/@/utils/cache/persistent';
import { CONFIG_KEY, TOKEN_KEY } from '/@/enums/userEnums';

export function getToken() {
  return getAuthCache(TOKEN_KEY);
}

export function getAuthCache<T>(key: BasicKeys) {
  const fn = Persistent.getLocal;
  return fn(key) as T;
}

export function setAuthCache(key: BasicKeys, value) {
  const fn = Persistent.setLocal;
  return fn(key, value, true);
}

export function clearAuthCache(immediate = true) {
  const fn = Persistent.clearLocal;
  return fn(immediate);
}
