import axios from 'axios'

const ip = '85.198.109.43'
// const ip = "127.0.0.1";
const endpoint = `http://${ip}:1000/query`

const grqlFetch = async (query: string) => {
  try {
    const response = await axios.post<string>(
      endpoint,
      { query },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      //eslint-disable-next-line no-console
      console.error('Ошибка:', error.response?.data)
    } else {
      //eslint-disable-next-line no-console
      console.error('Ошибка:', error)
    }
  }
}

export default grqlFetch
