const prisma = require("../db");

async function insertUser(userData) {
    const newUser = await prisma.user.create({
        data : {
            username : userData.username,
            email : userData.email,
            password : userData.password,
            role : userData.role
        }
    });
    return newUser   
}

async function findUser() {
    const user = await prisma.user.findMany({
        select: {
            id: true,
            username : true,
            email : true,
            role : true,
            createdAt : true
        }
    });
    return user   
}

async function findUserById(id) {
    const user = await prisma.user.findUnique({
        where : {
            id: parseInt(id),
        },
        select :{
            id: true,
            username : true,
            email : true,
            role : true,
            createdAt : true
        }
    })
    return user;   
}

async function editUser(id, userData) {
    const updateUser = await prisma.user.update({
        where: {
            id : parseInt(id),
        },
        data: {
            username: userData.username,
            email: userData.email,
            password : userData.password,
            role : userData.role,
        }
    });
    return updateUser    
}
async function deleteUser(id) {
    await prisma.user.delete({
        where:{
            id: parseInt(id)
        }
    })
    
}
module.exports = {
    insertUser,
    findUser,
    findUserById,
    editUser,
    deleteUser
}