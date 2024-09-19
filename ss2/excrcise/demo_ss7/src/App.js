import logo from './logo.svg';
import './App.css';
import List from "./components/List";
import {ToastContainer} from "react-toastify";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Create from "./components/Create";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/car/list" element={<List/>}></Route>
          <Route path="/car/create" element={<Create/>}></Route>
        </Routes>
        <ToastContainer position={'top-center'} autoClose={2000}></ToastContainer>
      </BrowserRouter>
    </>
  );
}

export default App;
