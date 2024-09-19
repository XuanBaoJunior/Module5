import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import List from "./components/List";
import Create from "./components/Create";
import UpdateDonHang from "./components/Update";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/donhang/list" element={<List/>}></Route>
          <Route path="/donhang/create" element={<Create/>}></Route>
          <Route path="/donhang/update/:id" element={<UpdateDonHang/>}></Route>
          {/*<Route path="*" element={<NotFound/>}></Route>*/}
        </Routes>
        <ToastContainer position={'top-center'} autoClose={1000}></ToastContainer>
      </BrowserRouter>
    </>
  );
}

export default App;
