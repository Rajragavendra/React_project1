import axios from 'axios'

const userApi = axios.create({
    baseURL:'http://localhost:5000',
    Headers:{
        'content-Type':'application/json'
    } 
});

export const getUser = async() => {
    try {
        const response = await userApi.get('/data');
        return response?.data;
    } catch (error) {
        return error?.response?.data || error?.data;
    }
}

export const getmydata=async(id)=>{
        const response =await userApi.get(`user/${id}`);
        return response?.data;
    
}

export const updateData=async(id,values)=>{
    const response=await userApi.put(`user/${id}`,values);
    return response?.data;
}





