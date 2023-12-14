import { AxiosResponse } from "axios";
import api from "../library/axios";
import { API_ROUTE } from "../const/apiRoute";
import { HanderResponse } from "../_base/helper/FunctionHelper";



export const getDataMegaMenu = async (query: string): Promise<any> => {
    try {
      const response: AxiosResponse = await api.get(API_ROUTE.GET_LIST_CATEGORY + query);
      return response.data;
    } catch (error) {
      HanderResponse(error)
    }
  };

  export const deleteItemCategory = async (data:any): Promise<any> => {
    try {
      const response: AxiosResponse = await api.post(API_ROUTE.DELETE_CATEGORY,data);
      return response.data;
    } catch (error) {
      HanderResponse(error)
    }
  };

  export const createItemCategory = async (data:any): Promise<any> => {
    try {
      const response: AxiosResponse = await api.post(API_ROUTE.CREATE_CATEGORY,data);
      return response.data;
    } catch (error) {
      HanderResponse(error)
    }
  };
  
  export const modifyItemCategory = async (data:any): Promise<any> => {
    try {
      const response: AxiosResponse = await api.post(API_ROUTE.MODIFY_CATEGORY,data);
      return response.data;
    } catch (error) {
      HanderResponse(error)
    }
  };