import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {createCar, listProduct} from "../services/Car";
import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

function Create(){
    const navigate = useNavigate();
    const [productList, setProductList] = useState([]);
    const hang = {
        id: "",
        buyDate: "",
        total: "",
        number: "",
        mota: "",
        // productName: "",
        // productPrice: "",
        // productMota: "",
        products: {
        }
    }

    useEffect(() => {
        ListProducts();
    }, [])

    const ListProducts = async () => {
        let temp = await listProduct();
        setProductList(temp);
    }

    const validate = {
        buyDate: Yup.date().required("Không được để trống").max(new Date(),"Ngày nhập vào phải trước ngày hiện tại"),
        number: Yup.number().required("Không được để trống").integer("Số nhập vào phải là số nguyên dương").positive("Số nhập vào phải là số nguyên dương").min(1,"Số nhập vào phải lớn hơn 0"),
        id: Yup.string().required("Required").matches(/^CAR-\d{4}$/, "ID không đúng định dạng, VD: CAR-0000"),
        // productName: Yup.string().required("Không được để trống").min(2, "Phải nhập tối thiếu 2 kí tự").max(1000, "Không được quá 1000 ký tự."),
        // productPrice: Yup.number().required("Không được để trống").integer("Số nhập vào phải là số nguyên dương").positive("Số nhập vào phải là số nguyên dương").min(1,"Số nhập vào phải lớn hơn 0"),
        mota: Yup.string().required("Không được để trống").min(2, "Phải nhập tối thiếu 2 kí tự").max(1000, "Không được quá 1000 ký tự.")
    }

    const createProduct = async (name) => {
        await createCar(name);
        toast.success("Product created!");
        navigate("/car/list");
    }

    if (!productList) return null;

    return(
        <>
            <Formik initialValues={hang} onSubmit={(value,{setSubmitting})=> {
                setTimeout(() => { setSubmitting(false);},1000);
                const obj = {...value,products:JSON.parse(value.products)}
                const total = parseInt(value.number) * obj.products.price;
                const obj2 = {...obj,total:total};
                createProduct(obj2);
            }
            } validationSchema={Yup.object(validate)}>
                {
                    ({isSubmitting}) => (
                        <Form>
                            <h1 style={{textAlign: "center"}}>Thêm mới sản phẩm</h1>
                            <div className="mb-3">
                                <label htmlFor="id" className="form-label">Mã sản phẩm:</label>
                                <Field type="text" name="id" className="form-control" id="id"/>
                                <ErrorMessage name='id' component='span' style={{color: 'red'}}></ErrorMessage>
                            </div>

                            {/*<div className="mb-3">*/}
                            {/*    <label htmlFor="productName" className="form-label">Tên sản phẩm:</label>*/}
                            {/*    <Field type="text" name="productName" className="form-control" id="productName"/>*/}
                            {/*    <ErrorMessage name='productName' component='span' style={{color: 'red'}}></ErrorMessage>*/}
                            {/*</div>*/}

                            <div className="mb-3">
                                <label htmlFor="productTypes" className="form-label">Thể loại:</label>
                                <Field as="select" className="form-select" id="productTypes"
                                       aria-label="Default select example"
                                       name="products" required>
                                    <option value="">--Chọn thể loại--</option>
                                    {productList.map((item, index) => (
                                        <option key={index} value={JSON.stringify(item)}>{item.name}</option>
                                    ))}
                                </Field>
                            </div>

                            {/*<div className="mb-3">*/}
                            {/*    <label htmlFor="productPrice" className="form-label">Giá:</label>*/}
                            {/*    <Field type="number" name="productPrice" className="form-control" id="productPrice"/>*/}
                            {/*    <ErrorMessage name='productPrice' component='span'*/}
                            {/*                  style={{color: 'red'}}></ErrorMessage>*/}
                            {/*</div>*/}

                            <div className="mb-3">
                                <label htmlFor="number" className="form-label">Số lượng:</label>
                                <Field type="text" name="number" className="form-control" id="number"/>
                                <ErrorMessage name='number' component='span' style={{color: 'red'}}></ErrorMessage>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="buyDate" className="form-label">Ngày nhập sản phẩm:</label>
                                <Field type="date" name="buyDate" className="form-control" id="buyDate"/>
                                <ErrorMessage name='buyDate' component='span' style={{color: 'red'}}></ErrorMessage>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="mota" className="form-label">Mô tả sản phẩm:</label>
                                <Field type="text" name="mota" className="form-control" id="mota"/>
                                <ErrorMessage name='mota' component='span' style={{color: 'red'}}></ErrorMessage>
                            </div>

                            {
                                isSubmitting ? <></> :
                                    <button type='submit' className='btn btn-primary'>Submit</button>
                            }
                        </Form>
                    )
                }
            </Formik>
        </>
    )

}

export default Create;