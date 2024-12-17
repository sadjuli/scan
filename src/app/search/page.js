"use client"

import withAuth from '@/hoc/withAuth'

import SearchForm from '@/components/SearchForm/SearchForm'
import styles from './search.module.css'

const Page = () => {
	return (
		<div>
			<div className={styles.flex}>
				<div className={styles.flex1}>
					<h1>Найдите необходимые<br />данные в пару кликов</h1>
					<p className="sub">Задайте параметры поиска.<br />
						Чем больше заполните, тем точнее поиск</p>
				</div>
				<div className={styles.docs}>
					<div className={styles.doc1}></div>
					<div className={styles.doc2}></div>
				</div>
			</div>
			<div className={`${styles.flex} ${styles.flex_bottom}`}>
				<SearchForm></SearchForm>
				<div className={styles.cover}></div>
			</div>
		</div>
	)
}

export default withAuth(Page)
