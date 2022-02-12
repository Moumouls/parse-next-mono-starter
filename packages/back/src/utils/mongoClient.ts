import { MongoClient, Db } from 'mongodb'

const { newObjectId } = require('parse-server/lib/cryptoUtils')

interface GetMongoClient {
	db: Db
	client: MongoClient
}

let parseServer: any

export const getObjectId = async () =>
	newObjectId(parseServer.config.objectIdSize)

export const setMongoClient = async (server: any) => {
	parseServer = server
}

export const getMongoClient = async (): Promise<GetMongoClient> => {
	await parseServer.config.databaseController.adapter.connect()
	return {
		db: parseServer.config.databaseController.adapter.database,
		client: parseServer.config.databaseController.adapter.client,
	}
}
