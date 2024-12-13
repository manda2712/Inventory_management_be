const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt');

const userRepository = require('./auth.repository');

function generateToken(user) {
    return jwt.sign({userId: user.id, username:user.username, email: user.email, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1hr'})
    
}

async function register(username, email, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            username,
            email,
            password: hashedPassword,
            role: "USER",
        };
    const newUser = await userRepository.createUser(user);
    return newUser;
    } catch (error) {
        throw new Error('Failed to register user');
    }
}

async function login(username, password) {
    const user = await userRepository.findUserByUsername(username)

    if (!user) {
        throw new Error("invalid username and password");
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
        throw new Error("invalid username or password");
    }
    const token = generateToken(user)
    return {user, token}
    
}

module.exports = { register, login };