import { RoleEnum } from "@types-enum/role.enum";

export interface IAuthentication {
  email: string;
  password: string;
}

export interface IAuthResponse {
  token: string;
  user: any;
}

export interface IAuthTokenDecoded {
  id: string;
  role: RoleEnum;
  exp: string;
  iat: string;
}
