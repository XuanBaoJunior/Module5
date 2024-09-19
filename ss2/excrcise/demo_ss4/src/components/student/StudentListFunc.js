import {useEffect, useState} from "react";

function StudentListFunc() {
    const [students, setStudents] = useState([]);

    // Tham số thứ nhất là callback để xử lý side effect
    useEffect(() => {
        //     Call API => học bài API client
        setStudents([
            {
                id: 1,
                name: "haiTT",
                age: 20,
                address: "Quảng Nam"
            },
            {
                id: 2,
                name: "haiTT1",
                age: 20,
                address: "Quảng Nam"
            },
            {
                id: 3,
                name: "haiTT2",
                age: 20,
                address: "Quảng Nam"
            }
        ])
    })
    // Tham số thứ 2 dependencies

    return (
        <>
            <table border="1" width="400px" className="abc">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Address</th>
                </tr>
                </thead>
                <tbody>
                {students.map((student, index) => (
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>{student.age}</td>
                        <td>{student.address}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}

export default StudentListFunc;