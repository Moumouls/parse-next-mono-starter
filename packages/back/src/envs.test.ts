import './envs'

it('should keep envs', () => {
	expect(process.env.PORT).toEqual('1337')
})
