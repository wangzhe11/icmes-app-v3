import dayjs from 'dayjs';

export function dateFormat(date: string | number, format: string) {
  return dayjs(date).format(format);
}
