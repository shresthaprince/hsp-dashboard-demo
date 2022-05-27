import axios from "axios";

const API_ENDPOINT = process.env["REACT_APP_API_ENDPOINT"];

const addQueryString = (customTime: number) => `?customTime=${customTime}`;

export const getHspSensorData = async (customTime?: number) => {
  const queryString = customTime ? addQueryString(customTime) : "";
  try {
    const res = await axios.get(`${API_ENDPOINT}/items${queryString}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getHspLatestSensorData = async (customTime?: number) => {
  const queryString = customTime ? addQueryString(customTime) : "";

  try {
    const res = await axios.get(`${API_ENDPOINT}/latest-data${queryString}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
