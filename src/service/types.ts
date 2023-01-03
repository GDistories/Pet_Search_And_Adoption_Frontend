export interface IDataType<T = any> {
  success: boolean
  message: string
  content: T
}
