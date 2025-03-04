# Welcome to near-protocol-project
to run the backend
clone this repo 

then get eliza AI agent `git clone https://github.com/elizaOS/eliza/`

rename eliza to NURA `NURA-controller`

move NURA into 

`cd NURA-controller`

`node index.js or npm run start`

to run the front end navigate to the frontend directory 
`cd near-frontend/`

create .env file

add the following to the .env file

`VITE__BACKEND_URL = <url to your running NURA-controller>` 

`VITE__PROJECT_ID = reown Appkit project id` for walletconnect integration

Get your projectId at `https://cloud.reown.com`

then run

`npm install`
` npm run dev`

open `http://localhost:5173` in your browser
