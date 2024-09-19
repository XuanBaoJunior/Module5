import {Component} from "react";

export class StudentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [
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
            ],
            teachers: [],
            num: 5
        }
    }
    componentDidMount() {

    }

    render() {
        return (
            // JSX
            <>
                <button onClick={() => this.props.changeName("A0823I1")}>ChangeName</button>
                <h1>Danh sách học sinh {this.props.nameClass} {this.props.ageClass}</h1>
                <table border="1" width="400px">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Address</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.students.map((student, index) => (
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
}

export default StudentList;