const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "No token, authorization denied" });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 

        // Add user from payload
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Token is not valid" });
    }
};

module.exports = auth;
