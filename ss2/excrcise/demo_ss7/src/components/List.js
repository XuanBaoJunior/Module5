    import * as Car from "../services/Car"
    import {useEffect, useState} from "react";
    import {NavLink} from "react-router-dom";
    import Moment from 'moment';
    import axios from "axios";

    function List() {
        const [cars, setCars] = useState([]);
        const [product, setProduct] = useState([]);
        const [selectedProduct, setSelectedProduct] = useState("");
        const [search, setSearch] = useState("");
        const [fromDate, setFromDate] = useState("");
        const [toDate, setToDate] = useState("");


        useEffect(() => {
            getAll();
            listCars();
        }, [])

        const getAll = async () => {
            const car = await Car.getAllCar();
            setProduct(car);
        }

        const handleProductChange = (e) => {
            setSelectedProduct(e.target.value);
        };

        const handleSearchChange = (e) => {
            setSearch(e.target.value);
        };

        const handleSearchDate = async () => {
            try {
                let temp = await axios.get(`http://localhost:8080/car?products.name_like=${search}&_sort=products.price`);
                let date = temp.data;
                const filterDate = date.filter((item) => {
                    return item.buyDate >= fromDate && item.buyDate <= toDate;
                })
                setCars(filterDate);
            } catch (e) {
                console.log(e);
            }
        }

        useEffect(() => {
            if (fromDate === "" || toDate === "") {
                listCars();
            } else {
                handleSearchDate();
            }
        }, [fromDate, toDate, search, selectedProduct]);

        const listCars = async () => {
            let temp = await Car.list(search, selectedProduct);
            setCars(temp);
        }

        return (
            <>
                <h1>Danh sách Car</h1>
                <NavLink to="/car/create" className="btn btn-primary container"
                         style={{width: '200px', marginLeft: '90px'}}>Thêm mới</NavLink>

                <div style={{display: 'flex', marginBottom: '20px'}}>
                    <div className="mb-3">
                        <label htmlFor="productTypes" className="form-label" style={{marginLeft: '90px'}}>Loại sản
                            phẩm:</label>
                        <select className="form-select" id="productTypes" aria-label="Default select example"
                                style={{width: '220px', marginLeft: '90px'}} onChange={handleProductChange}>
                            <option value="">--Chọn loại sản phẩm--</option>
                            {product.map((item, index) => (
                                <option key={index} value={item.name}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3" style={{marginLeft: '20px'}}>
                        <label htmlFor="search" className="form-label">Tìm kiếm:</label>
                        <input type="text" className="form-control" id="search" value={search}
                               onChange={handleSearchChange}/>
                    </div>
                    <div className="mb-3" style={{marginLeft: '20px'}}>
                        <label htmlFor="fromDate" className="form-label">Từ ngày:</label>
                        <input type="date" className="form-control" id="fromDate" value={fromDate}
                               onChange={(e) => setFromDate(e.target.value)}/>
                    </div>
                    <div className="mb-3" style={{marginLeft: '20px'}}>
                        <label htmlFor="toDate" className="form-label">Đến ngày:</label>
                        <input type="date" className="form-control" id="toDate" value={toDate}
                               onChange={(e) => setToDate(e.target.value)}/>
                    </div>
                </div>

                <table className='table container'>
                    <thead>
                    <tr>
                        <td>Mã xe</td>
                        <td>Name</td>
                        <td>Số lượng</td>
                        <td>Price</td>
                        <td>Ngày sản xuất</td>
                        <td>Mô tả</td>
                        <th>Actior</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cars.map((car, index) =>
                        <tr key={index}>
                            <td>{car.id}</td>
                            <td>{car.products.name}</td>
                            <td>{car.number}</td>
                            <td>{car.products.price}</td>
                            <td>{Moment(car.buyDate).format("DD/MM/yyyy")}</td>
                            <td>{car.mota}</td>
                            <td>
                                <button className="btn btn-warning"
                                >Sửa
                                </button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </>
        )
    }

    export default List;