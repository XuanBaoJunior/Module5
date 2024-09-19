import {useEffect, useState} from "react";
import * as studentService from "../../services/studentService";
import toast from "bootstrap/js/src/toast";
import {Link} from "react-router-dom";
import Modal from 'react-modal';

function StudentListFunc() {
    const [students, setStudents] = useState([]);
    const [studentDelete, setStudentDelete] = useState({});

    useEffect(() => {
        getAll();
        Modal.setAppElement('body');
    }, [])

    const getAll = async () => {
        const temp = await studentService.getAllStudent();
        setStudents(temp);
    }
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal(){
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
    }

    const changeInfoDelete = (student) => {
        setStudentDelete(student);
        openModal();
    }

    const removeStudent = async () => {
        closeModal();
        await studentService.deleteStudent(studentDelete.id);
        toast.success("Student deleted");
        getAll();
    }

    return (
        <>
            <Link to="/student/create">
                <button>Create</button>
            </Link>
            <table border="1" width="400px">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Address</th>
                    <th>Delele</th>
                </tr>
                </thead>
                <tbody>
                {students.map((student, index ) => (
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>{student.age}</td>
                        <td>{student.address}</td>
                        <td><button onClick={() => changeInfoDelete(student)}>Xóa</button> </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
                <button onClick={closeModal}>close</button>
                <div>Bạn có muốn xóa học sinh {studentDelete.name}</div>
                <button onClick={removeStudent}>Xóa</button>
            </Modal>
        </>
    )
}

export default StudentListFunc;