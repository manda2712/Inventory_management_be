const prisma = require("../db")

async function createTransaction(userId, itemId, quantityBorrowed) {
    try {
        const newTransaction = await prisma.transaction.create({
            data:{
                userId,
                itemId,
                quantityBorrowed,
                status: "PENDING"
            }
        })
        return newTransaction
    } catch (error) {
        throw new Error("Failed to create transaction");  
    }   
}

async function findTransaction() {
    try {
        const transaction = await prisma.transaction.findMany({
            include:{
                item:{
                    select:{
                        name: true
                    }
                }
            }
        });
        return transaction
    } catch (error) {
        throw new Error("Failed to fetch transaction");  
    }  
}

async function findTransactionByUserId(userId) {
    try {
        const transaction = await prisma.transaction.findMany({
            where:{
                userId: parseInt(userId)
            },
            include:{
                item:{
                    select:{
                        name: true
                    }
                }
            }
        })
        return transaction
    } catch (error) {
        throw new Error("failed to fetch transaction By User Id");
    }  
}
async function findTransactionById(id) {
    const transaction = await prisma.transaction.findUnique({
        where:{
            id: parseInt(id)
        }
    })
    return transaction   
}

async function updateTransactionStatus(transactionId, status, timeStampFiled) {
    try {
        const updatadeData ={
            status,
        }

        if (timeStampFiled){
            updatadeData[timeStampFiled] = new Date();  
        }
        await prisma.transaction.update({
            where:{
                id: parseInt(transactionId)
            },
            data: updatadeData,
        })
    } catch (error) {
        throw new Error("failed to update transaction"); 
    }  
}


module.exports ={
    createTransaction,
    findTransaction,
    findTransactionByUserId,
    findTransactionById,
    updateTransactionStatus,
}