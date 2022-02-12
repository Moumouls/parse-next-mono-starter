export const Role = {
	className: '_Role',
	classLevelPermissions: {
		find: { requiresAuthentication: true },
		count: { requiresAuthentication: true },
		get: { requiresAuthentication: true },
		update: {},
		create: {},
		delete: {},
		addField: {},
	},
}
