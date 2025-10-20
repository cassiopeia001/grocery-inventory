import './App.css';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Category from './pages/Category';
import { Routes, Route } from "react-router";

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element = {<Home />} />
          <Route path='/categories/:category_id' element= {<Category />} />
        </Route>  
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </>
  )
}

export default App
