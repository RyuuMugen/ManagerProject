import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosError,
} from "axios";

import { start } from "repl";
import { json, useNavigate } from "react-router-dom";
import { isNullOrEmpty } from "../extension/StringExtension";
import { Delay } from "./FunctionHelper";
import { NotificationExtension } from "../extension/NotificationExtension";
import { modals } from "@mantine/modals";

class Repository {
  private axiosInstance: AxiosInstance;
  constructor(baseURL?: string) {
    if (isNullOrEmpty(baseURL)) throw Error("Lỗi base url env !");
    this.axiosInstance = axios.create({
      baseURL,
    });
  }

  public async get<T = any>(url: string, config?: AxiosRequestConfig) {
    await Delay(1000);
    try {
      var res = await this.axiosInstance.get<T>(url, config);
      return res.data;
    } catch (error: any) {
      await this.HanderResponse(error);
      return null;
    }
  }

  public async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) {
    await Delay(1000);
    try {
      var res = await this.axiosInstance.post<T>(url, data, config);
      return res.data;
    } catch (error: any) {
      await this.HanderResponse(error);
      return null;
    }
  }

  private async HanderResponse(res: any) {
    const currentURL = window.location.pathname;
    if (res.code === "ERR_NETWORK")
      NotificationExtension.Fails("Máy chủ không thể kết nối !");
    switch (res.response?.status) {
      case 401:
        NotificationExtension.Fails("Xin vui lòng đăng nhập lại !");
        await Delay(1000);
        window.location.href = "/auth/login?callback=" + currentURL;
        modals.closeAll();
        break;
      case 404:
        throw new Response("Trang web không tồn tại !", {
          status: res.response?.status,
        });
      case 403:
        NotificationExtension.Fails(
          "Bạn không có quyền thực hiện chức năng này !"
        );
        modals.closeAll();
        break;
      case 500:
        NotificationExtension.Fails(
          res?.response?.data?.message ??
            "Có lỗi xảy ra ở máy chủ, xin vui lòng thử lại !"
        );
        modals.closeAll();
        break;
      default:
        break;
    }
  }
}

export default Repository;

// axios.get<MessageResponse<T>>('http://localhost:5005/api/v1/WareHouses/get-list?Skip=1&Take=11') // Thay URL bằng URL API thực tế
//   .then(response => {
//     console.log(response.data); // Xử lý dữ liệu ở đây
//   })
//   .catch(error => {
//     console.error('There was a problem with the request:', error);
//   });
