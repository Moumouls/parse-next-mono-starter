export const userHooks = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	Parse.Cloud.beforeSave('_User', async (request) => {
		// You hook here
	})
}
