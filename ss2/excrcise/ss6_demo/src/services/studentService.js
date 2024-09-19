import axios from "axios";

export const getAllStudent = async () => {
    try {
        const temp = await axios.get("http://localhost:3032/students");
        console.log(temp)
        return temp.data;
    }catch (e){
        console.log(e)
        return [];
    }
};

export const saveStudent = async (student) => {
    try {
        await axios.post("http://localhost:3032/students", student);
    }catch (e){
        throw new Error("không thể thêm mới");
    }
};

export const deleteStudent = async (id) => {
    try {
        await axios.delete(`http://localhost:3032/students/${id}`);
    }catch (e) {
        
    }
}