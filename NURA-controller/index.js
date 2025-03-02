const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");

const data = require("./utils/c3po.character.json"); // convert json to js object
const { updateData, writeDataToFile } = require("./utils/JSON-controller.js");

const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/", async (req, res) => {
  const params = req.body.params;
  const newData = updateData(data, params);
  //   check if there's a running process and kill it then restart
  const newFilePath = await writeDataToFile(newData, "char.json", path.join(__dirname, "NURA/characters"))

  if (newFilePath) {
    const targetDirectory = path.join(__dirname, "NURA"); // set the  target  directory

    
    const serverProcess1 = spawn("nvm", ["install", "23.3.0"], {
      stdio: "inherit",
      cwd: targetDirectory, // Set the current working directory
    });
    
    const serverProcess = spawn("npm", ["install", "-g", "pnpm@latest-10"], {
      stdio: "inherit",
      cwd: targetDirectory, // Set the current working directory
    });



    res.json({serverProcess, serverProcess1});
  }
});

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
