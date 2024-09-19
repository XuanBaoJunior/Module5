import {useEffect, useState} from "react";
import {list, listProductName, deleteDonHang } from "../service/DonHangService";
import {NavLink, useNavigate} from "react-router-dom";
import Moment from 'moment';
import axios from "axios";
import { toast } from 'react-toastify';

function List() {
    const [donHang, setDonHang] = useState([]);
    const [productList, setProductList] = useState([]);
    const [search, setSearch] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    let stt = 1;
    const [selectedProductType, setSelectedProductType] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        ListProducts();
    }, [])

    const ListProducts = async () => {
        let temp = await listProductName();
        setProductList(temp);
    }

    // const handleSearch = (e) => {
    //     setSearch(e.target.value);
    // };

    const handleProductTypeChange = (e) => {
        const selectedType = e.target.value;
        setSelectedProductType(selectedType);
        ListDonhang(selectedType);
    };

    const handleSearchDate = async () => {
        try {
            let temp = await axios.get(`http://localhost:8080/donhang?products.name_like=${search}&_sort=products.price`);
            let date = temp.data;
            const filterDate = date.filter((item) => {
                return item.buyDate >= fromDate && item.buyDate <= toDate;
            });
            const filterProductType = selectedProductType ? filterDate.filter(item => item.products.type === selectedProductType) : filterDate;

            // Sắp xếp danh sách theo giá (tăng dần)
            const sortedFilter = filterProductType.sort((a, b) => a.products.price - b.products.price);
            setDonHang(filterProductType);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (fromDate === "" || toDate === "") {
            ListDonhang(selectedProductType);
        } else {
            handleSearchDate();
        }
    }, [fromDate, toDate, search, selectedProductType]);

    const ListDonhang = async (selectedType = selectedProductType) => {
        try {
            let temp = await list(search);
            const filteredDonHang = selectedType ? temp.filter(item => item.products.type === selectedType) : temp;

            // Sắp xếp danh sách theo giá (tăng dần)
            const sortedDonHang = filteredDonHang.sort((a, b) => a.products.price - b.products.price);
            setDonHang(filteredDonHang);
        } catch (e) {
            console.log(e);
        }
    };

    const toggleProductAvailability = async (id) => {
        const updatedDonhang = donHang.map((item) => {
            if (item.id === id) {
                item.available = !item.available;
            }
            return item;
        });
        setDonHang(updatedDonhang);
        try {
            await axios.patch(`http://localhost:8080/donhang/${id}`, {
                available: updatedDonhang.find(item => item.id === id).available
            });
        } catch (e) {
            console.log(e);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteDonHang(id);
            setDonHang(donHang.filter(item => item.id !== id));
            toast.success("Xóa đơn hàng thành công!");
        } catch (e) {
            toast.error("Có lỗi xảy ra khi xóa đơn hàng!");
            console.log(e);
        }
    };

    const handleUpdate = (id) => {
        navigate(`/donhang/update/${id}`);
    };

    if (!productList) return null;

    return (
        <>
            <h1 style={{textAlign: "center"}}>
                Danh sách đơn hàng
            </h1>
            <NavLink to={'/donhang/create'} className="btn btn-primary container"
                     style={{width: '200px', marginLeft: '90px'}}>Create new donhang</NavLink>

            <div style={{display: 'flex'}}>
                <div className="mb-3">
                    <label htmlFor="productTypes" className="form-label" style={{marginLeft: '90px'}}>Loại sản
                        phẩm:</label>
                    <select className="form-select" id="productTypes"
                            aria-label="Default select example" style={{width: '220px', marginLeft: '90px'}}
                            onChange={handleProductTypeChange} value={selectedProductType}>
                        <option value="">--Chọn loại sản phẩm--</option>
                        {productList.map((item, index) => (
                            <option key={index} value={item.type}>{item.type}</option>
                        ))}
                    </select>
                </div>
                <div style={{display: 'flex', margin: '0 calc(50% - 10px)'}}>
                    <div className="mb-3" style={{marginRight: '10px'}}>
                        <label htmlFor="fromDate" className="form-label">Ngày bắt đầu:</label>
                        <input type="date" className="form-control" id="fromDate"
                               onChange={(e) => setFromDate(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fromDate" className="form-label">Ngày kết thúc:</label>
                        <input type="date" className="form-control" id="fromDate"
                               onChange={(e) => setToDate(e.target.value)}/>
                    </div>
                </div>
            </div>

            <table className='table container'>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Mã đơn hàng</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá(USD)</th>
                    <th>Loại sản phẩm</th>
                    <th>Ngày mua</th>
                    <th>Số lượng</th>
                    <th>Tổng tiền(USD)</th>
                    <th>Yes/No</th>
                    <th>Actior</th>
                </tr>
                </thead>
                <tbody>
                {
                    donHang.length === 0 ? <h3 className='container'>Không có kết quả</h3> :
                        donHang.map((item, index) => (
                            <tr key={index}>
                                <td>{stt++}</td>
                                <td>{item.id}</td>
                                <td>{item.products.name}</td>
                                <td>{item.products.price}</td>
                                <td>{item.products.type}</td>
                                <td>{Moment(item.buyDate).format("DD/MM/yyyy")}</td>
                                <td>{item.number}</td>
                                <td>{item.total}</td>
                                <td>
                                    <button
                                        className="btn"
                                        style={{
                                            backgroundColor: item.available ? "green" : "red",
                                            color: "white"
                                        }}
                                        onClick={() => toggleProductAvailability(item.id)}>
                                        {item.available ? " Có sản phẩm" : "Hết sản phẩm"}
                                    </button>

                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        style={{marginLeft: '5px'}}
                                        onClick={() => handleDelete(item.id)}>
                                        Xóa
                                    </button>
                                    <button className="btn btn-primary" style={{marginLeft: '5px'}}
                                            onClick={() => handleUpdate(item.id)}>Update
                                    </button>
                                </td>
                            </tr>
                        ))
                }
                </tbody>
            </table>
        </>
    )
}

export default List;