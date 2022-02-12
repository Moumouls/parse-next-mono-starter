import { objectType, inputObjectType } from 'nexus'
import { EmailScalar, EmailWhereInput } from '../scalars'
import { renewSessionToken } from '../resolvers/Mutation/renewSessionToken'

export const User = objectType({
	name: 'User',
	definition(t) {
		t.field('email', { type: EmailScalar })
		t.field('newSessionToken', {
			type: 'String',
			resolve: renewSessionToken,
		})
	},
})

export const UserWhereInput = inputObjectType({
	name: 'UserWhereInput',
	definition: (t) => {
		t.field('email', { type: EmailWhereInput })
	},
})

export const CreateUserFieldsInput = inputObjectType({
	name: 'CreateUserFieldsInput',
	definition: (t) => {
		t.field('email', { type: EmailScalar })
		t.string('username')
		t.string('password')
	},
})

export const UserLoginWithInput = inputObjectType({
	name: 'UserLoginWithInput',
	definition: (t) => {
		t.field('email', { type: EmailScalar })
	},
})

export const UpdateUserFieldsInput = inputObjectType({
	name: 'UpdateUserFieldsInput',
	definition: (t) => {
		t.field('email', { type: EmailScalar })
	},
})
