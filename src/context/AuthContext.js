"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { login as apiLogin } from '@/api/Auth'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)
export const AuthProvider = ({ children }) => {
	const [accessToken, setAccessToken] = useState(null)
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [authError, setAuthError] = useState(false)
	const router = useRouter()

	useEffect(() => {
		const token = localStorage.getItem('accessToken')
		const expire = localStorage.getItem('expire')

		if (token && expire && new Date().getTime() < Number(expire)) {
			setAccessToken(token)
			setIsAuthenticated(true)
		} else {
			setIsAuthenticated(false)
		}
	}, [])

	const handleLogin = async (login, password) => {
		try {
			const { accessToken, expire } = await apiLogin(login, password)
			setAuthError(false)

			const expireTimestamp = new Date().getTime() + expire * 1000

			localStorage.setItem('accessToken', accessToken)
			localStorage.setItem('expire', expireTimestamp)

			setAccessToken(accessToken)
			setIsAuthenticated(true)

			router.push('/')
		} catch (error) {
			setAuthError(true)
			console.error('Ошибка авторизации:', error.message)
		}
	}

	const handleLogout = () => {
		localStorage.removeItem('accessToken')
		localStorage.removeItem('expire')
		setAccessToken(null)
		setIsAuthenticated(false)
		router.push('/login')
	}

	return (
		<AuthContext.Provider
			value={{
				accessToken,
				isAuthenticated,
				handleLogin,
				handleLogout,
				authError
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
