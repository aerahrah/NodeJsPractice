import './App.css'
import Signin from './components/auth/signin'
import Signup from './components/auth/signup'
import QuoteGenerator from './pages/quoteGenerator'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <>
          <Router>
            <Routes>
                <Route path="/" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/quote-generator" element={<QuoteGenerator />} />
            </Routes>
    </Router>
    </>
  )
}

export default App
