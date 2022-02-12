import { Context } from '../../context.d'
import { createUserSession, getClient } from '../../../utils'

export const renewSessionToken = async (
	root: any,
	args: any,
	context: Context,
) => {
	const userId = context.auth.user?.id

	if (!userId || root.objectId !== userId) return null

	const { sessions } = await getClient().getUserSession({ userId })
	if (!sessions.edges?.[0]?.node) return null
	const session = sessions.edges[0].node

	if (!session.expiresAt || !session.sessionToken) return null
	const expirationDate = new Date(session.expiresAt)
	const twoDays = 2 * 24 * 60 * 60 * 1000

	if (expirationDate.getTime() - Date.now() < twoDays) {
		return createUserSession(userId)
	}

	return session.sessionToken
}
