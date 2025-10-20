const express = require ('express');
const app = express();
const cors = require ('cors')
const categoriesRouter= require('./routes/categoriesRouter');

const PORT = 3000;

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/api/categories', categoriesRouter);

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}...`);
})