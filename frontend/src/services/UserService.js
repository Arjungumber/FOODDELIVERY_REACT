import axios from 'axios';

export const getUser = () =>
localStorage.getItem('user')
? JSON.parse(localStorage.getItem('user'))
: null;
// this function will give us javascript object of user.


export const login = async (email,password) => {
    const {data} = await axios.post('api/users/login',{email,password});
    localStorage.setItem('user',JSON.stringify(data));
    return data;
} // this will gonna use in useAuth hook
// we'r making a post method becz we defined our router on the server as post method, so the method of the caller and the api should be same 

export const register = async registerData =>{
    const {data} = await axios.post('api/users/register', registerData);
   localStorage.setItem('user',JSON.stringify(data));
   return data;
} //this we gonna use in useAuth hook

export const logout = () =>{
    localStorage.removeItem('user');
}

export const updateProfile = async user =>{
    const {data} = await axios.put('/api/users/updateProfile',user);
    localStorage.setItem('user',JSON.stringify(data));
    return data;
}

export const changePassword = async passwords =>{
    await axios.put('/api/users/changePassword',passwords);
}
