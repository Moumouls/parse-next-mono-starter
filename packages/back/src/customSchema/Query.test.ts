import { resolvers } from './Query'

describe('customHelloQueryField', () => {
	it('should return hello from nexus', () => {
		expect(resolvers.customHello()).toEqual('Hello from Nexus')
	})
})
