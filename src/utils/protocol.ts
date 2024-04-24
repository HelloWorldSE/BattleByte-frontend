import axios from "axios";

export const protocol = axios.create({
    baseURL: "http://81.70.241.166/submit/api/submission",
    headers: {
        "Content-Type": "application/json",
        "X-Csrftoken":"vLH0iNGPu4ufpc9Lk1ekq5VmshkEM6a2aw6FGvxFZxz29Lqat88S4vfiHjQnNoV2",
        "Access-Control-Allow-Origin":"*"
    },
    withCredentials: true
});


// 导出 Axios 实例
export default protocol;
