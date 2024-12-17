"use client"

import { useAuth } from '@/context/AuthContext'

import Image from 'next/image'
import Menu from '@/components/Menu/Menu'
import CompanyInfo from '@/components/CompanyInfo/CompanyInfo'
import User from '@/components/User/User'
import Link from 'next/link'

import styles from './Header.module.css'

export default function Header() {
	const { isAuthenticated } = useAuth()

	return (
		<header className={styles.header}>
			<div className={styles.header__wrapper}>
				<div className={styles.header__logo}>
					<Link href="/">
						<Image src="/scan_logo.png" width="130" height="50" alt="Logo" />
					</Link>
				</div>
				<Menu></Menu>
				{isAuthenticated ? (
					<CompanyInfo></CompanyInfo>
				) : ''}
				<User></User>
			</div>
		</header>
	)
}
