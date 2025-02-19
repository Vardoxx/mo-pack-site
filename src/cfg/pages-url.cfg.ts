class PAGES_URL {
	root = '/'
	MAIN = '/main'
	AUTH = '/auth'
	WELCOME = '/welcome'

	SIGN_IN = `${this.AUTH}/sign-in`

	COMPOSITION = `${this.MAIN}/composition`
	TEST = `${this.MAIN}/test`
	PROFILE = `${this.MAIN}/profile`
}

export const URL = new PAGES_URL()
