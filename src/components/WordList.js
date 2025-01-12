import React from 'react';

function WordList({ words }) {
  return (
    <div>
      {words.length === 0 ? (
        <p>No words found.</p>
      ) : (
        <ul>
          {words.map((word, index) => (
            <li key={index}>
              <strong>{word.term}</strong>: {word.definition}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WordList;
