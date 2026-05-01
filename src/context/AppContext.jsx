import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [favourites, setFavourites] = useState(() => {
    try {
      const stored = localStorage.getItem('smumh-favourites')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const [journeyHistory, setJourneyHistory] = useState([])

  useEffect(() => {
    try {
      localStorage.setItem('smumh-favourites', JSON.stringify(favourites))
    } catch {
      // localStorage unavailable
    }
  }, [favourites])

  function toggleFavourite(id) {
    setFavourites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  function addJourneyToHistory(journey) {
    setJourneyHistory(prev => [journey, ...prev].slice(0, 5))
  }

  return (
    <AppContext.Provider value={{
      favourites,
      toggleFavourite,
      journeyHistory,
      addJourneyToHistory,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
