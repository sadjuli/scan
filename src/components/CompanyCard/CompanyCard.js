import styles from './CompanyCard.module.css'

export default function CompanyCard({ issueDate, sourceName, title, wordCount, image, content }) {
	return (
		<div className={styles.card}>
			<div className={styles.card__header}>
				<div className={styles.card__date}>{issueDate}</div>
				<div className={styles.card__source}>{sourceName}</div>
			</div>
			<h3 className={styles.card__title}>{title}</h3>
			{image?(
				<div className={styles.card__cover}><img src={image} /></div>
			): ''}
			<div className={styles.card__text} dangerouslySetInnerHTML={{ __html: content }}></div>
			<div className={styles.card__footer}>
				<button className={styles.card__button}>Читать в источнике</button>
				<div className={styles.card__qty}>{wordCount} слов</div>
			</div>
		</div>
	)
}
