import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import * as studentService from "../../services/studentService";
import toast from "bootstrap/js/src/toast";
import {ErrorMessage, Field, Form, Formik} from "formik";

function StudentCreate(){
    const [student,setStudent]=useState({
        id: "",
        name: "",
        age: "",
        address: ""

    });

    const navigate = useNavigate();

    const validateStudent = {
        id: Yup.number().min(1, "id không được nhỏ hơn 0").max(20, "id không được lớn hơn 20"),
        name: Yup.string().required("name is required").min(1, "name is required").matches(/^[a-zA-Z0-9]+$/, "name is required"),
    }

    useEffect(() => {

    }, []);

    const saveStudent = async (value) => {
        console.log(value);
        console.log(student)
        try {
            await studentService.saveStudent(value);
        }catch (e){

        }
        toast.success("Thêm mới thành công")
        navigate("/student");
    }

    return(
        <>
            <Formik initialValues={student} onSubmit={saveStudent} validationSchema={Yup.object(validateStudent)}>
                <Form>
                    ID: <Field name="id"></Field>
                    <ErrorMessage name="id" component="div"></ErrorMessage>
                    Name: <Field name="name"></Field>
                    <ErrorMessage name="name" component="div"></ErrorMessage>
                    Age: <Field name="age"></Field>
                    Address: <Field name="address"></Field>
                    <button type="submit">Thêm mới</button>
                </Form>
            </Formik>
        </>
    )
}

export default StudentCreate;