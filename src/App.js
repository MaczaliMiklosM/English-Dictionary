import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import WordList from './components/WordList';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [words, setWords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load CSV file
  useEffect(() => {
    fetch('/words.csv')
      .then((response) => response.text())
      .then((data) => {
        const parsed = Papa.parse(data, {
          header: true,
          delimiter: '|',  // Adjusted CSV delimiter
        });
        if (parsed && parsed.data) {
          setWords(parsed.data.filter((item) => item.term && item.definition));
        }
      })
      .catch((error) => {
        console.error('Error loading CSV data:', error);
        setWords([]); // Empty list for fallback
      });
  }, []);

  // Filter words based on search term
  const filteredWords = words.filter((word) =>
    word.term?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>English Dictionary</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <WordList words={filteredWords} />
    </div>
  );
}

export default App;
