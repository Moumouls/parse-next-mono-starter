import { EmailScalar } from '.'

describe('Email', () => {
	it('should throw an error on wrong email', () => {
		try {
			// @ts-ignore
			EmailScalar.value.parseValue('aWrongEmail')
			expect(true).toBeFalsy()
		} catch (e) {
			expect(e).toBeDefined()
		}
		// @ts-ignore
		expect(EmailScalar.value.serialize('john.doe@gmail.com')).toEqual(
			'john.doe@gmail.com',
		)
		// @ts-ignore
		expect(EmailScalar.value.parseValue('john.doe@gmail.com')).toEqual(
			'john.doe@gmail.com',
		)
	})
})
