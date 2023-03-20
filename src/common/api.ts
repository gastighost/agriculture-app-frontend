import Router from "next/router";
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

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");

          Router.push("/login/");
        }
        return Promise.reject(error);
      }
    );
  }

  readonly signup = async (formData: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await this.axiosInstance.post(
        "/users/signup/",
        formData
      );

      return response;
    } catch (error: any) {
      throw error.response;
    }
  };

  readonly login = async (formData: { username: string; password: string }) => {
    try {
      const response = await this.axiosInstance.post("/users/login/", formData);

      localStorage.setItem("token", response.data.token);

      return response;
    } catch (error: any) {
      throw error.response;
    }
  };

  readonly getProfile = async () => {
    try {
      const response = await this.axiosInstance.get("/users/profile/");

      return response;
    } catch (error: any) {
      throw error.response;
    }
  };

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

  readonly createLocation = async (formData: {
    name: string;
    region: string;
    country: string;
  }) => {
    try {
      const response = await this.axiosInstance.post("/locations/", formData);

      return response;
    } catch (error: any) {
      throw error.response;
    }
  };

  readonly getLocation = async (locationId: string) => {
    try {
      const response = await this.axiosInstance.get(`/locations/${locationId}`);

      return response;
    } catch (error: any) {
      throw error.response;
    }
  };

  readonly editLocation = async (
    locationId: string,
    formData: { name?: string; region?: string; country?: string }
  ) => {
    try {
      const response = await this.axiosInstance.patch(
        `/locations/${locationId}`,
        formData
      );

      return response;
    } catch (error: any) {
      throw error.response;
    }
  };

  readonly getFarms = async ({
    name,
    locationId,
    userId,
  }: {
    name?: string;
    locationId?: string;
    userId?: string;
  }) => {
    try {
      const queryObject: {
        name?: string;
        locationId?: string;
        userId?: string;
      } = {};

      if (name) {
        queryObject.name = name;
      }

      if (locationId) {
        queryObject.locationId = locationId;
      }

      if (userId) {
        queryObject.userId = userId;
      }

      const response = await this.axiosInstance.get("/farms/", {
        params: queryObject,
      });

      return response;
    } catch (error: any) {
      throw error.response;
    }
  };

  readonly createFarm = async (
    locationId: string,
    formData: { name: string; areaSize: number }
  ) => {
    try {
      const response = await this.axiosInstance.post(
        `/farms/${locationId}`,
        formData
      );

      return response;
    } catch (error: any) {
      throw error.response;
    }
  };

  readonly getFarm = async (farmId: string) => {
    try {
      const response = await this.axiosInstance.get(`/farms/${farmId}`);

      return response;
    } catch (error: any) {
      throw error.response;
    }
  };

  readonly updateFarmWeather = async (
    farmId: string,
    formData: {
      date: string;
      temperature: number;
      humidity: number;
      rainfall: number;
    }
  ) => {
    try {
      const response = await this.axiosInstance.patch(
        `/farms/${farmId}/add-weather`,
        { ...formData, date: new Date(formData.date).toISOString() }
      );

      return response;
    } catch (error: any) {
      throw error.response;
    }
  };

  readonly updateFarmSoil = async (
    farmId: string,
    formData: {
      date: string;
      pH: number;
      moisture: number;
      fertility: number;
    }
  ) => {
    try {
      const response = await this.axiosInstance.patch(
        `/farms/${farmId}/add-soil`,
        {
          ...formData,
          date: new Date(formData.date).toISOString(),
        }
      );

      return response;
    } catch (error: any) {
      throw error.response;
    }
  };
}

const api = new Api();

export default api;
