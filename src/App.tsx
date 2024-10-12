import './App.css'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import { ReactSVG } from 'react-svg';

function App() {
  return (
    <div className='App'>
      <Header/>
      <div className='body'></div>
      <ReactSVG src='./assets/icons/radarIco.svg' />
      <Footer/>
    </div>
  )
}

export default App