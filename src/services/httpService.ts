import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_URL } from '@env';

class HttpService {
  private api: AxiosInstance;
  private token: string | null;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.token = null;

    this.api.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        this.handleError(error);
        return Promise.reject(error);
      },
    );
  }

  setToken(token: string) {
    this.token = token;
    this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  private async makeRequest<T>(
    method: AxiosRequestConfig['method'],
    url: string,
    body?: any,
    params?: Record<string, any>,
  ): Promise<T> {
    try {
      const config: AxiosRequestConfig = {
        method,
        url: this.api.defaults.baseURL + url,
        data: body,
        params,
      };

      console.log(method, url, params, body);

      const response: AxiosResponse<T> = await this.api.request<T>(config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    return this.makeRequest<T>('GET', url, undefined, params);
  }

  async post<T, B>(url: string, body?: B): Promise<T> {
    return this.makeRequest<T>('POST', url, body);
  }

  async put<T, B>(url: string, body?: B): Promise<T> {
    return this.makeRequest<T>('PUT', url, body);
  }

  async patch<T, B>(url: string, body?: B): Promise<T> {
    return this.makeRequest<T>('PATCH', url, body);
  }

  async delete<T>(url: string): Promise<T> {
    return this.makeRequest<T>('DELETE', url);
  }

  private handleError(error: any): void {
    if (error.response) {
      console.error('Error Response:', error.response.data);
    } else if (error.request) {
      console.error('Error Request:', error.request);
    } else {
      console.error('General Error:', error.message);
    }
  }
}

export const httpService = new HttpService(API_URL);
