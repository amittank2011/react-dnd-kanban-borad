import axios from "axios";

export const fetchInstance = axios.create();

export default function api({
  request,
  method = "get",
  data = null,
  token = false,
  headerOptions = {},
  others = {},
}) {
  const url = `${process.env.NEXT_MOCK_API_URL}/${request}`;

  const options = {
    url,
    method,
    data,
    ...{
      headers: {
        ...headerOptions,
      },
      ...others,
    },
  };

  console.log("API call", options);

  return new Promise((resolve, reject) => {
    fetchInstance(options)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        if (!error.data) {
          error.data = { message: error.message };
        }
        reject(error);
      });
  });
}
