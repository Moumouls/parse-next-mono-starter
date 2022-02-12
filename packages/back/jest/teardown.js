/* eslint-disable */

module.exports = async (conf) => {
	if (!conf.watch) {
		closeMongo()
		process.exit(0)
	} else {
		await closeMongo()
	}
}

const closeMongo = async () => {
	await global.mongo1.stop()
	await global.mongo2.stop()
}
