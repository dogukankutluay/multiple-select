// Axios
import axios, { AxiosResponse, AxiosInstance } from "axios";

// Interface
import { CharacterInterace } from "../interfaces";

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Services
async function get(query: string): Promise<CharacterInterace[]> {
  try {
    const response: AxiosResponse<{ results: CharacterInterace[] }> =
      await axiosInstance.get(`/character/?name=${query}`);

    return response.data.results;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default {
  get,
};
