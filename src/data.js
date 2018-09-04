const url = "/temperatures";

export default async () => {
  const res = await fetch(url);
  const json = await res.json();

  let array = [];
  json.temperatures.map(item =>
    array.push({ time: dateFromObjectId(item._id), temp: item.temp })
  );
  console.log(array);
  return array;
};

const dateFromObjectId = function(objectId) {
  return new Date(parseInt(objectId.substring(0, 8), 16) * 1000).toGMTString();
};
