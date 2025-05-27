import './App.css'
import Counter from './components/Counter'
import Clock from './components/Clock'
import AgePredictor from './components/AgePredictor'

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>TP4: Componentes de Clase en React</h1>
      </header>

      <main>
        <div className="component-section">
          <Counter />
        </div>

        <div className="component-section">
          <Clock />
        </div>

        <div className="component-section">
          <AgePredictor />
        </div>
      </main>

      <footer className="app-footer">
        <p>Trabajo Práctico N° 4 - Desarrollo de Front End - UNSTA 2025</p>
        <p>Profesor: Ing. Marcos Rivero</p>
        <p>Alumno: Leonardo Juan Pablo Valdez</p>
        <p>Legajo: UIA70262</p>
        <p>
          Mi sitio web:{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://vleonardojuanpablo.com/"
          >
            https://vleonardojuanpablo.com/
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App
