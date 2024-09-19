import {useEffect, useState} from "react";
import * as Orders from "../service/Donhang";
import Moment from 'moment';
import {NavLink} from "react-router-dom";
import axios from "axios";

function List() {
    const [donhang, setDonhang] = useState([]);
    const [productList, setProductList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [search, setSearch] = useState("");
    let stt = 1;
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    // const [productAvailability, setProductAvailability] = useState({});

    useEffect(() => {
        ListProducts();
        ListDonhang();
    }, [])

    const ListProducts = async () => {
        let temp = await Orders.listProductName();
        setProductList(temp);
    }

    const handleProductChange = (e) => {
        setSelectedProduct(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchDate = async () => {
        try {
            let temp = await axios.get(`http://localhost:8080/donhang?products.name_like=${search}&_sort=products.price`);
            let date = temp.data;
            const filterDate = date.filter((item) => {
                return item.buyDate >= fromDate && item.buyDate <= toDate;
            })
            setDonhang(filterDate);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (fromDate === "" || toDate === "") {
            ListDonhang();
        } else {
            handleSearchDate();
        }
    }, [fromDate, toDate, search, selectedProduct]);

    const ListDonhang = async () => {
        let temp = await Orders.list(search, selectedProduct);
        setDonhang(temp);
    }

    const toggleProductAvailability = async (id) => {
        const updatedDonhang = donhang.map((item) => {
            if (item.id === id) {
                item.available = !item.available;
            }
            return item;
        });
        setDonhang(updatedDonhang);
        try {
            await axios.patch(`http://localhost:8080/donhang/${id}`, {
                available: updatedDonhang.find(item => item.id === id).available
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <h1 style={{textAlign: "center"}}>
                Thống kê sản phẩm
            </h1>
            <NavLink to={'/donhang/create'} className="btn btn-primary container"
                     style={{width: '200px', marginLeft: '90px'}}>Thêm Mới</NavLink>

            <div style={{display: 'flex', marginBottom: '20px'}}>
                <div className="mb-3">
                    <label htmlFor="productTypes" className="form-label" style={{marginLeft: '90px'}}>Loại sản
                        phẩm:</label>
                    <select className="form-select" id="productTypes" aria-label="Default select example"
                            style={{width: '220px', marginLeft: '90px'}}
                            onChange={handleProductChange}>
                        <option value="">--Chọn loại sản phẩm--</option>
                        {productList.map((item, index) => (
                            <option key={index} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3" style={{marginLeft: '20px'}}>
                    <label htmlFor="search" className="form-label">Tên sản phẩm:</label>
                    <input type="text" className="form-control" id="search"
                           value={search} onChange={handleSearchChange}/>
                </div>

                <div className="mb-3" style={{marginLeft: '20px', marginTop: '30px'}}>
                    <button className="btn btn-primary" onClick={handleSearchDate}>Tìm kiếm</button>
                </div>

            </div>

            <table className='table container'>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Mã đơn hàng</th>
                    <th>Tên sản phẩm</th>
                    <th>Loại sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                    <th>Ngày mua</th>
                    <th>Actior</th>
                </tr>
                </thead>
                <tbody>
                {
                    donhang?.map((item, index) => (
                        <tr key={index}>
                            <td>{stt++}</td>
                            <td>{item.id}</td>
                            <td>{item.products.name}</td>
                            <td>{item.products.type}</td>
                            <td>{item.number}</td>
                            <td>{item.products.price}</td>
                            <td>{Moment(item.buyDate).format("DD/MM/yyyy")}</td>
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
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    )
}

export default List;
