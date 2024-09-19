import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import StudentListFunc from "./components/student/studentListFunc";
import StudentCreate from "./components/student/studentCreate";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// function ToastContainer() {
//     return null;
// }

function App() {

  let nameClass = "A0623I1"

  const changeNameClass = (temp) => {
    console.log(temp);
    nameClass = temp;
    console.log(nameClass);
  }

  return (
        <>
          <BrowserRouter>
            <Routes>
                <Route path="student" element={<StudentListFunc/>}></Route>
                <Route path="student/studentCreate" element={<StudentCreate/>}></Route>
            </Routes>
          </BrowserRouter>
            <ToastContainer />
        </>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
