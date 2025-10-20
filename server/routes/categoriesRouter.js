const { Router } = require ('express');
const categoriesRouter= Router();
const {getCategories, getItems, addCategoryPost, addItemPost, updateCategory, updateItem, deleteCategory, getCategory, deleteItem}= require('../controllers/categoriesController');



categoriesRouter.get('/', getCategories);
categoriesRouter.get('/:category_id', getCategory);
categoriesRouter.get('/:category_id/items', getItems);

categoriesRouter.post('/', addCategoryPost);
categoriesRouter.post('/:category_id/items', addItemPost);

categoriesRouter.put('/:category_id', updateCategory);
categoriesRouter.put('/:category_id/items/:item_id', updateItem);

categoriesRouter.delete('/:category_id', deleteCategory);
categoriesRouter.delete('/:category_id/items/:item_id', deleteItem);


module.exports= categoriesRouter;