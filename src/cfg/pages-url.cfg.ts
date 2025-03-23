class PAGES_URL {
	root = '/'
	main_root = '/main'
	auth_root = '/auth'
	test_root = `${this.main_root}/test`

	WELCOME = '/welcome'

	SIGN_IN = `${this.auth_root}/sign-in`

	COMPOSITION = `${this.main_root}/composition`
	PROFILE = `${this.main_root}/profile`

	TEST_PASS = `${this.test_root}/pass`
	TEST_HISTORY = `${this.test_root}/history`
}

export const URL = new PAGES_URL()
