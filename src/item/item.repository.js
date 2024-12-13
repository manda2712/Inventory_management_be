const prisma  = require("../db")

async function insertItem (itemData) {
    const newItem = await prisma.item.create({
        data: {
            name: itemData.name,
            description: itemData.description,
            quantity: itemData.quantity
        }
    })
    return newItem   
}

async function findItems() {
    const item = await prisma.item.findMany()
    return item   
}

async function findItemById(id) {
    const item = await prisma.item.findUnique({
        where: {
            id: parseInt(id),
        }
    })
    return item
    
}

async function editItem(id, itemData) {
    const updateItem = await prisma.item.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name : itemData.name,
            description : itemData.description,
            quantity : itemData.quantity

        }
    })
    return updateItem 
}

async function deletItem(id) {
    await prisma.item.delete({
        where: {
            id: parseInt(id)
        }
    })  
}

async function updateItemQuantity(itemId, newQuantity) {
    try {
        await prisma.item.update({
            where: {
                id: parseInt(itemId),
            },
            data: {
                quantity: newQuantity,
            },
        });
    } catch (error) {
        throw new Error("Failed to update item quantity");
    }
}

module.exports = {
    findItems,
    findItemById,
    insertItem,
    editItem,
    deletItem,
    updateItemQuantity,
};