import { useState } from 'react'
import './App.css'
import { Header, Map } from './components'

function App() {
  const [ coordinates, setCoordinates ] = useState([0,0]);

  return (
    <div className="App">
      <Header setCoordinates={ setCoordinates }/>
      
      <main style={{ flexGrow: "1" }}>
        <Map coordinates={ coordinates }/>
      </main>

      <footer className="footer">
        <p>Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.</p> 
        <p>Coded by <a href="https://github.com/CaioCouto" target='_blank'>Caio Couto</a>.</p>
      </footer>
    </div>
  )
}

export default App
