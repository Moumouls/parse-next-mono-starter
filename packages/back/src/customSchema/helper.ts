import { inputObjectType, scalarType, enumType } from 'nexus'

export const getWhereInput = (
	type: ReturnType<typeof scalarType> | ReturnType<typeof enumType>,
) =>
	inputObjectType({
		name: `${type.name}WhereInput`,
		definition(t) {
			t.field('equalTo', { type })
			t.field('notEqualTo', { type })
			t.field('lessThan', { type })
			t.field('lessThanOrEqualTo', { type })
			t.field('greaterThan', { type })
			t.field('greaterThanOrEqualTo', { type })
			t.field('in', { type, list: [false] })
			t.field('notIn', { type, list: [false] })
			t.boolean('exists')
			t.string('matchesRegex')
			t.string('options')
		},
	})
