import axios from 'axios';


export const listClothes = async (search, productType) => {
    try {
        let query = `http://localhost:8080/quanAo?_sort=name&_order=asc`;

        if (search) {
            query += `&name_like=${search}`;
        }
        if (productType) {
            query += `&products.type=${productType}`;
        }

        let temp = await axios.get(query);
        return temp.data;
    } catch (err) {
        console.log(err);
    }
};

export const listProductTypes = async () => {
    try {
        let temp = await axios.get("http://localhost:8080/products");
        return temp.data;
    } catch (err) {
        console.log(err);
    }
};

// export const getClothesById = async (id) => {
//     try {
//         const response = await axios.get(`http://localhost:8080/quanAo/${id}`);
//         return response.data;
//     } catch (err) {
//         console.log(err);
//     }
// };

// export const updateClothes = async (id, updatedData) => {
//     try {
//         await axios.put(`http://localhost:8080/quanAo/${id}`, updatedData);
//     } catch (err) {
//         console.log(err);
//     }
// };

