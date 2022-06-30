import React, { useEffect, useState } from 'react'
import './App.scss'
import COLORS_ARRAY from './colorsArray'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'

let quotesDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {
  const [quote, setQuote] = useState("Fall down seven times, get up eight.")
  const [author, setAuthor] = useState("Nana korobi ya ok")
  const [quotesArr, setQuotesArray] = useState(null)
  const [accentColor, setAccentColor] = useState('#282c34')

  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
  }

  useEffect(() => {
    fetchQuotes(quotesDBUrl)
  }, [])

  const getRandomQuote = () => {
    let randomInteger = Math.floor(Math.random() * quotesArr.length)
    setQuote(quotesArr[randomInteger].quote)
    setAuthor(quotesArr[randomInteger].author)
    setAccentColor(COLORS_ARRAY[randomInteger])
  }

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: accentColor }}>
        <div id="quote-box" style={{ color:accentColor }}>
          <p id="text">
          <FontAwesomeIcon icon={ faQuoteLeft } />
            {quote}
          </p>
          <p id="author">
            - {author}
          </p>

          <div className='buttons'>
            <a
              id='tweet-quote'
              title='Tweet this quote!'
              rel="noreferrer"
              href={encodeURI(`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${quote} \n - ${author} \n`)}
              style={{backgroundColor: accentColor}}
              >
                <FontAwesomeIcon icon={ faTwitter } />
              </a>

            <button
              id="new-quote"
              onClick={() => getRandomQuote()}
              style={{ backgroundColor: accentColor }}
              >
                New Quote
            </button>
          </div>
        </div>
        <div class="footer">by <a title='Github Profile' href="https://github.com/jeremiey/">Jeremy</a></div>
      </header>
    </div>
  )
}

export default App
