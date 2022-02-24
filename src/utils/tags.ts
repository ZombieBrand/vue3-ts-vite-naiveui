// 不保存tags路由地址
const whiteList = ["/login", "/404", "/401"];

/**
 * 是否保存到tagsViewList
 * @param path
 */
export function isTags(path: string) {
  return !whiteList.includes(path);
}
