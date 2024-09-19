import axios from "axios";

export const list = async (search) => {
    try {
        let temp = await axios.get(`http://localhost:8080/donhang?products.name_like=${search}&_sort=products.price&_order=desc`);
        return temp.data;
    } catch (err) {
        console.log(err);
    }
}

export const create = async (value) => {
    try {
        await axios.post("http://localhost:8080/donhang", value);
    } catch (err) {
        console.log(err);
    }
}

export const listProductName = async () => {
    try {
        let temp = await axios.get("http://localhost:8080/products");
        return temp.data;
    } catch (err) {
        console.log(err);
    }
}