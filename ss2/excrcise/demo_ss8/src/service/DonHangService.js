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

export const deleteDonHang = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/donhang/${id}`);
    } catch (err) {
        console.log(err);
    }
};

export const getDonHangById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/donhang/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateDonHang = async (id, data) => {
    try {
        const response = await axios.put(`http://localhost:8080/donhang/${id}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
