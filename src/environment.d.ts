// Set the typing of your environment variables here 👇
type MyVariables = {
	UPSTASH_REDIS_REST_URL: string
	UPSTASH_REDIS_REST_TOKEN: string
}

declare global {
	namespace NodeJS {
		interface ProcessEnv extends MyVariables {}
	}
}

export {}
