import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { publishRoutes, privateRoutes } from "./routes";
import { ProductContext } from "./components/Context";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { fetchPosts } from "./api/product";
function App() {
<<<<<<< HEAD
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
=======

  
  const [data, setData] = useState([])
  const [cart, setCart] = useState([])
  const [payment, setPayment] = useState([])
  const [tmpcart, setTmpCart] = useState([])
  const [ordered, setOrdered] = useState([])


  


>>>>>>> master

  useEffect(() => {
    fetchPosts().then((response) => setData(response.data));
  }, []);

  const [page, setPage] = useState(1) 

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  const handleClick = () => {
    if (page === 1) {
<<<<<<< HEAD
      setPage(0);
    } else setPage(1);
  };
  return (
    <Router>
      <div className="App">
        <ProductContext.Provider value={{ data, setData }}>
          <Header />
          <Routes>
            {publishRoutes.map((route, id) => {
              const Page = route.component;
              return <Route key={id} path={route.path} element={<Page />} />;
            })}
            {privateRoutes.map((route, id) => {
              const Page = route.component;
              return <Route key={id} path={route.path} element={<Page />} />;
            })}
          </Routes>
          <Footer />

          <p className="to-top" onClick={handleClick}>
            <i className="fa-sharp fa-solid fa-chevron-up"></i>
          </p>
        </ProductContext.Provider>
      </div>
    </Router>
=======
      setPage(0)
    }
    else setPage(1)
  }

  const setDataToCart = (data) => {
    setCart([...cart, data])
    setTmpCart([...tmpcart, data])
  }

  const setDataToTmp = (data) => {
    setTmpCart([...tmpcart, data])
  }

  const setToOrdered = (data) => {
    setOrdered([...ordered, data])
  }

  console.log(data)

  return (
    <ProductContext.Provider value={
      {data, setData, cart, setDataToCart, setCart, payment, setPayment, tmpcart, setDataToTmp, setTmpCart, ordered, setToOrdered, setOrdered}}
      >
      <Router>
        <div className="App">
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
        </div>
      </Router>
    </ProductContext.Provider>

>>>>>>> master
  );
}

export default App;
