import { useAuth } from '@/context/AuthContext'

import styles from './LoginForm.module.css'
import Image from 'next/image'

export default function LoginForm() {
	const { handleLogin } = useAuth()
	const { authError } = useAuth()

	const handleSubmit = async (e) => {
		e.preventDefault()
		const login = e.target.login.value
		const password = e.target.password.value

		try {
			await handleLogin(login, password)
		} catch (error) {
			console.log('error')
		}
		return false
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className={styles.form}>
				<div className={styles.form__row}>
					<div className={styles.form__tabs}>
						<div className={`${styles.form__tab} ${styles.form__tabActive}`}>Войти</div>
						<div className={styles.form__tab}>Зарегистрироваться</div>
					</div>
				</div>
				<div className={styles.form__row}>
					<label className={styles.form__label}>
						<span>Логин или номер телефона:</span>
						<input type="text" name="login" className={styles.form__input}/>
					</label>
				</div>
				<div className={styles.form__row}>
					<label className={styles.form__label}>
						<span>Пароль:</span>
						<input type="password" name="password" className={styles.form__input}/>
					</label>
				</div>
				{authError ? (
					<div style={{ color: 'red' }} className={styles.form__row}>Неправильный логин/пароль</div>
				) : ''}
				<div className={styles.form__row}>
					<button type="submit" className={styles.form__button}>Войти</button>
				</div>
				<div className={styles.form__row}>
					<div className={styles.form__recover}>Восстановить пароль</div>
				</div>
				<div className={styles.form__row}>
					<div className={styles.auth__title}>Войти через:</div>
					<div className={styles.auth__services}>
						<div className={styles.auth__service}>
							<Image src="/google.svg" alt="google" width="60" height="20"/>
						</div>
						<div className={styles.auth__service}>
							<Image src="/facebook.svg" alt="facebook" width="60" height="12"/>
						</div>
						<div className={styles.auth__service}>
							<Image src="/yandex.svg" alt="yandex" width="56" height="16"/>
						</div>
					</div>
				</div>
			</div>
		</form>
	)
}
