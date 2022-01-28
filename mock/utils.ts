import Mock from "mockjs";

export function resultSuccess(result: object, { message = "ok" } = {}) {
  return Mock.mock({
    code: 200,
    result,
    message,
    type: "success",
  });
}
export function resultError(
  message = "Request failed",
  { code = -1, result = null } = {}
) {
  return {
    code,
    result,
    message,
    type: "error",
  };
}
