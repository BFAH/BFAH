const jwt = require('jsonwebtoken');

const verify = (req, res, next) {
    const bearer = req.headers.authorization;

    if (!bearer) {
        res.status(401).send({message: "No token provided, NOT AUTHORIZED!"});
        return;
    }

    const [, token] = bearer.split(" ");

    if (!token) {
        res.status(401).send({message: "No token provided, NOT AUTHORIZED!"});
        return;
    }
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({message: "Invalid Token!"});
    }
}

module.exports = {verify};