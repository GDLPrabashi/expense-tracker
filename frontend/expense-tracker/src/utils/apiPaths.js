export const BASE_URL = 'http://localhost:8000';

//utilis/apiPaths.js
export const API_PATHS ={
AUTH :{
    LOGIN : "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    GET_USER_INFO: "/api/v1/auth/logout"
},
DASHBOARD:{
    GET_DATA:"/api/v1/dashboard"
},
INCOME:{
    ADD_INCOME:"/api/v1/income/add-income",
    GET_INCOME:"/api/v1/income/get-income",
    DELETE_INCOME:(incomeId)=> `/api/v1/income/${incomeId}`,
    DOWNLOAD_INCOME:"/api/v1/income/download-income"
},
EXPENSE:{
    ADD_EXPENSE:"/api/v1/expense/add-expense",
    GET_EXPENSE:"/api/v1/expense/get-expense",
    DELETE_EXPENSE:(expenseId) =>`/api/v1/expense/${expenseId}`,
    DOWNLOAD_EXPENSE:"/api/v1/expense/download-expense"
},
IMAGE :{
    UPLOAD_IMAGE:"/api/v1/image/upload-image",
    
}
}