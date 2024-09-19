import axios from "axios";

export const getAllCar = async (name) => {
    try {
        let result = await axios.get("http://localhost:8080/car?name_like=" + name);
        return result.data
    }catch (e){
        console.log(e)
    }
}

export const createCar = async (name) => {
    try {
        await axios.post("http://localhost:8080/car", name);
    }catch (e){
        console.log(e);
    }
}

export const listProduct = async () => {
    try {
        let temp = await  axios.get("http://localhost:8080/products");
        return temp.data;
    }catch (e){
        console.log(e);
    }
}

export const list = async (search, selectedProduct) => {
    try {
        let query = `?products.name_like=${search}&_sort=products.price&_order=desc`;
        if (selectedProduct) {
            query += `&products.name=${selectedProduct}`;
        }
        let temp = await axios.get(`http://localhost:8080/car${query}`);
        return temp.data;
    } catch (e) {
        console.log(e);
    }
};