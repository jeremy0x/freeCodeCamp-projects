import { useState } from 'react'
import "./styles.css"

function App() {

  const [calc, setCalc] = useState("")
  const [result, setResult] = useState("")

  const operators = ['/', '*', '+', '-', '.']

  const updateCalc = value => {
    if(
      (operators.includes(value) && calc === '') ||
      (operators.includes(value) && operators.includes(calc.slice(-1)))
    ) {
        return
    }
    setCalc(calc + value)

    if(!operators.includes(value)) {
      // eslint-disable-next-line
      setResult(eval(calc + value))
    }
  }

  const calculate = () => {
    // eslint-disable-next-line
    setCalc(eval(calc))
    setResult('0')
  }

  const deleteKey = () => {
    if(calc === '') {
      return
    }
    const value = calc.slice(0, -1)
    setCalc(value)
  }

  const clear = () => {
    setCalc('')
    setResult('')
  }

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{result ? result : '0'}</div>
        <div className="current-operand" id="display">{ calc || "0" }</div>
      </div>

      <button className="span-two" id="clear" onClick={clear}>AC</button>
      <button onClick={deleteKey}>DEL</button>
      <button id="divide" onClick={() => updateCalc('/')}>&divide;</button>
      <button id="one" onClick={() => updateCalc('1')}>1</button>
      <button id="two" onClick={() => updateCalc('2')}>2</button>
      <button id="three"onClick={() => updateCalc('3')}>3</button>
      <button id="multiply" onClick={() => updateCalc('*')}>&times;</button>
      <button id="four" onClick={() => updateCalc('4')}>4</button>
      <button id="five" onClick={() => updateCalc('5')}>5</button>
      <button id="six" onClick={() => updateCalc('6')}>6</button>
      <button id="add" onClick={() => updateCalc('+')}>+</button>
      <button id="seven" onClick={() => updateCalc('7')}>7</button>
      <button id="eight" onClick={() => updateCalc('8')}>8</button>
      <button id="nine" onClick={() => updateCalc('9')}>9</button>
      <button id="subtract"  onClick={() => updateCalc('-')}>&minus;</button>
      <button id="decimal" onClick={() => updateCalc('.')}>.</button>
      <button id="zero" onClick={() => updateCalc('0')}>0</button>
      <button className="span-two" id="equals" onClick={calculate}>=</button>

    </div>
  )
}

export default App
