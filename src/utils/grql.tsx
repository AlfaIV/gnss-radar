import axios from "axios";

const ip = "localhost";
// const ip = "85.198.109.43";
const endpoint = `http://${ip}:1000/query`;

const grqlFetch = async (query: any) => {
  const response = await axios.post(endpoint, {
    query: query,
    operationName: "Authorization",
  }, {
    headers: {
      accept: "application/json, multipart/mixed",
      "accept-language": "ru,en;q=0.9",
      "content-type": "application/json",
      "sec-ch-ua": '"Not?A_Brand";v="8", "Chromium";v="108", "Yandex";v="23"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Linux"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
    },
  });

  return response.data;
};

export default grqlFetch;