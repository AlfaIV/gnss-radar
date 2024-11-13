import axios from "axios";


const ip = "85.198.109.43";
const endpoint = `http://${ip}:1000/query`;

const grqlFetch = async (query: string) => {
  try {
    const response = await axios.post<string>(
      endpoint,
      { query },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Ошибка:", error.response?.data);
    } else {
      console.error("Ошибка:", error);
    }
  }
};

export default grqlFetch;
