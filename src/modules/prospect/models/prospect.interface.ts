import { ICommonAttributes } from '@models/common-interface-attributes';

export interface IProspect extends ICommonAttributes {
  name: string;
  phone: string;
}
