/**
 * references to exclude from common-interface-attributes.ts
 */
export type CommonDBAttributes = 'id' | 'createdAt' | 'updatedAt';

export type CommonRoleAttributes = 'role' | 'isActive';

export type CommonDbAndRoleAttributes = CommonDBAttributes | CommonRoleAttributes;
