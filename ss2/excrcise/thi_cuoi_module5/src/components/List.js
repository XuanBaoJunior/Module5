import {useEffect, useState} from "react";
import * as QuanAoService from "../service/QuanAoService";
import Moment from 'moment';
import {NavLink} from "react-router-dom";

function List() {
    const [quanAo, setQuanAo] = useState([]);
    const [product, setProduct] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        getAll();
        listQuanAo();
    }, []);

    useEffect(() => {
        listQuanAo();
    }, [search, selectedProduct]);

    const getAll = async () => {
        const products = await QuanAoService.listProduct();
        setProduct(products);
    };

    const listQuanAo = async () => {
        const temp = await QuanAoService.list(search, selectedProduct);
        setQuanAo(temp);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleProductChange = (e) => {
        setSelectedProduct(e.target.value);
    };

    return (
        <>
            <h1>Danh sách Quần Áo</h1>

            <div style={{display: 'flex'}}>
                <div className="mb-3">
                    <label htmlFor="productTypes" className="form-label" style={{marginLeft: '90px'}}>Loại sản phẩm:</label>
                    <select className="form-select" id="productTypes"
                            aria-label="Default select example" style={{width: '220px', marginLeft: '90px'}}
                            onChange={handleProductChange}>
                        <option value="">--Chọn loại sản phẩm--</option>
                        {product.map((item, index) => (
                            <option key={index} value={item.type}>{item.type}</option>
                        ))}
                    </select>
                </div>
            </div>

            <table className='table container'>
                <thead>
                <tr>
                    <td>Mã sản phẩm</td>
                    <td>Tên sản phẩm</td>
                    <td>Ngày nhập</td>
                    <td>Số lượng</td>
                    <td>Loại sản phẩm</td>
                    <th>Actior</th>
                </tr>
                </thead>
                <tbody>
                {
                    quanAo.length === 0 ? <h3 className='container'>Không có kết quả</h3> :
                        quanAo.map((item, index) =>
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{Moment(item.days).format("DD/MM/yyyy")}</td>
                                <td>{item.number}</td>
                                <td>{item.products.type}</td>
                                <td>
                                    <NavLink to={`/quanao/update/${item.id}`}
                                             className="btn btn-primary container">Update</NavLink>
                                </td>
                            </tr>
                        )
                }
                </tbody>
            </table>
        </>
    )
}

export default List;
