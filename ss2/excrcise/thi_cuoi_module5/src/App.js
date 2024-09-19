import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import List from "./components/List";
import Update from "./components/Update";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/quanao/list" element={<List/>}></Route>
          <Route path="/quanao/update/:id" element={<Update/>}></Route>
        </Routes>
        <ToastContainer position={'top-center'} autoClose={1000}></ToastContainer>
      </BrowserRouter>
    </>
  );
}

export default App;
