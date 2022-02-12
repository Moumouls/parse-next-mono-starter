import { makeSchema, declarativeWrappingPlugin } from 'nexus'
import * as Query from './Query'
import * as Scalars from './scalars'
import * as Types from './types'
import * as Enums from './enums'
import * as Mutations from './mutations'

const ParseDefaultTypes = require('parse-server/lib/GraphQL/loaders/defaultGraphQLTypes')

export const customSchema = makeSchema({
	types: [Query, Types, Scalars, Enums, Mutations, ParseDefaultTypes.DATE],
	plugins: [declarativeWrappingPlugin()],
	nonNullDefaults: { output: false, input: false },
	outputs: {
		typegen: `${__dirname}/nexusTypes.d.ts`,
	},
	contextType: {
		export: 'Context',
		module: `${__dirname}/context.d.ts`,
		alias: 'ctx',
	},
})
