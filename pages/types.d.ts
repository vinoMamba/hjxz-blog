export interface UserInfo {
  name: string;
  userId: string;
}

export interface Result<T> {
  errcode: number;
  message: string;
  data: T;
}
