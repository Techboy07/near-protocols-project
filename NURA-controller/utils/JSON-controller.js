const fs = require("fs/promises");

module.exports.updateData = function updateData(data, params) {
  const newData = { ...data };
  for (const key of Object.keys(params)) {
    newData[key] = params[key];
  }
  return newData;
};

// write the json to a specific file
module.exports.writeDataToFile = async function writeDataToFile(
  data,
  filename,
  path = "./"
) {
  const res = await fs
    .writeFile(`${path}/${filename}`, JSON.stringify(data))
    .then(() => `${path}/${filename}`);
  return res;
};

//writeDataToFile(data, "tolu.json", "./utils");
