const pool = require ('./pool');

async function getAllCategories (){
    const { rows } = await pool.query ('SELECT * FROM categories');
    return rows;
}
async function getCategoryItems (id) {
    const { rows } = await pool.query('SELECT * FROM items WHERE category_id = $1', [id]);
    return rows;
}
async function getCategoryName(id){
    const result = await pool.query('SELECT name FROM categories WHERE id = $1', [id]);
    return result.rows[0]?.name;
}
async function insertCategory (name){
    const result = await pool.query('INSERT INTO categories (name) VALUES ($1) RETURNING *', [name]);
    return result.rows[0];
}
async function insertItem (name, price, quantity, unit, category_id){
    const result= await pool.query('INSERT INTO items (name, price, quantity, unit, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, price, quantity, unit, category_id]);
    return result.rows[0];
}
async function updateCategory(id, name){
    const result = await pool.query('UPDATE categories SET name = $1 WHERE id= $2 RETURNING *', [name, id]);
    return result.rows[0];
}
async function udpateItem (id, name, price, quantity, unit) {
    const result = await pool.query('UPDATE items SET name = $1, price= $2, quantity= $3, unit =$4 WHERE id= $5 RETURNING * ', [name, price, quantity, unit, id]);
    return result.rows[0];
}
async function deleteCategory(id){
    const result = await pool.query('DELETE FROM categories WHERE id= $1 RETURNING *',[id]);
    return result.rowCount;
}
async function deleteItem(id){
    const result = await pool.query('DELETE FROM items WHERE id= $1 ', [id]);
    return result.rowCount;
}

module.exports= {
    getAllCategories,
    getCategoryItems, 
    insertCategory,
    insertItem,
    updateCategory,
    udpateItem,
    deleteCategory,
    getCategoryName,
    deleteItem
}
