import express from 'express';
import WSserver from 'express-ws';


const app = express();
const PORT = process.env.PORT || 8000;


app.listen(PORT, () => console.log(`server started on port ${PORT}`))
