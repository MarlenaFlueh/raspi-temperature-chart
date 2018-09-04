const url = "https://raspi-temperature.herokuapp.com";

export default async () => {
  const res = await fetch(url);
  const json = await res.json();

  return json.map(item => ({
    time: dateFromObjectId(item._id),
    temp: item.temp
  }));
};

const dateFromObjectId = objectId => {
  return new Date(parseInt(objectId.substring(0, 8), 16) * 1000).toGMTString();
};
