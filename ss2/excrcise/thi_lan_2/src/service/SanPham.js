import axios from "axios";

export const list = async (search, selectedProduct) => {
    try {
        let query = `?theloai.name_like=${search}&_sort=theloai.price&_order=desc`;
        if (selectedProduct) {
            query += `&theloai.name=${selectedProduct}`;
        }
        let temp = await axios.get(`http://localhost:8080/sanpham${query}`);
        return temp.data;
    } catch (e) {
        console.log(e);
    }
};

export const listProductName = async () => {
    try {
        let temp = await  axios.get("http://localhost:8080/theloai");
        return temp.data;
    }catch (e){
        console.log(e);
    }
}

export const create = async (value) => {
    try {
        await axios.post("http://localhost:8080/sanpham", value);
    }catch (e){
        console.log(e);
    }
}