import axios, { AxiosInstance } from "axios";

class Api {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  readonly getLocations = async ({
    name,
    region,
    country,
  }: {
    name?: string;
    region?: string;
    country?: string;
  }) => {
    try {
      const queryObject: { name?: string; region?: string; country?: string } =
        {};

      if (name) {
        queryObject.name = name;
      }

      if (region) {
        queryObject.region = region;
      }

      if (country) {
        queryObject.country = country;
      }

      const response = await this.axiosInstance.get("/locations/", {
        params: queryObject,
      });

      return response;
    } catch (error: any) {
      throw error.response;
    }
  };
}

const api = new Api();

export default api;
