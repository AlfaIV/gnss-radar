import axios from "axios";

const ip = "localhost";
// const ip = "85.198.109.43";
const endpoint = `http://${ip}:1000/query/`;

const grqlFetch = async (query: any) => {
  const response = await axios({
    url: endpoint,
    method: "POST",
    data: {
      query: query,
    },
  });
  return response.data;
};

export default grqlFetch;