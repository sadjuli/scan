"use client"

import styles from './SearchForm.module.css'
import { useSearch } from '@/context/SearchContext'
import { useRouter } from 'next/navigation'
import { useState  } from 'react'

export default function SearchForm() {
	const router = useRouter()
	const { searchData, updateSearchData } = useSearch()
	const [inn, setInn] = useState('')
  	const [isInnValid, setIsInnValid] = useState(true)

	const handleSubmit = (e) => {
		e.preventDefault()
		router.push('/search/result')
	}

	const validateINNPhysical = (inn) => {
		const coefficients = [2, 4, 10, 3, 5, 9, 4, 6, 8, 0]
		const checkSum = inn.slice(0, 9)
		  .split('')
		  .reduce((sum, digit, index) => sum + digit * coefficients[index], 0)
	
		return checkSum % 11 % 10 === parseInt(inn[9], 10)
	}
	const validateINNLegal = (inn) => {
		const coefficients1 = [2, 4, 10, 3, 5, 9, 4, 6, 8, 0, 3, 4]
		const checkSum1 = inn.slice(0, 10)
		  .split('')
		  .reduce((sum, digit, index) => sum + digit * coefficients1[index], 0)
	
		const coefficients2 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8, 0]
		const checkSum2 = inn.slice(0, 11)
		  .split('')
		  .reduce((sum, digit, index) => sum + digit * coefficients2[index], 0)
	
		return checkSum1 % 11 % 10 === parseInt(inn[10], 10) && checkSum2 % 11 % 10 === parseInt(inn[11], 10)
	}
	const validateINN = (input) => {
    	if (input.length !== 10 && input.length !== 12) {
			return false
		}
	  
		if (input.length === 10) {
			return validateINNPhysical(input)
		}
	  
		if (input.length === 12) {
			return validateINNLegal(input)
		}
	  
		return false
  	}
	const handleInnChange = (e) => {
		const value = e.target.value
    	setInn(value)
    	const valid = validateINN(value)

    	setIsInnValid(valid)

    	if (valid) {
			updateSearchData('inn', value)
    	}
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className={styles.form}>
				<div className={styles.form__flex}>
					<div className={styles.form__column}>
						<div className={styles.form__row}>
							<label className={styles.form__label}>
								<span>ИНН:</span>
								<input
									type="text"
									value={inn}
									onChange={handleInnChange}
									className={styles.form__input}
								/>
								{!isInnValid && (
									<div style={{ color: 'red' }}>Введите корректный ИНН</div>
								)}
							</label>
						</div>
						<div className={styles.form__row}>
							<label className={styles.form__label}>
								<span>Тональность:</span>
								<select
									className={styles.form__select}
									value={searchData.tonality}
									onChange={(e) => updateSearchData('tonality', e.target.value)}
								>
									<option value="any">Любая</option>
									<option value="negative">Негативная</option>
									<option value="positive">Позитивная</option>
								</select>
							</label>
						</div>
						<div className={styles.form__row}>
							<label className={styles.form__label}>
								<span>Количество документов в выдаче:</span>
								<input
									type="text"
									value={searchData.limit}
									onChange={(e) => updateSearchData('limit', e.target.value)}
									className={styles.form__input}/>
							</label>
						</div>
					</div>
					<div className={styles.form__column}>
						<div className={styles.form__rowSmall}>
							<label className={styles.form__labelCheckbox}>
								<input
									type="checkbox"
									checked={searchData.maxFullness}
									onChange={(e) => updateSearchData('maxFullness', e.target.value)}
								/> Признак максимальной полноты
							</label>
						</div>
						<div className={styles.form__rowSmall}>
							<label className={styles.form__labelCheckbox}>
								<input
									type="checkbox"
									checked={searchData.inBusinessNews}
									onChange={(e) => updateSearchData('inBusinessNews', e.target.value)}
								/> Упоминания в бизнес-контексте
							</label>
						</div>
						<div className={styles.form__rowSmall}>
							<label className={styles.form__labelCheckbox}>
								<input
									type="checkbox"
									checked={searchData.onlyMainRole}
									onChange={(e) => updateSearchData('onlyMainRole', e.target.value)}
								/> Главная роль в публикации
							</label>
						</div>
						<div className={styles.form__rowSmall}>
							<label className={styles.form__labelCheckbox}>
								<input type="checkbox" disabled/> Публикации только с риск-факторами
							</label>
						</div>
						<div className={styles.form__rowSmall}>
							<label className={styles.form__labelCheckbox}>
								<input type="checkbox" disabled/> Включать технические новости рынков
							</label>
						</div>
						<div className={styles.form__rowSmall}>
							<label className={styles.form__labelCheckbox}>
								<input
									type="checkbox"
									checked={searchData.announcementsDigest}
									onChange={(e) => updateSearchData('announcementsDigest', e.target.value)}
								/> Включать анонсы и календари
							</label>
						</div>
						<div className={styles.form__rowSmall}>
							<label className={styles.form__labelCheckbox}>
								<input type="checkbox" disabled/> Включать сводки новостей
							</label>
						</div>
					</div>
				</div>
				<div className={styles.form__flex}>
					<div className={styles.form__column}>
						<label className={styles.form__label}>
							<span>Диапазон поиска:</span>
							<div className={styles.form__flex}>
								<input
									type="date"
									value={searchData.startDate}
									onChange={(e) => updateSearchData('startDate', e.target.value)}
									className={styles.form__input}/>
								<input
									type="date"
									value={searchData.endDate}
									onChange={(e) => updateSearchData('endDate', e.target.value)}
									className={styles.form__input}/>
							</div>
						</label>
					</div>
					<div className={styles.form__column}>
						<div className={styles.form__toBottom}>
							<label className={styles.form__label}>
								<span>&nbsp;</span>
								<button className={styles.form__button} disabled={!isInnValid}>Поиск</button>
							</label>
						</div>
					</div>
				</div>
			</div>
		</form>
	)
}
