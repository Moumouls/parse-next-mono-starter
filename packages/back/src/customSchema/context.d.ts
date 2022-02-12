export interface Context {
	auth: {
		isMaster: boolean
		user?: Parse.User
	}
}
