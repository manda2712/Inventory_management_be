const { insertItem, findItems, findItemById, editItem, deletItem } = require("./item.repository")

async function createItem(newItemData) {
    const newItem = await insertItem(newItemData)
    return newItem   
}

async function getAllItem() {
    const item = await findItems();
    return item;
    
}

async function getItemById(id) {
    const item = await findItemById(id)
    if (!item) {
        throw new Error("item not found");   
    }
    return item
    
}

async function editItembyId(id, itemData) {
    await getItemById(id);
    const updateItem = await editItem(id, itemData)
    return updateItem
    
}

async function deletItemById(id) {
    await getItemById(id);
    await deletItem(id);    
}

module.exports = {
    createItem,
    getAllItem,
    getItemById,
    editItembyId,
    deletItemById
}

//code amanda