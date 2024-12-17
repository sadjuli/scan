"use client"

import { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

const getFirstDayOfYear = () => {
	const currentYear = new Date().getFullYear()
	const firstDay = new Date(currentYear, 0, 1)
	const formattedDate = firstDay.toISOString().split('T')[0]
	return formattedDate
}
const getCurrentDate = () => {
	const today = new Date()
	const year = today.getFullYear()
	const month = String(today.getMonth() + 1).padStart(2, '0')
	const day = String(today.getDate()).padStart(2, '0')
  
	return `${year}-${month}-${day}`
  }

export const SearchProvider = ({ children }) => {
	const [searchData, setSearchData] = useState({
		inn: '',
		tonality: 'any',
		limit: 10,
		startDate: getFirstDayOfYear(),
		endDate: getCurrentDate(),
		maxFullness: true,
		inBusinessNews: false,
		onlyMainRole: true,
		announcementsDigest: true,
	});

	const updateSearchData = (field, value) => {
		setSearchData((prevData) => ({
			...prevData,
			[field]: value,
		}));
	};

	return (
		<SearchContext.Provider value={{ searchData, updateSearchData }}>
			{children}
		</SearchContext.Provider>
	)
}

export const useSearch = () => useContext(SearchContext)
