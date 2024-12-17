"use client"

import withAuth from '@/hoc/withAuth'
import LoginForm from '@/components/LoginForm/LoginForm'
import styles from './login.module.css'

const Login = () => {
	return (
		<div>
			<div className={styles.flex}>
				<div>
					<h1>Для оформления подписки<br/>на тариф, необходимо<br/>авторизоваться.</h1>
					<div className={styles.cover}></div>
				</div>
				<LoginForm></LoginForm>
			</div>
		</div>
	)
}

export default withAuth(Login, true)
