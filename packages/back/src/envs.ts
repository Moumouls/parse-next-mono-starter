/* istanbul ignore file */

export const envs: any = {
	MONGO_URL: 'mongodb://localhost:27017/parse?replicaSet=testset',
	FRONT_DOMAIN: 'localhost:1337',
	BACK_DOMAIN: 'localhost:1337',
	DASHBOARD_ADMIN: 'admin',
	DASHBOARD_PASSWORD: 'admin',
	PORT: 1337,
	APP_ID: 'dev',
	MASTER_KEY: 'dev',
	S3_ACCESS_KEY: 'dev',
	S3_ENDPOINT: 'dev.dev',
	S3_SECRET_KEY: 'dev',
	S3_BUCKET: 'dev',
}

Object.keys(envs).forEach((e) => {
	if (process.env.NODE_ENV === 'production') {
		if (!process.env[e]) throw new Error(`Env var ${e} is needed`)
	} else if (!process.env[e]) {
		// eslint-disable-next-line
		if (!process.env.TEST) console.info(`Auto set env ${e} to ${envs[e]}`)
		process.env[e] = envs[e]
	}
})
