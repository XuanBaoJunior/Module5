import logo from './logo.svg';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import NotFound from "./components/NotFound";
import List from "./components/List";
import Create from "./components/Create";

function App() {
  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path="/donhang/list" element={<List/>}></Route>
                  <Route path="/donhang/create" element={<Create/>}></Route>
                  <Route path="*" element={<NotFound/>}></Route>
              </Routes>
              <ToastContainer position={'top-center'} autoClose={1000}></ToastContainer>
          </BrowserRouter>
      </>
  );
}

export default App;
