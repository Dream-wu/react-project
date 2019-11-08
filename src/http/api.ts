import service from "./index";
import Path from "./path";
import { resfulParamsToUrl } from "./resfulUrl";

export const logout = () => service.get(Path.logout); // 退出
export const menuList = (params: any) => service.get(resfulParamsToUrl(Path.menuList, params), { params });