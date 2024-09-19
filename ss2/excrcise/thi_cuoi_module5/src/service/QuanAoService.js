import axios from "axios";

export const getAllAQ = async (name) => {
    try {
        let result = await axios.get("http://localhost:8080/quanAo?name_like=" + name);
        return result.data;
    } catch (e) {
        console.log(e);
    }
}

export const listProduct = async () => {
    try {
        let temp = await axios.get("http://localhost:8080/products");
        return temp.data;
    } catch (e) {
        console.log(e);
    }
}

export const list = async (search, selectedProduct) => {
    try {
        let query = `?name_like=${search}`;
        if (selectedProduct) {
            query += `&products.type=${selectedProduct}`;
        }
        query += `&_sort=number&_order=desc`; // Sort by number in descending order
        let temp = await axios.get(`http://localhost:8080/quanAo${query}`);
        return temp.data;
    } catch (e) {
        console.log(e);
    }
}

export const updateAQ = async (id, updatedData) => {
    let response = await fetch(`/api/quanao/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    });
    return await response.json();
};

export const getById = async (id) => {
    const response = await fetch(`/api/quanao/${id}`);
    return await response.json();
};
