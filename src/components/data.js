import moment from "moment";
import axios from "axios";

const tempApi = "https://raspi-temperature.herokuapp.com";
const commentApi = "https://commentary-api.herokuapp.com/";

export const tempData = async () => {
  const res = await fetch(tempApi);
  const json = await res.json();

  return json.map(item => ({
    time: dateFromObjectId(item._id, "LT"),
    temp: item.temp,
    id: item._id
  }));
};

export const sendCommentary = async commentary => {
  const res = await axios.post(commentApi, {
    comment: commentary
  });
  return res.data;
};

export const commentaryData = async () => {
  const res = await fetch(commentApi);
  const json = await res.json();

  return json.map(item => ({
    time: dateFromObjectId(item._id, "ll"),
    comment: item.comment,
    id: item._id
  }));
};

const dateFromObjectId = (objectId, format) => {
  const actualDate = new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
  return moment(actualDate).format(format);
};
