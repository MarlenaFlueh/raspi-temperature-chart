export const tempData = [22, 24, 15, 13];

const url = "/temperatures";

fetch(url)
  .then(data => data.json())
  .then(res => {
    const tempArray = [];
    res.temperatures.map(res => tempArray.push(res.temp));
    console.log(tempArray);
  });
