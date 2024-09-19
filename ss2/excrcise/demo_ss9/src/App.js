import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import ClothesList from "./components/List";
import ClothesUpdate from "./components/Update";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/list" element={<ClothesList/>}></Route>
            <Route path="/aoquan/update/:id" element={<ClothesUpdate />} />
        </Routes>
        <ToastContainer position={'top-center'} autoClose={1000}></ToastContainer>
      </BrowserRouter>

      </>
  );
}

export default App;
