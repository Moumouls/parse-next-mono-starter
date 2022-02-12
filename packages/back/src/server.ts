import { ParseServer } from 'parse-server'
import S3Adapter from '@parse/s3-files-adapter'
import ParseDashboard from 'parse-dashboard'
import { Endpoint as S3Endpoint } from 'aws-sdk'
import './envs'
import { schemas as definitions } from './schemas'
import { Cloud as cloud } from './cloud'
import { customSchema } from './customSchema'
import { getUrls, setMongoClient } from './utils'

export const server = () =>
	new Promise((resolve) => {
		const urls = getUrls()
		// eslint-disable-next-line
		const parseServer = ParseServer.start({
			schema: {
				definitions,
				lockSchemas: true,
				strict: true,
				recreateModifiedFields: true,
				deleteExtraFields: true,
			},
			fileUpload: {
				enableForPublic: false,
				enableForAnonymousUser: false,
				enableForAuthenticatedUser: true,
			},
			databaseURI: process.env.MONGO_PASSWORD
				? process.env.MONGO_URL!.replace(
						'mongodb://',
						`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@`,
				  )
				: process.env.MONGO_URL,
			cloud,
			// 4 days session
			sessionLength: 4 * 24 * 60 * 60,
			// Block login if 3 failed login is detected
			accountLockout: {
				threshold: 3,
				duration: 10,
			},
			filesAdapter:
				process.env.NODE_ENV === 'production'
					? new S3Adapter({
							bucket: process.env.S3_BUCKET,
							region: '',
							directAccess: false,
							s3overrides: {
								s3ForcePathStyle: true,
								accessKeyId: process.env.S3_ACCESS_KEY,
								secretAccessKey: process.env.S3_SECRET_KEY,
								endpoint: new S3Endpoint(
									process.env.S3_ENDPOINT!,
								),
							},
					  })
					: undefined,
			appId: process.env.APP_ID,
			masterKey: process.env.MASTER_KEY,
			serverURL: urls.internalParseUrl,
			enforcePrivateUsers: false,
			logsFolder: null,
			publicServerURL: urls.publicParseUrl,
			logLevel: 'error',
			silent: !!process.env.TEST,
			graphQLSchema: customSchema,
			graphQLPath: '/graphql',
			playgroundPath: '/playground',
			enableAnonymousUsers: false,
			mountGraphQL: true,
			port: Number(process.env.PORT),
			startLiveQueryServer: false,
			directAccess: true,
			mountPlayground: process.env.NODE_ENV !== 'production',
			serverStartComplete: async () => {
				setMongoClient(parseServer)
				parseServer.expressApp.get('/ready', (req: any, res: any) => {
					res.send('true')
				})
				resolve(parseServer)
			},
		})

		const dashboard = new ParseDashboard(
			{
				apps: [
					{
						serverURL: urls.publicParseUrl,
						appId: process.env.APP_ID,
						masterKey: process.env.MASTER_KEY,
						appName: 'ParseNextMono',
						graphQLServerURL: urls.publicGraphQLUrl,
					},
				],
				trustProxy: true,
				users:
					process.env.NODE_ENV !== 'production'
						? undefined
						: [
								{
									user: process.env.DASHBOARD_ADMIN,
									pass: process.env.DASHBOARD_PASSWORD,
								},
						  ],
			},
			{
				dev: true,
				cookieSessionSecret:
					process.env.DASHBOARD_SESSION_SECRET || 'test',
			},
		)
		parseServer.expressApp.use('/dashboard', dashboard)

		/* istanbul ignore next */
		if (process.env.NODE_ENV !== 'production') {
			if (!process.env.TEST) {
				// eslint-disable-next-line
				console.info(
					`Playground: http://localhost:${process.env.PORT}/playground`,
				)
				// eslint-disable-next-line
				console.info(
					`Dashboard: http://localhost:${process.env.PORT}/dashboard`,
				)
			}
		}
	})
