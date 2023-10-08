import { Dict } from '../api/info/model/configModel';
import { useUserStore } from '../store/modules/user';
import { isNil } from 'lodash-es';

interface DictOptions {
  label: string;
  value: string;
}

const { getDict } = useUserStore();
const dicts = getDict;

/**
 * 根据类型获取相应的字典数据
 * @param {string} code
 */
export function getDictByType(code: string): Dict {
  if (isNil(dicts[code])) return { options: {} };
  const options = dicts[code].options;
  const dictOptions: Dict = {};
  if (isNil(options)) {
    return { options: {} };
  } else {
    for (const p in options) {
      if (!options[p].disabled) {
        dictOptions[p] = options[p];
      }
    }
  }
  dicts[code].options = dictOptions;
  return dicts[code] as Dict;
}

/**
 * 获取相应的字典名
 * @param {string} code
 * @param {string} key
 */
export function getDictName(code: string, key: string) {
  if (isNil(dicts[code])) return key;
  const options = dicts[code].options;
  if (isNil(options) || isNil(options[key])) return key;
  return options[key].name;
}
/**
 * 选中数据字典中对应 code 的数据，转化为可遍历的下拉框选项
 * @param code 数据字典中要查询的 code
 * @returns 字典数据转化为的可用于vue 循环的数组
 * @example getDictOptions('ALGORITHM') => [{value: 'ADD', label: '+'}, {value: 'SUBTRACT', label: '-'}]
 */
export function getDictOptions(code: string): DictOptions[] {
  const TYPE = getDictByType(code).options as Dict;
  const options: DictOptions[] | [] = [];

  for (const key in TYPE) {
    const value = TYPE[key];
    const obj = { value: key, label: value.name as string };
    (options as DictOptions[]).push(obj);
  }
  return options;
}

/**
 * 选中数据字典中对应 code 的数据，转化为 {key:name} 的映射关系
 * @param code 数据字典中要查询的 code
 * @returns 相应字典数据转化出的映射关系
 * @example getDictMap('ALGORITHM') => {ADD: '+', SUBTRACT: '-'}
 */
export function getDictMap(code: string) {
  const TYPE = getDictByType(code).options as Dict;
  const map: Record<string, string> = {};

  for (const key in TYPE) {
    const value = TYPE[key];
    map[key] = value.name as string;
  }
  return map;
}
