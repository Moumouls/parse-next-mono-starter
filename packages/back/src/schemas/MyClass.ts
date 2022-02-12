export const MyClass = {
	className: 'MyClass',
	fields: {
		name: { type: 'String' },
		picture: { type: 'File' },
		books: { type: 'Array' },
		isUsed: { type: 'Boolean', defaultValue: false },
		author: { type: 'Pointer', targetClass: '_User' },
	},
	classLevelPermissions: {
		find: { requiresAuthentication: true },
		count: { requiresAuthentication: true },
		get: { requiresAuthentication: true },
		update: { requiresAuthentication: true },
		create: { requiresAuthentication: true },
		delete: { requiresAuthentication: true },
		addField: {},
		protectedFields: {},
	},
}
