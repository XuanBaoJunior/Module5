import axios from "axios";

// export const list = async (search) => {
//     try {
//         let temp = await axios.get(`http://localhost:8080/donhang?products.name_like=${search}&_sort=products.price&_order=desc`)
//         return temp.data;
//     }catch (e){
//         console.log(e);
//     }
// }

export const list = async (search, selectedProduct) => {
    try {
        let query = `?products.name_like=${search}&_sort=products.price&_order=desc`;
        if (selectedProduct) {
            query += `&products.name=${selectedProduct}`;
        }
        let temp = await axios.get(`http://localhost:8080/donhang${query}`);
        return temp.data;
    } catch (e) {
        console.log(e);
    }
};

export const listProductName = async () => {
    try {
        let temp = await  axios.get("http://localhost:8080/products");
        return temp.data;
    }catch (e){
        console.log(e);
    }
}

export const create = async (value) => {
    try {
        await axios.post("http://localhost:8080/donhang", value);
    }catch (e){
        console.log(e);
    }
}

export const deleteOrder = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/donhang/${id}`);
    } catch (e) {
        console.log(e);
    }
};