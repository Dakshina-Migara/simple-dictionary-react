import { useState } from 'react'
import '../app/App.css'
import HomePage from '../page/HomePage/HomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HomePage />
    </>
  )
}

export default App
