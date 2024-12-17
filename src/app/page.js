"use client"

import { useRouter } from 'next/navigation'
import withAuth from '@/hoc/withAuth'

import styles from './main.module.css'

const Home = () => {
	const router = useRouter()

	const goToSearch = () => {
		router.push('/search')
	}

	return (
		<>
			<div className={styles.cover}>
				<h1 className={styles.h1}>сервис по поиску<br />публикаций<br />
					о компании<br />
					по его ИНН</h1>
				<div className={styles.sub}>Комплексный анализ публикаций, получение данных<br />в формате PDF на электронную почту.</div>
				<button className={styles.button} onClick={() => goToSearch()}>Запросить данные</button>
			</div>
			<h2 className={styles.h2}>Почему именно мы</h2>
			<div className={styles.why}>
				<div className={styles.why__prev}></div>
				<div className={styles.why__next}></div>
				<div className={styles.why__cards}>
					<div className={styles.why__card}>
						<div className={styles.why__icon}>
							<img src="/why1.svg" alt="why image 1" />
						</div>
						<div className={styles.why__text}>Высокая и оперативная скорость обработки заявки</div>
					</div>
					<div className={styles.why__card}>
						<div className={styles.why__icon}>
							<img src="/why2.svg" alt="Why image 2" />
						</div>
						<div className={styles.why__text}>Огромная комплексная база данных, обеспечивающая объективный ответ на запрос</div>
					</div>
					<div className={styles.why__card}>
						<div className={styles.why__icon}>
							<img src="/why3.svg" alt="Why image 3" />
						</div>
						<div className={styles.why__text}>Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству</div>
					</div>
				</div>
			</div>
			<div className={styles.images}>
				<div className={styles.images__left}>
					<img src="/image1.svg" alt="Cover image 1" />
				</div>
				<div className={styles.images__right}>
					<img src="/image2.svg" alt="Cover image 2" />
				</div>
			</div>
			<h2 className={styles.h2}>Наши тарифы</h2>
			<div className={styles.tariffs}>
				<div className={`${styles.tariffs__card} ${styles.tariffs__beginner}`}>
					<div className={styles.tariffs__header}>
						<div className={styles.tariffs__title}>Beginner</div>
						<div className={styles.tariffs__sub}>Для небольшого исследования</div>
					</div>
					<div className={styles.tariffs__content}>
						<div className={styles.tariffs__price}>
							<div className={styles.tariffs__prices}>
								<div className={styles.tariffs__pricenew}>799 ₽</div>
								<div className={styles.tariffs__priceold}>1 200 ₽</div>
							</div>
							<div className={styles.tariffs__pricetext}>или 150 ₽/мес. при рассрочке на 24 мес.</div>
						</div>
						<div className={styles.tariffs__options}>
							<div className={styles.tariffs__optionstitle}>В тариф входит:</div>
							<div className={styles.tariffs__optionsitem}>Безлимитная история запросов</div>
							<div className={styles.tariffs__optionsitem}>Безопасная сделка</div>
							<div className={styles.tariffs__optionsitem}>Поддержка 24/7</div>
						</div>
						<button className={`${styles.tariffs__button} ${styles.tariffs__buttonactive}`}>Перейти в личный кабинет</button>
					</div>
				</div>
				<div className={`${styles.tariffs__card} ${styles.tariffs__pro}`}>
					<div className={styles.tariffs__header}>
						<div className={styles.tariffs__title}>Pro</div>
						<div className={styles.tariffs__sub}>Для HR и фрилансеров</div>
					</div>
					<div className={styles.tariffs__content}>
						<div className={styles.tariffs__price}>
							<div className={styles.tariffs__prices}>
								<div className={styles.tariffs__pricenew}>1 299 ₽</div>
								<div className={styles.tariffs__priceold}>2 600 ₽</div>
							</div>
							<div className={styles.tariffs__pricetext}>или 279 ₽/мес. при рассрочке на 24 мес.</div>
						</div>
						<div className={styles.tariffs__options}>
							<div className={styles.tariffs__optionstitle}>В тариф входит:</div>
							<div className={styles.tariffs__optionsitem}>Все пункты тарифа Beginner</div>
							<div className={styles.tariffs__optionsitem}>Экспорт истории</div>
							<div className={styles.tariffs__optionsitem}>Рекомендации по приоритетам</div>
						</div>
						<button className={styles.tariffs__button}>Подробнее</button>
					</div>
				</div>
				<div className={`${styles.tariffs__card} ${styles.tariffs__business}`}>
					<div className={styles.tariffs__header}>
						<div className={styles.tariffs__title}>Business</div>
						<div className={styles.tariffs__sub}>Для корпоративных клиентов</div>
					</div>
					<div className={styles.tariffs__content}>
						<div className={styles.tariffs__price}>
							<div className={styles.tariffs__prices}>
								<div className={styles.tariffs__pricenew}>2 379 ₽₽</div>
								<div className={styles.tariffs__priceold}>3 700 ₽</div>
							</div>
						</div>
						<div className={styles.tariffs__options}>
							<div className={styles.tariffs__optionstitle}>В тариф входит:</div>
							<div className={styles.tariffs__optionsitem}>Все пункты тарифа Pro</div>
							<div className={styles.tariffs__optionsitem}>Безлимитное количество запросов</div>
							<div className={styles.tariffs__optionsitem}>Приоритетная поддержка</div>
						</div>
						<button className={styles.tariffs__button}>Подробнее</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default withAuth(Home, true)
