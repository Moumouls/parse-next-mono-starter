/* istanbul ignore file */
import { extendType } from 'nexus'
import { getMongoClient } from '../../utils'
import { schemas } from '../../schemas'

export const ResetEnv = extendType({
	type: 'Mutation',
	definition(t) {
		t.field('resetEnv', {
			type: 'Boolean',
			resolve: async () => {
				if (process.env.NODE_ENV === 'production') return true
				const mongo = await getMongoClient()
				await Promise.all(
					schemas.map(async (schema) => {
						await mongo.db
							.collection(schema.className)
							.deleteMany({})
					}),
				)
				await mongo.db.collection('_Role').deleteMany({})
				await mongo.db.collection('_Session').deleteMany({})
				return true
			},
		})
	},
})
