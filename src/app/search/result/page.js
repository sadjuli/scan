"use client"

import withAuth from '@/hoc/withAuth'
import { useSearch } from '@/context/SearchContext'
import CompanyCard from '@/components/CompanyCard/CompanyCard'

import xml2js from 'xml2js'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { searchHistograms, searchObjects, getEntitiesByIds } from '@/api/api'

import styles from './result.module.css'

const formatDate = (dateString) => {
	const date = new Date(dateString)
	const day = String(date.getDate()).padStart(2, '0')
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const year = date.getFullYear()
	return `${day}.${month}.${year}`
}

const parseAndSort = (response) => {
	const result = {}

  response.data.forEach((item) => {
    const key = item.histogramType
    const sortedData = item.data
      .map(entry => ({
        ...entry,
        date: formatDate(entry.date)
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))

    result[key] = sortedData
  })

  return result
}

const parseXMLContent = (xmlString) => {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlString, "text/xml")
    
    const imgTag = xmlDoc.querySelector("img")
    const image = imgTag ? imgTag.getAttribute("src") : null

    const sentenceTags = Array.from(xmlDoc.querySelectorAll("sentence")).slice(0, 3)
    const content = sentenceTags.map((tag) => tag.textContent.trim()).join(" ")

    return { image, content }
  }

const ResultsPage = () => {
	const router = useRouter()
	const { searchData } = useSearch()
	const [histogramData, setHistogramData] = useState(null)
	const [objectsData, setObjectsData] = useState(null)
	const [entitiesData, setEntitiesData] = useState([])
	const [loading, setLoading] = useState(true)
	const [searchError, setSearchError] = useState(false)


	useEffect(() => {
		const fetchData = async () => {

			try {
				setSearchError(false)
				const dataHistograms = await searchHistograms(searchData)
				const dataObjects = await searchObjects(searchData)
				
				setHistogramData(parseAndSort(dataHistograms))
				setObjectsData(dataObjects)

				if (dataObjects && dataObjects.items.length) {
					const entitiesIds = dataObjects.items.map(item => item.encodedId)
					const dataEntities = await getEntitiesByIds(entitiesIds)
					
					const extractedData = dataEntities.map((item) => {
						const ok = item.ok
						const { image, content } = parseXMLContent(ok.content.markup)
						return {
							issueDate: formatDate(ok.issueDate),
							sourceName: ok.source.name,
							title: ok.title.text,
							wordCount: ok.attributes.wordCount,
							image,
							content 
						}
					})
					
					setEntitiesData(extractedData)
				}
				
				setLoading(false)
			} catch (err) {
				setSearchError(true)
				console.error('Ошибка при поиске данных:', err);
			}
		}

		fetchData()
	}, [router])

	return (
		<div>
			<div className={styles.top_flex}>
				{loading ? (
					<div>
						<h1>Ищем. Скоро<br />будут результаты</h1>
						<div className={styles.h1_sub}>
							Поиск может занять некоторое время,<br />просим сохранять терпение.
						</div>
					</div>
				): (
					<div>
						<h1>Результаты</h1>
					</div>
				)}
				<div className={styles.cover}></div>
			</div>
			<h2>Общая сводка</h2>
			<div className={styles.search_qty}>Найдено {histogramData && histogramData.totalDocuments ? histogramData.totalDocuments.length : 0} вариантов</div>
			{histogramData && histogramData.totalDocuments ? (
				<>
					<div className={styles.pivot}>
						<div className={styles.pivot__table}>
							<div className={styles.pivot__header}>
								<div>Период</div>
								<div>Всего</div>
								<div>Риски</div>
							</div>
							<div className={styles.pivot__columns}>
								{histogramData.totalDocuments.map((doc, index) => (
									<div key={index} className={styles.pivot__column}>
										<div>{doc.date}</div>
										<div>{doc.value}</div>
										<div>{histogramData.riskFactors[index]?.value || 0}</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</>) : ''}
			<h2>Список документов</h2>
			<div className={styles.search_qty}>Найдено {entitiesData ? entitiesData.length : 0} документов</div>
			<div className={styles.cards}>
			{entitiesData.map((item, index) => (
        		<CompanyCard
          			key={index}
          			issueDate={item.issueDate}
          			sourceName={item.sourceName}
          			title={item.title}
          			wordCount={item.wordCount}
          			image={item.image}
          			content={item.content}
        		/>
      		))}
			</div>
		</div>
	)
}

export default withAuth(ResultsPage)
