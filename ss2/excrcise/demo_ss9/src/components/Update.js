import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { listClothes, listProductTypes } from "../servicer/QuanAoServicer";
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Moment from 'moment';
import axios from "axios";
import {toast} from "react-toastify";

const updateSchema = Yup.object().shape({
    name: Yup.string()
        .required('Tên sản phẩm là bắt buộc')
        .max(100, 'Tên sản phẩm không được vượt quá 100 ký tự'),
    productType: Yup.string()
        .required('Loại sản phẩm là bắt buộc'),
    days: Yup.date()
        .required('Ngày mua là bắt buộc')
        .max(new Date(), 'Ngày mua không được lớn hơn ngày hiện tại'),
    number: Yup.number()
        .required('Số lượng là bắt buộc')
        .positive('Số lượng phải là số dương')
        .integer('Phải là số nguyên dương')
});

function UpdateClothes() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [clothes, setClothes] = useState(null);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productTypes = await listProductTypes();
                setProductList(productTypes);

                const clothesList = await listClothes("", "");
                const item = clothesList.find(c => c.id === id);
                setClothes(item);
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = async (values) => {
        try {
            await axios.put(`http://localhost:8080/quanAo/${id}`, {
                ...values,
                products: { type: values.productType }
            });
            toast.success('Cập nhật thành công!');
            navigate('/list');
        } catch (e) {
            console.log(e);
        }
    };

    if (!clothes) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Cập nhật quần áo</h1>
            <Formik
                initialValues={{
                    name: clothes.name,
                    productType: clothes.products.type,
                    days: Moment(clothes.days).format("YYYY-MM-DD"),
                    number: clothes.number
                }}
                validationSchema={updateSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Tên sản phẩm:</label>
                            <Field
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                            />
                            <ErrorMessage name="name" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productType" className="form-label">Loại sản phẩm:</label>
                            <Field
                                as="select"
                                id="productType"
                                name="productType"
                                className="form-select"
                            >
                                <option value="">--Chọn loại sản phẩm--</option>
                                {productList.map((item) => (
                                    <option key={item.id} value={item.type}>
                                        {item.type}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="productType" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="days" className="form-label">Ngày mua:</label>
                            <Field
                                type="date"
                                id="days"
                                name="days"
                                className="form-control"
                            />
                            <ErrorMessage name="days" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="number" className="form-label">Số lượng:</label>
                            <Field
                                type="number"
                                id="number"
                                name="number"
                                className="form-control"
                            />
                            <ErrorMessage name="number" component="div" className="text-danger" />
                        </div>
                        <button type="submit" className="btn btn-primary">Lưu</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default UpdateClothes;
