export interface BasicFetchListResult<T> {
  items: T[] | [];
  /** 数据总条数 */
  totalCount: number;
  /** 数据总页数 */
  totalPages: number;
}
