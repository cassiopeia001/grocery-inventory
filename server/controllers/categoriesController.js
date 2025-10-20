const db = require('../db/queries');

async function getCategories (req, res){
    try {
        const categories= await db.getAllCategories();
        res.json(categories)
    }
    catch (err){
        console.log(err);
        res.status(500).json({error : `${err}`});
    }
}
async function getItems(req, res){
    try {
        const {category_id}= req.params;
        const rows = await db.getCategoryItems(category_id);
        console.log(category_id)
        res.json(rows)
    } catch (err){
        console.log(err);
        res.status(500).json({error :`${err}`});
    }
}
async function getCategory(req, res){
    try{

        const { category_id }= req.params
        const name= await db.getCategoryName(category_id);
        res.json(name);
    } catch(err) {
        console.log(err);
        res.status(500).json({error: err});
    }
}
async function addCategoryPost(req, res){
    try {

        const { name } = req.body;
        const  newCategory  = await db.insertCategory(name);
        res.json(newCategory)
    } catch (err){
        console.log(err);
        res.status(500).json({error :`${err}`});
    }
}
async function addItemPost(req, res){
    try {

        const { name, price, quantity, unit }= req.body;
        const { category_id } = req.params;
        console.log(category_id);
        const  newItem  = await db.insertItem(name, price, quantity, unit, category_id);
        res.json(newItem)
    } catch (err) {
        console.log(err);
        res.status(500).json({error :`${err}`});
    }
}
async function updateCategory(req, res){
    try {
        const { name }= req.body;
        const { category_id } = req.params;
        const row = await db.updateCategory(category_id, name);
        res.json(row);

    } catch  (err){
        console.log(err);
        res.status(500).json({error : `${err}`});
    }
}
async function updateItem (req, res){
    try {
        const { name, price, quantity, unit }= req.body;
        const { item_id } = req.params;
        const row = await db.udpateItem(item_id, name, price, quantity, unit);
        res.json(row);

    } catch  (err){
        console.log(err);
        res.status(500).json({error : `${err}`});
    }
}
async function deleteCategory(req, res){
    try {
        const { category_id } = req.params;
        const rowCount= await db.deleteCategory(category_id);
        if (rowCount === 0){
            res.status(500).end()
        }
        res.status(204).end()
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
}
async function deleteItem(req, res){
    try {
        const { item_id } = req.params;
        const rowCount = await db.deleteItem(item_id);
        if (rowCount === 0) {
           res.status(500).end()
        }
        else {
            res.status(204).end()
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({error : err})
    }
}
module.exports ={
    getCategories,
    getItems,
    addCategoryPost,
    addItemPost,
    updateCategory,
    updateItem,
    deleteCategory,
    getCategory,
    deleteItem
}