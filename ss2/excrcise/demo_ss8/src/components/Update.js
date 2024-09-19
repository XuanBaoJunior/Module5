import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDonHangById, updateDonHang, listProductName } from '../service/DonHangService';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    buyDate: Yup.date().required('Ngày mua bắt buộc phải nhập').max(new Date(),"Ngày nhập vào phải trước ngày hiện tại"),
    number: Yup.number().positive("Số nhập vào phải là số nguyên dương").min(1,"Số nhập vào phải lớn hơn 0").integer('Số lượng phải là số nguyên').required('Số lượng bắt buộc phải nhập'),
    total: Yup.number().positive("Số nhập vào phải là số nguyên dương").min(1,"Số nhập vào phải lớn hơn 0").integer('Giá phải là số nguyên').required('Giá bắt buộc phải nhập'),
    products: Yup.object().shape({
        id: Yup.string().required('Product is required')
    }).required('Product is required')
});

function UpdateDonHang() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState({ products: {} });
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const orderData = await getDonHangById(id);
                const productData = await listProductName();
                setOrder(orderData);
                setProductList(productData);
            } catch (error) {
                toast.error('Error fetching order details');
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (values) => {
        try {
            await updateDonHang(id, values);
            toast.success('Order updated successfully');
            navigate('/donhang/list');
        } catch (error) {
            toast.error('Error updating order');
        }
    };

    if (!order || !productList.length) return <div>Loading...</div>;

    return (
        <div className="container">
            <h2>Update Order</h2>
            <Formik
                initialValues={order}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ setFieldValue, values }) => (
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="buyDate" className="form-label">Ngày mua</label>
                            <Field
                                type="date"
                                className="form-control"
                                id="buyDate"
                                name="buyDate"
                            />
                            <ErrorMessage name="buyDate" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="number" className="form-label">Số lượng</label>
                            <Field
                                type="number"
                                className="form-control"
                                id="number"
                                name="number"
                            />
                            <ErrorMessage name="number" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="total" className="form-label">Giá</label>
                            <Field
                                type="number"
                                className="form-control"
                                id="total"
                                name="total"
                            />
                            <ErrorMessage name="total" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="products" className="form-label">Tên sản phẩm</label>
                            <Field
                                as="select"
                                className="form-select"
                                id="products"
                                name="products.id"
                                onChange={e => {
                                    setFieldValue('products.id', e.target.value);
                                    const selectedProduct = productList.find(product => product.id === e.target.value);
                                    if (selectedProduct) {
                                        setFieldValue('products', selectedProduct);
                                    }
                                }}
                            >
                                <option value="">--Select a product--</option>
                                {productList.map(product => (
                                    <option key={product.id} value={product.id}>
                                        {product.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="products.id" component="div" className="text-danger" />
                        </div>
                        <button type="submit" className="btn btn-primary">Update Order</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default UpdateDonHang;
