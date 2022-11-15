
import React, {useState, useEffect, Fragment} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import { publishRoutes } from './routes';
import { ProductContext } from './components/Context';
import Header from './components/Header';
import Footer from './components/Footer';
import { fetchPosts } from './api/product';
function App() {

  const [page, setPage] = useState(1)
  const [data, setData] = useState([])

  useEffect(() => {
    fetchPosts().then((response) => setData(response.data))
}, [])

  useEffect(() => {
      window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
  },[page])

  const handleClick = () => {
    if (page === 1) {
      setPage(0)
    }
    else setPage(1)
  }
  return (
    <Router>
      <div className="App">
       <ProductContext.Provider value={{data, setData}}>
        <Header/>
         <Routes>
          {
            publishRoutes.map((route, id) => {
              const Page = route.component
              return (
                <Route key={id} path={route.path} element={<Page/>}/>
              )
            })
          }
         </Routes>
         <Footer/>

          <p className='to-top' onClick={handleClick}>
              <i className="fa-sharp fa-solid fa-chevron-up"></i>
          </p>
       </ProductContext.Provider>
      </div>
    </Router>
  );
}

export default App;
