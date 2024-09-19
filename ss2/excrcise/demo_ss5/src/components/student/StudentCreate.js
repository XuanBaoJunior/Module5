import {ErrorMessage, Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import * as studentService from "../../services/StudentService"
import {toast} from "react-toastify";

function StudentCreate() {
    const [student, setStudent] = useState({
        id: "",
        name: "",
        age: "",
        address: ""
    })

    const navigate = useNavigate();

    const validateStudent = {
        id: Yup.number()
            .min(0, "Id không được nhỏ hơn 0")
            .max(10000000000),
        name: Yup.string()
            .required("Name không được để trống")
            .min(3, "Name không được nhỏ hơn 3 ký tự")
            .matches(/^[A-Za-z ]{3,100}$/, "Name phải đúng định dạng"),
        age: Yup.number()
            .required("Tuổi không được để trống")
            .min(0, "Tuổi không được nhỏ hơn 0")
            .max(120, "Tuổi không được lớn hơn 120"),
        address: Yup.string()
            .required("Địa chỉ không được để trống")
            .matches(/^[A-Za-z ]{3,100}$/, "Địa chỉ phải đúng định dạng"),
    }

    useEffect (() => {

    }, [])

    const saveStudent = (value) => {
        console.log(value);
        console.log(student)
    //     Call API thêm mới
        studentService.saveStudent(value);
        toast.success("Thêm mới thành công")
    //     Chuyển về list
        navigate("/student")
    }

    return(
        <>
            <Formik initialValues={student} onSubmit={saveStudent} validationSchema={Yup.object(validateStudent)}>
                <Form>
                ID: <Field name="id"></Field>
                    <ErrorMessage name="id" component="span"></ErrorMessage>
                   Name: <Field name="name"></Field>
                    <ErrorMessage name="name" component="span"></ErrorMessage>
                   Age: <Field name="age"></Field>
                   <ErrorMessage name="age" component="span"></ErrorMessage>
                   Address: <Field name="address"></Field>
                   <ErrorMessage name="address" component="span"></ErrorMessage>
                    <button type="submit">Thêm mới</button>
                </Form>
            </Formik>
        </>
    )
}

export default StudentCreate;