import { setup } from './testHelper'
import { rawClient } from './graphql'

setup()

describe('client', () => {
	it('should query local server', async () => {
		const data: any = await rawClient.request('{health}')
		expect(data.health).toEqual(true)
	})
})
