import request from "@/utils/request";

/**
 * 获取文章列表信息
 */
export const  getArticleList= () => {
    return request({
        url: "/article/list",
        method: "get",
    });
};