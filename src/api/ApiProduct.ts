import { AxiosResponse } from 'axios';
import api from '../library/axios';
import { API_ROUTE } from '../const/apiRoute';
import { HanderResponse } from '../_base/helper/FunctionHelper';

export const getDataListProduct = async (query: string): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get(API_ROUTE.GET_LIST_PRODUCT + query);
    return response.data;
  } catch (error) {
    HanderResponse(error)
  }
};

export const createItemProduct = async (data:any): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post(API_ROUTE.CREATE_PRODUCT,data);
    return response.data;
  } catch (error) {
    HanderResponse(error)
  }
};

export const deleteItemProduct = async (data:any): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post(API_ROUTE.DELETE_PRODUCT,data);
    return response.data;
  } catch (error) {
    HanderResponse(error)
  }
};

export const modifyItemProduct = async (data:any): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post(API_ROUTE.MODIFY_PRODUCT,data);
    return response.data;
  } catch (error) {
    HanderResponse(error)
  }
};