import jwt_decode from 'jwt-decode';


export const tokenVerify = () => { 
    let token = localStorage.getItem("token");
    if(!token) return false;
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000; // Get current time in seconds
    if (decoded.exp > currentTime) return true;
    else return false;
}