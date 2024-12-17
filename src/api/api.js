const fetchWithAuth = async (endpoint, method, body = '') => {
	const token = localStorage.getItem("accessToken")

	const headers = {
		Authorization: token ? `Bearer ${token}` : undefined,
		'Content-Type': 'application/json',
	}

	try {
		const options = {
			headers,
			method
		}
		if (body) {
			options.body = body
		}
		const response = await fetch(`${endpoint}`, options);

		if (!response.ok) {
			if (response.status === 401) {
				window.location.href = '/login'
			}
			throw new Error(`Ошибка: ${response.statusText}`)
		}

		return await response.json()
	} catch (error) {
		console.error('Ошибка API-запроса:', error.message)
		throw error
	}
};

export const getAccountInfo = async () => {
	return await fetchWithAuth('/api/v1/account/info', 'GET')
}

const formatDate = (inputDate, endOfDay = false) => {
	const [year, month, day] = inputDate.split('-')
  
	let date = `${year}-${month}-${day}`
	
	if (endOfDay) {
		date = `${date}T23:59:59+03:00`
	} else {
		date = `${date}T00:00:00+03:00`
	}
  
	return date
}

const getSearchData = (data) => {
	return {
		"issueDateInterval": {
			"startDate": formatDate(data.startDate),
			"endDate": formatDate(data.endDate, true)
		},
		"searchContext": {
			"targetSearchEntitiesContext": {
				"targetSearchEntities": [
					{
						"type": "company",
						"sparkId": null,
						"entityId": null,
						"inn": Number(data.inn),
						"maxFullness": data.maxFullness,
						"inBusinessNews": data.inBusinessNews
					}
				],
				"onlyMainRole": data.onlyMainRole,
				"tonality": data.tonality || 'any',
				"onlyWithRiskFactors": false,
				"riskFactors": {
					"and": [],
					"or": [],
					"not": []
				},
				"themes": {
					"and": [],
					"or": [],
					"not": []
				}
			},
			"themesFilter": {
				"and": [],
				"or": [],
				"not": []
			}
		},
		"searchArea": {
			"includedSources": [],
			"excludedSources": [],
			"includedSourceGroups": [],
			"excludedSourceGroups": []
		},
		"attributeFilters": {
			"excludeTechNews": true,
			"excludeAnnouncements": data.announcementsDigest,
			"excludeDigests": data.announcementsDigest
		},
		"similarMode": "duplicates",
		"limit": Number(data.limit),
		"sortType": "sourceInfluence",
		"sortDirectionType": "desc",
		"intervalType": "month",
		"histogramTypes": [
			"totalDocuments",
			"riskFactors"
		]
	}
}

export const searchHistograms = async (searchData) => {
	const data = getSearchData(searchData)
	return await fetchWithAuth('/api/v1/objectsearch/histograms', 'POST', JSON.stringify(data))
}
export const searchObjects = async (searchData) => {
	const data = getSearchData(searchData)
	return await fetchWithAuth('/api/v1/objectsearch', 'POST', JSON.stringify(data))
}
export const getEntitiesByIds = async (ids) => {
	return await fetchWithAuth('/api/v1/documents', 'POST', JSON.stringify({"ids": ids ?? []}))
}
