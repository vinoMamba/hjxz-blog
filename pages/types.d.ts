export interface UserInfo {
  name: string;
  userId: string;
}
export interface JWT {
  token: string;
}
export interface LoginInfo {
  userInfo: UserInfo;
  jwt: JWT;
}

export interface Result<T> {
  errcode: number;
  message: string;
  data: T;
}

export interface TokenInfo {
  accessToken: string;
  expire: number;
}
