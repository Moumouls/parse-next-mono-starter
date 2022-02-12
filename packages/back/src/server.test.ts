import { rawClient } from './utils/graphql'
import { startServer, closeServer } from './utils/testHelper'

describe('server', () => {
	it('should run server', async () => {
		let server
		try {
			server = await startServer()
		} catch (e) {
			expect(e).toBeUndefined()
		}
		await closeServer(server)
	})

	it('should server be healthy', async () => {
		const server = await startServer()
		const query = '{ health }'
		const { health } = await rawClient.request(query)
		expect(health).toBeTruthy()
		await closeServer(server)
	})
})
