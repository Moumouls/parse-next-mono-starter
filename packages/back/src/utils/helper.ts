import { getClient } from './graphql'

const { newToken } = require('parse-server/lib/cryptoUtils')

export const getUrls = () => {
	const frontDomain = process.env.FRONT_DOMAIN || ''
	const backDomain = process.env.BACK_DOMAIN || ''
	const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
	const backBaseUrl = `${protocol}://${backDomain}`
	const frontBaseUrl = `${protocol}://${frontDomain}`
	return {
		backDomain,
		backBaseUrl,
		frontDomain,
		frontBaseUrl,
		publicGraphQLUrl: `${backBaseUrl}/graphql`,
		publicParseUrl: `${backBaseUrl}/parse`,
		internalParseUrl: `http://localhost:${process.env.PORT}/parse`,
	}
}

export const createUserSession = async (userId: string) => {
	const { createSession } = await getClient().createSession({
		// 4 days
		expiresAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
		token: `r:${newToken()}`,
		userId,
	})
	if (!createSession?.session.sessionToken)
		throw new Error(
			'CreateUserSession: Expected sessionToken to have been generated.',
		)

	return createSession.session.sessionToken
}
