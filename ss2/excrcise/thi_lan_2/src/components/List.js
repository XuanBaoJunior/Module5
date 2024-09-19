import {useEffect, useState} from "react";
import * as Orders from "../service/SanPham";


function List() {
    const [sanPham, setSanPham] = useState([]);
    const [theLoai, setTheLoai] = useState([]);
    const [selected, setSelected] = useState("");
    const [search, setSearch] = useState("");

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    useEffect(() => {
        ListTheLoai();
    }, [])

    const ListTheLoai = async () => {
        let temp = await Orders.listProductName();
        setTheLoai(temp);
    }

    const handleProductChange = (e) => {
        setSelected(e.target.value);
    };

    const handleSearchDate = async () => {
        try {
            let temp = await axios.get(`http://localhost:8080/sanpham?theloai.name_like=${search}&_sort=theloai.price`);
            let date = temp.data;
            const filterDate = date.filter((item) => {
                return item.buyDate >= fromDate && item.buyDate <= toDate;
            })
            setSanPham(filterDate);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (fromDate === "" || toDate === "") {
            ListSanPham();
        } else {
            handleSearchDate();
        }
    }, [fromDate, toDate, search, selected]);

    const ListSanPham = async () => {
        let temp = await Orders.listProductName();
        setSelected(temp);
    }

    // const handleProductChange = (e) => {
    //     setSelected(e.target.value);
    // };
    //
    // const handleSearchDate = async () => {
    //     try {
    //         let temp = await axios.get(`http://localhost:8080/donhang?products.name_like=${search}&_sort=products.price`);
    //         let date = temp.data;
    //         const filterDate = date.filter((item) => {
    //             return item.buyDate >= fromDate && item.buyDate <= toDate;
    //         })
    //         setDonhang(filterDate);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
}