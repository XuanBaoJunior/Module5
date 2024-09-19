import { useEffect, useState } from "react";
import Moment from 'moment';
import { listClothes, listProductTypes } from "../servicer/QuanAoServicer";
import { useNavigate } from "react-router-dom";

function ClothesList() {
    const [clothes, setClothes] = useState([]);
    const [productList, setProductList] = useState([]);
    const [selectedProductType, setSelectedProductType] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            await fetchProductTypes();
            await fetchClothes();
        };
        fetchData();
    }, [selectedProductType]);

    const fetchProductTypes = async () => {
        try {
            let temp = await listProductTypes();
            setProductList(temp);
        } catch (e) {
            console.log(e);
        }
    };

    const fetchClothes = async () => {
        try {
            let temp = await listClothes("", selectedProductType);
            setClothes(temp);
        } catch (e) {
            console.log(e);
        }
    };

    const handleProductTypeChange = (e) => {
        setSelectedProductType(e.target.value);
    };

    const handleUpdate = (id) => {
        navigate(`/aoquan/update/${id}`);
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Danh sách quần áo</h1>

            <div className="row mb-4">
                <div className="col-md-6 mb-3">
                    <label htmlFor="productTypes" className="form-label">Loại sản phẩm:</label>
                    <select
                        className="form-select"
                        id="productTypes"
                        onChange={handleProductTypeChange}
                        value={selectedProductType}
                        style={{ width: '230px' }}
                    >
                        <option value="">--Chọn loại sản phẩm--</option>
                        {productList.map((item, index) => (
                            <option key={index} value={item.type}>
                                {item.type}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <table className='table table-striped'>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Mã quần áo</th>
                    <th>Tên sản phẩm</th>
                    <th>Loại sản phẩm</th>
                    <th>Ngày mua</th>
                    <th>Số lượng</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {clothes.length === 0 ? (
                    <tr><td colSpan="7" className='text-center'>Không có kết quả</td></tr>
                ) : (
                    clothes.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.products?.type || ''}</td>
                            <td>{Moment(item.days).format("DD/MM/yyyy")}</td>
                            <td>{item.number}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => handleUpdate(item.id)}>
                                    Cập nhật
                                </button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}

export default ClothesList;
