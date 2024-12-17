"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getAccountInfo } from '@/api/api'

import styles from './CompanyInfo.module.css'

const CompanyInfo = () => {
	const [userInfo, setUserInfo] = useState(null)
	const [loading, setLoading] = useState(true)
	const router = useRouter()

	useEffect(() => {
		const fetchData = async () => {

			try {
				const data = await getAccountInfo()
				setUserInfo(data)
				setLoading(false)
			} catch (err) {
				console.error('Ошибка при загрузке данных пользователя:', err);
			}
		}

		fetchData()
	}, [router])


	return (	
		<div className={styles.companyInfo}>
			{ loading ? (
				<div>Loading ...</div>
			) : (
				<>
					<div>Использовано компаний <span>{ userInfo.eventFiltersInfo.usedCompanyCount }</span></div>
					<div>Лимит по компаниям <span>{ userInfo.eventFiltersInfo.companyLimit }</span></div>
				</>
			)}
		</div>
	)
}

export default CompanyInfo
