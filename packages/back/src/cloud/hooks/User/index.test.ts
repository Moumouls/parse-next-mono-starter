import { setup } from '../../../utils/testHelper'

setup()

describe('User', () => {
	it.skip('some tests', async () => {})
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const graphql = {
	signUp: `mutation signUp {
		signUp(
		  input: {
			fields: {
			  username: "shouldfail"
			  password: "test"
			  email: "shouldfail@test.test"
			}
		  }
		) {
		  viewer {
			sessionToken
		  }
		}
	  }
	  `,
}
