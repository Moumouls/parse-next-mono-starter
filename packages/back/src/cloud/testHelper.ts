/* istanbul ignore file */
import { GraphQLClient } from 'graphql-request'
import { rawClient } from '../utils/graphql'

export const getUserClient = async (key: string) => {
	const data: any = await rawClient.request(`mutation createUser {
		signUp(
		  input: {
			fields: { username: "${key}", firstname:"${key}", lastname:"${key}", password: "toto", email: "${key}@${key}.fr" }
		  }
		) {
		  viewer {
			sessionToken
		  }
		}
	  }
	  `)

	return new GraphQLClient(
		process.env.PORT
			? `http://localhost:${process.env.PORT}/graphql`
			: 'you forgot to setup env',
		{
			headers: {
				'X-Parse-Session-Token': data.signUp.viewer.sessionToken,
				'X-Parse-Application-Id': 'dev',
			},
		},
	)
}

export const getMasterClient = () =>
	new GraphQLClient(
		process.env.PORT
			? `http://localhost:${process.env.PORT}/graphql`
			: 'you forgot to setup env',
		{
			headers: {
				'X-Parse-Master-key': 'dev',
				'X-Parse-Application-Id': 'dev',
			},
		},
	)
