export const login = async (login, password) => {
	try {
		const response = await fetch('/api/v1/account/login', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body: JSON.stringify({ login, password }),
		})

		if (!response.ok) {
			throw new Error('Ошибка авторизации')
		}

		const { accessToken, expire } = await response.json()
		return { accessToken, expire }
	} catch (error) {
		console.error('Ошибка во время запроса авторизации:', error.message)
		throw error
	}
}
