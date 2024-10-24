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
  }

  setToken(token: string) {
    this.token = token;
    this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  private async makeRequest<T>(
    method: AxiosRequestConfig['method'],
    url: string,
    body?: any,
  ): Promise<T> {
    try {
      const config: AxiosRequestConfig = {
        method,
        url: this.api.defaults.baseURL + url,
        data: body,
      };

      console.log(config.url, method);

      const response: AxiosResponse<T> = await this.api.request<T>(config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async get<T>(url: string): Promise<T> {
    return this.makeRequest<T>('get', url);
  }

  async post<T>(url: string, body?: any): Promise<T> {
    return this.makeRequest<T>('post', url, body);
  }

  async put<T>(url: string, body?: any): Promise<T> {
    return this.makeRequest<T>('put', url, body);
  }

  async patch<T>(url: string, body?: any): Promise<T> {
    return this.makeRequest<T>('patch', url, body);
  }

  async delete<T>(url: string): Promise<T> {
    return this.makeRequest<T>('delete', url);
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
