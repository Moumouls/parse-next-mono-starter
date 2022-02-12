/* istanbul ignore file */
import { rawClient } from '../../utils/graphql'

export const devJobs = () => {
	// eslint-disable-next-line no-undef
	Parse.Cloud.job('createUser', async () =>
		rawClient.request(`mutation createUser {
            signUp(
              input: {
                fields: {
                  username: "test@test.test"
                  firstname: "Jean"
                  password: "AZERTYUIOP"
                  lastname: "Michel"
                  email: "test@test.test"
                }
              }
            ) {
              viewer {
                user {
                  id
                }
              }
            }
          }`),
	)
}
