
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import List from "./components/List";
import Create from "./components/Create";
import NotFound from "./components/NotFound";
import {ToastContainer} from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/donhang/list" element={<List/>}></Route>
          <Route path="/donhang/create" element={<Create/>}></Route>
          {/*<Route path="*" element={<NotFound/>}></Route>*/}
        </Routes>
        <ToastContainer position={'top-center'} autoClose={2000}></ToastContainer>
      </BrowserRouter>
    </>
  );
}

export default App;
