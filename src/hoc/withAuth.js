import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const withAuth = (WrappedComponent, allowUnauthenticated = false) => {
	return (props) => {
		const { isAuthenticated } = useAuth()
		const router = useRouter()

		useEffect(() => {
			if (!isAuthenticated && !allowUnauthenticated) {
				router.push('/login')
			}

			if (isAuthenticated && router.pathname === '/login') {
				router.push('/')
			}
		}, [isAuthenticated, router, allowUnauthenticated])

		if (isAuthenticated || allowUnauthenticated) {
			return <WrappedComponent {...props} />
		}

		return null
	}
}

export default withAuth
