import axios, { AxiosRequestConfig } from "axios";
import { TOKEN } from "@/constant";
import { getItem } from "@/utils/storage";
import type { TCustomOptions } from "@/types/request";
import type { TMessageType } from "@/types/message";
import { isCheckTimeout } from "@/utils/auth";
import { useUserStore } from "@/store/modules/user";
import { setGlobalOptions } from "vue-request";
import { getLanguage } from "@/utils";
setGlobalOptions({
  manual: true,
});
const pendingMap = new Map();
const LoadingInstance = {
  _count: 0,
};

function myAxios(axiosConfig: AxiosRequestConfig, customOptions?: any) {
  const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API as string, // 设置统一的请求前缀
    timeout: 10000, // 设置统一的超时时长
  });

  // 自定义配置
  const custom_options: TCustomOptions = Object.assign(
    {
      repeat_request_cancel: true, // 是否开启取消重复请求, 默认为 true
      loading: false, // 是否开启loading层效果, 默认为false
      reduct_data_format: true, // 是否开启简洁的数据结构响应, 默认为true
      error_message_show: true, // 是否开启接口错误信息展示,默认为true
      code_message_show: true, // 是否开启code不为200时的信息提示, 默认为false
    },
    customOptions
  );

  // 请求拦截
  service.interceptors.request.use(
    (config) => {
      removePending(config);
      custom_options.repeat_request_cancel && addPending(config);
      // 创建loading实例
      if (custom_options.loading) {
        LoadingInstance._count++;
        if (LoadingInstance._count === 1) {
          window.$loading.start();
        }
      }
      // 自动携带token
      if (getItem(TOKEN) && typeof window !== "undefined") {
        if (isCheckTimeout()) {
          const userStore = useUserStore();
          userStore.loginOut();
          window.$message("error", "token失效");
          return Promise.reject(config);
        }
        // @ts-ignore
        config.headers["Authorization"] = `Bearer ${getItem(TOKEN)}`;
      }
      // @ts-ignore
      config.headers["Accept-Language"] = getLanguage();
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 响应拦截
  service.interceptors.response.use(
    (response) => {
      removePending(response.config);
      custom_options.loading && closeLoading(custom_options, true); // 关闭loading
      if (
        custom_options.code_message_show &&
        response.data &&
        response.data.code === 0
      ) {
        window.$message("success", response.data.message);
      } else {
        if (response.data.code === -1) {
          window.$message("error", response.data.message);
          return Promise.reject(response.data);
        }
        custom_options.error_message_show && httpSuccessStatusHandle(response); // 处理错误状态码
        return Promise.reject(response.data); // code不等于200, 页面具体逻辑就不执行了
      }

      return custom_options.reduct_data_format ? response.data : response;
    },
    (error) => {
      error.config && removePending(error.config);
      custom_options.loading && closeLoading(custom_options, false); // 关闭loading
      custom_options.error_message_show && httpErrorStatusHandle(error); // 处理错误状态码
      return Promise.reject(error); // 错误继续返回给到具体页面
    }
  );

  return service(axiosConfig);
}

export default myAxios;

/**
 * 处理异常
 * @param {*} error
 */
function httpErrorStatusHandle(error: any) {
  const userStore = useUserStore();
  // 处理被取消的请求
  if (axios.isCancel(error)) {
    return console.error("请求的重复请求：" + error.message);
  }
  let message = "";
  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        message = "接口重定向了！";
        break;
      case 400:
        message = "参数不正确！";
        break;
      case 401:
        message = "您未登录，或者登录已经超时，请先登录！";
        userStore.loginOut();
        break;
      case 403:
        message = "您没有权限操作！";
        break;
      case 404:
        message = `请求地址出错: ${error.response.config.url}`;
        break; // 在正确域名下
      case 408:
        message = "请求超时！";
        break;
      case 409:
        message = "系统已存在相同数据！";
        break;
      case 500:
        message = "服务器内部错误！";
        break;
      case 501:
        message = "服务未实现！";
        break;
      case 502:
        message = "网关错误！";
        break;
      case 503:
        message = "服务不可用！";
        break;
      case 504:
        message = "服务暂时无法访问，请稍后再试！";
        break;
      case 505:
        message = "HTTP版本不受支持！";
        break;
      default:
        message = "异常问题，请联系管理员！";
    }
  }
  if (error.message.includes("timeout")) {
    message = "网络请求超时！";
  }
  if (error.message.includes("Network")) {
    message = window.navigator.onLine ? "服务端异常！" : "您断网了！";
  }
  window.$message("error", message);
}

/**
 * http成功,业务状态提示处理
 * @param response
 */

function httpSuccessStatusHandle(response: any) {
  let message = "";
  let messageStatus: TMessageType = "success";
  const userStore = useUserStore();
  switch (response.data.code) {
    case 401:
      userStore.loginOut();
      message = "账户在其他设备登陆!";
      messageStatus = "warning";
      break;
    default:
      message = `异常问题${response.data.code}，请联系管理员！`;
      messageStatus = "error";
  }
  window.$message(messageStatus, message);
}
/**
 * 关闭Loading层实例
 * @param {*} _options
 * @param type
 */
function closeLoading(_options: TCustomOptions, type: boolean) {
  if (_options.loading && LoadingInstance._count > 0) LoadingInstance._count--;
  if (LoadingInstance._count === 0) {
    type ? window.$loading.finish() : window.$loading.error();
  }
}

/**
 * 储存每个请求的唯一cancel回调, 以此为标识
 * @param {*} config
 */
function addPending(config: AxiosRequestConfig) {
  const pendingKey = getPendingKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel);
      }
    });
}

/**
 * 删除重复的请求
 * @param {*} config
 */
function removePending(config: AxiosRequestConfig) {
  const pendingKey = getPendingKey(config);
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey);
    // 如你不明白此处为什么需要传递pendingKey可以看文章下方的补丁解释
    cancelToken(pendingKey);
    pendingMap.delete(pendingKey);
  }
}

/**
 * 生成唯一的每个请求的唯一key
 * @param {*} config
 * @returns
 */
function getPendingKey(config: AxiosRequestConfig) {
  const { url, method, params } = config;
  let { data } = config;
  if (typeof data === "string") data = JSON.parse(data); // response里面返回的config.data是个字符串对象
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join("&");
}
