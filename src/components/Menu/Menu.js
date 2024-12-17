import styles from './Menu.module.css'

export default function Header() {
	return (
		<div className={styles.menu}>
			<div className={styles.menu__item}>Главная</div>
			<div className={styles.menu__item}>Тарифы</div>
			<div className={styles.menu__item}>FAQ</div>
		</div>
	)
}
