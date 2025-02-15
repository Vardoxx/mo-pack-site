class PAGES_URL {
	root = '/'
	MAIN = '/main'
	AUTH = '/auth'
	WELCOME = '/welcome'

	SIGN_IN = `${this.AUTH}/sign-in`

	PROFILE = `${this.MAIN}/profile`
	COMPOSITION = `${this.MAIN}/composition`
}

export const URL = new PAGES_URL()
