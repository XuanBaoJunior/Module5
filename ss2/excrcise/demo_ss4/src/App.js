import logo from './logo.svg';
import './App.css';
import StudentList from "./components/student/StudentList";
import DemoState from "./components/DemoState";
import StudentListFunc from "./components/student/StudentListFunc";
import DemoStateFunc from "./components/DemoStateFunc";

function App() {
    let nameClass = "A0623I1"
    // => State.

    const changeNameClass = (temp) => {
        console.log(temp);
        nameClass = temp;
        console.log(nameClass)
    }
  return (
    <>
      {/*<StudentList changeName = {changeNameClass} nameClass = {nameClass} ageClass="2"></StudentList>*/}
   {/*<StudentListFunc></StudentListFunc>*/}
        <DemoStateFunc></DemoStateFunc>
    </>
  );
}

export default App;