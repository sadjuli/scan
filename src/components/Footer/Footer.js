import styles from './Footer.module.css'
import Image from 'next/image'

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.footer__wrapper}>
				<div className={styles.footer__logo}>
					<Image src="/scan_footer_logo.png" width="130" height="50" alt="Footer logo" />
				</div>
				<div className={styles.footer__info}>
					г. Москва, Цветной б-р, 40<br />
					+7 495 771 21 11<br />
					info@skan.ru<br /><br />
					Copyright. 2024
				</div>
			</div>
		</footer>
	)
}
