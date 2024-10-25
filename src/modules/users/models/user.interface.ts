import { ICommonAttributes } from '@models/common-interface-attributes';
import { RoleEnum } from '@types-enum/role.enum';

export interface IUser extends ICommonAttributes {
  name: string;
  lastName: string;
  email: string;
  password?: string;
  phone: string;
  isActive?: boolean;
  role?: RoleEnum;
}
