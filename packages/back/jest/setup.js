/* eslint-disable */
const {
	MongoMemoryReplSet,
	MongoMemoryServer,
} = require('mongodb-memory-server')

module.exports = async () => {
	global.mongo1 = new MongoMemoryReplSet({
		instanceOpts: [
			{
				port: 27045,
			},
		],
		replSet: {
			storageEngine: 'wiredTiger',
		},
	})

	await mongo1.waitUntilRunning()
	await mongo1.getUri()

	global.mongo2 = new MongoMemoryServer({
		instance: {
			port: 27046,
		},
	})
	await mongo2.getUri()
}
