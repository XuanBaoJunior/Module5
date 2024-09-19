import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Moment from 'moment';
import * as QuanAoService from "../service/QuanAoService";

function Update() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        getProductTypes();
        getQuanAoById();
    }, []);

    const getProductTypes = async () => {
        const qAo = await QuanAoService.listProduct();
        setProduct(qAo);
    };

    const getQuanAoById = async () => {
        const data = await QuanAoService.getById(id);
        formik.setValues({
            id: data.id,
            name: data.name,
            days: Moment(data.days).format("YYYY-MM-DD"),
            number: data.number,
            products: {
                type: data.products.type
            }
        });
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .max(100, "Tên sản phẩm không được quá 100 ký tự")
            .required("Tên sản phẩm là bắt buộc"),
        days: Yup.date()
            .max(new Date(), "Ngày nhập không được quá ngày hiện tại")
            .required("Ngày nhập là bắt buộc"),
        number: Yup.number()
            .min(0, "Số lượng không được âm")
            .integer("Số lượng phải là số nguyên dương")
            .required("Số lượng là bắt buộc"),
        products: Yup.object({
            type: Yup.string().required("Loại sản phẩm là bắt buộc")
        })
    });

    const formik = useFormik({
        initialValues: {
            id: "",
            name: "",
            days: "",
            number: 0,
            products: {
                type: ""
            }
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await QuanAoService.updateAQ(id, values);
            navigate("/quanao/list");
        },
    });

    return (
        <>
            <h1>Update Quần Áo</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Tên sản phẩm:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="text-danger">{formik.errors.name}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="days" className="form-label">Ngày nhập:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="days"
                        name="days"
                        value={formik.values.days}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.days && formik.errors.days ? (
                        <div className="text-danger">{formik.errors.days}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="number" className="form-label">Số lượng:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="number"
                        name="number"
                        value={formik.values.number}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.number && formik.errors.number ? (
                        <div className="text-danger">{formik.errors.number}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="productTypes" className="form-label">Loại sản phẩm:</label>
                    <select
                        className="form-select"
                        id="productTypes"
                        name="products.type"
                        value={formik.values.products.type}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="">--Chọn loại sản phẩm--</option>
                        {product.map((item, index) => (
                            <option key={index} value={item.type}>{item.type}</option>
                        ))}
                    </select>
                    {formik.touched.products && formik.errors.products ? (
                        <div className="text-danger">{formik.errors.products.type}</div>
                    ) : null}
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </>
    )
}

export default Update;
