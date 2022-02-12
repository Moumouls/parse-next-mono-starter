import { devJobs } from './dev'

export const jobs = () => {
	if (process.env.NODE_ENV !== 'production') {
		devJobs()
	}
}
