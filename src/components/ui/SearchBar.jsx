import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    // Version simplifiée de la recherche
    console.log('Recherche pour:', searchTerm)
  }

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Rechercher une recette..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 pl-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
        <button
          type="submit"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70"
        >
          <FaSearch className="w-5 h-5" />
        </button>
      </div>
    </form>
  )
}

export default SearchBar
