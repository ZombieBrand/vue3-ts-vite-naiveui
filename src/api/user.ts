import request from "@/utils/request";

export const getUserInfo = (data:any)=>{
    return request({
        url:'/getUserInfo',
        method:'post',
        data
    })
}