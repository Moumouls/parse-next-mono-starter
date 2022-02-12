import { GraphQLClient } from 'graphql-request'
import { getSdk } from '../../generated/graphql'

// Lazy loaded
export const getRawClient = () =>
	new GraphQLClient(`http://localhost:${process.env.PORT}/graphql`, {
		headers: {
			'X-Parse-Application-Id': process.env.APP_ID || 'dev',
			'X-Parse-Master-Key': process.env.MASTER_KEY || 'dev',
		},
	})

// Lazy loaded
export const getClient = () => getSdk(getRawClient())

// eslint-disable-next-line
export let rawClient = getRawClient()

// eslint-disable-next-line
export let client = getClient()

export const userClient = (sessionToken: string) =>
	getSdk(
		new GraphQLClient(`http://localhost:${process.env.PORT}/graphql`, {
			headers: {
				'X-Parse-Application-Id': process.env.APP_ID || 'dev',
				'X-Parse-Session-Token': sessionToken,
			},
		}),
	)

export const refreshClients = () => {
	rawClient = getRawClient()
	client = getClient()
}
