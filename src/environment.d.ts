// Set the typing of your environment variables here 👇
type MyVariables = {
	UPSTASH_REDIS_REST_URL: string
	UPSTASH_REDIS_REST_TOKEN: string
	GOOGLE_CLIENT_ID: string
	GOOGLE_CLIENT_SECRET: string
}

declare global {
	namespace NodeJS {
		interface ProcessEnv extends MyVariables {}
	}
}

export {}
