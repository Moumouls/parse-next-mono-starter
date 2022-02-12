import { objectType, inputObjectType } from 'nexus'
import { RoleEnum, RoleEnumWhereInput } from '../enums'

export const Role = objectType({
	name: 'Role',
	definition(t) {
		t.field('name', { type: RoleEnum })
	},
})

export const RoleWhereInput = inputObjectType({
	name: 'RoleWhereInput',
	definition: (t) => {
		t.field('name', { type: RoleEnumWhereInput })
	},
})

export const CreateRoleFieldsInput = inputObjectType({
	name: 'CreateRoleFieldsInput',
	definition: (t) => {
		t.field('name', { type: RoleEnum })
	},
})

export const UpdateRoleFieldsInput = inputObjectType({
	name: 'UpdateRoleFieldsInput',
	definition: (t) => {
		t.field('name', { type: RoleEnum })
	},
})
