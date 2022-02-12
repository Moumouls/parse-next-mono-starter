import { enumType } from 'nexus'
import { getWhereInput } from '../helper'

export enum ERoleEnum {
	Admin = 'Admin',
	Printer = 'Printer',
	Customer = 'Customer',
	Spectator = 'Spectator',
}
export const RoleEnum = enumType({
	name: 'RoleEnum',
	members: Object.values(ERoleEnum),
	description: 'Kind of role',
})

export const RoleEnumWhereInput = getWhereInput(RoleEnum)
