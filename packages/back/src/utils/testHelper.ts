/* istanbul ignore file */
/* eslint-disable */
const { server } = require('../server')
import { v4 as uuid } from 'uuid'
import getPort from 'get-port'
import { refreshClients, rawClient } from './graphql'
import { GraphQLClient } from 'graphql-request'
/* eslint-enable */

// eslint-disable-next-line
export const closeServer = (parseServer: any) =>
	new Promise((resolve) => {
		parseServer.server.handleShutdown().then(() => {
			parseServer.server.server.close(async () => {
				// eslint-disable-next-line no-param-reassign
				parseServer.server = undefined
				resolve(true)
			})
		})
	})

interface StartServerOptions {
	needTransaction?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const startServer = async (options?: StartServerOptions) => {
	const port = await getPort()
	process.env.PORT = `${port}`
	process.env.BACK_DOMAIN = `localhost:${port}`
	process.env.MONGO_URL = options?.needTransaction
		? `mongodb://127.0.0.1:27045/${uuid()}?replicaSet=testset`
		: `mongodb://127.0.0.1:27046/${uuid()}?`

	refreshClients()
	return { server: await server() }
}

export const setup = (options?: StartServerOptions) => {
	let parseServer: any

	beforeAll(async () => {
		parseServer = await startServer(options)
	})
	afterAll(async () => {
		await closeServer(parseServer)
	})
}

const wrapClientForErrorTrace = (client: GraphQLClient): GraphQLClient => {
	const originalRequest = client.request
	// @ts-ignore
	// eslint-disable-next-line
	client.request = async (...args) => {
		try {
			return await originalRequest.apply(client, args)
		} catch (e) {
			throw new Error(e.message)
		}
	}
	return client
}

export const getMasterClient = () => wrapClientForErrorTrace(rawClient)

export const getAnonymousClient = () =>
	wrapClientForErrorTrace(
		new GraphQLClient(
			process.env.PORT
				? `http://localhost:${process.env.PORT}/graphql`
				: 'you forgot to setup env',
			{
				headers: {
					'X-Parse-Application-Id': 'dev',
				},
			},
		),
	)
