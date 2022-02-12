import { scalarType } from 'nexus'
import validator from 'validator'
import { getWhereInput } from '../helper'

export const EmailScalar = scalarType({
	name: 'Email',
	description: 'An email like: john.doe@mail.org',
	parseValue: (value: string) => {
		if (value.trim() === '') return undefined
		if (validator.isEmail(value)) {
			return value
		}
		throw new Error('Email is invalid')
	},
	serialize: (value: string) => value,
})

export const EmailWhereInput = getWhereInput(EmailScalar)
