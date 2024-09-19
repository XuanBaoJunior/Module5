import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {create, listProductName} from "../service/DonHangService";
import * as Yup from "yup";
import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";

function Create() {
    const navigate = useNavigate();
    const [productList, setProductList] = useState([]);
    const hang = {
        buyDate: "",
        total: "",
        number: "",
        products: {
        },
        id: ""
    }

    useEffect(() => {
        ListProducts();
    }, [])

    const ListProducts = async () => {
        let temp = await listProductName();
        setProductList(temp);
    }
    const validate = {
        buyDate: Yup.date().required("Required").max(new Date(),"Ngày nhập vào phải trước ngày hiện tại"),
        number: Yup.number().required("Required").integer("Số nhập vào phải là số nguyên dương").positive("Số nhập vào phải là số nguyên dương").min(1,"Số nhập vào phải lớn hơn 0"),
        id: Yup.string().required("Required").matches(/^CD/, "ID must start with 'CD'")
    }

    const createHang = async (value) => {
      await create(value);
      toast.success("Create Success");
      navigate("/donhang/list");
    }

    if (!productList) return null;

    return (
        <>
            <Formik initialValues={hang} onSubmit={(value,{setSubmitting})=> {
                setTimeout(()=> {
                    setSubmitting(false);
                },1000);
                const obj = {...value,products:JSON.parse(value.products)}
                const total = parseInt(value.number) * obj.products.price;
                const obj2 = {...obj,total:total};
                createHang(obj2);
            }} validationSchema={Yup.object(validate)}>
                {
                    ({isSubmitting}) => (
                        <Form>
                            <div className="mb-3">
                                <label htmlFor="id" className="form-label">ID:</label>
                                <Field type="text" name="id" className="form-control" id="id"/>
                                <ErrorMessage name='id' component='span' style={{color: 'red'}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="buyDate" className="form-label">Ngày mua:</label>
                                <Field type="date" name="buyDate" className="form-control" id="buyDate"/>
                                <ErrorMessage name='buyDate' component='span' style={{color: 'red'}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="number" className="form-label">Số lượng:</label>
                                <Field type="text" name="number" className="form-control" id="number"/>
                                <ErrorMessage name='number' component='span' style={{color: 'red'}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="productTypes" className="form-label">Loại sản phẩm:</label>
                                <Field as="select" className="form-select" id="productTypes"
                                       aria-label="Default select example"
                                       name="products" required>
                                    <option value="">--Chọn loại sản phẩm--</option>
                                    {productList.map((item, index) => (
                                        <option key={index} value={JSON.stringify(item)}>{item.name}</option>
                                    ))}
                                </Field>
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