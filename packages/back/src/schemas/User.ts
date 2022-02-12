export const User = {
	className: '_User',
	fields: {
		email: { type: 'String' },
		authData: { type: 'Object' },
		emailVerified: { type: 'Boolean' },
		password: { type: 'String' },
		username: { type: 'String' },
		firstname: { type: 'String' },
		lastname: { type: 'String' },
		picture: { type: 'File' },
		role: { type: 'Pointer', targetClass: '_Role' },
	},
	classLevelPermissions: {
		find: { 'role:Admin': true },
		count: { 'role:Admin': true },
		get: { requiresAuthentication: true },
		update: { requiresAuthentication: true },
		create: { 'role:Admin': true },
		delete: { 'role:Admin': true },
		addField: {},
		protectedFields: {
			'*': ['authData', 'emailVerified', 'password', 'username'],
		},
	},
}
