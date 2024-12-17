"use client"

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

import styles from './User.module.css'
import Link from 'next/link'

export default function User() {
	const { isAuthenticated, handleLogout } = useAuth()
	const router = useRouter()

	return (
		<div className={styles.user}>
			{!isAuthenticated ? (
				<>
					<div className={styles.user__reg}>Зарегистрировать</div>
					<div className={styles.user__sep}></div>
				</>
			): ''}
			<div className={styles.user__login}>
				{isAuthenticated ? (
					<div onClick={handleLogout}>Выйти</div>
				) : (
					<Link href="/login">Войти</Link>
				)}
			</div>
		</div>
	)
}
