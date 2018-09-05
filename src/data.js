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
  const actualDate = new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
  return `${new Date(actualDate).toLocaleDateString("de-DE", {
    weekday: "long"
  })}, ${(actualDate.getHours() < 10 ? "0" : "") +
    actualDate.getHours()}:${(actualDate.getMinutes() < 10 ? "0" : "") +
    actualDate.getMinutes()} Uhr`;
};
