import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserDetails from "../models/user-data.js";

// Load environment variables
dotenv.config();
const jwtSecret = process.env.JWT_SECRET || "secret";

// Generate a password hash
export function genPassword(password) {
    // Directly generate and return the hash
    const hash = bcrypt.hashSync(password, 10); // 10 is the salt rounds
    return hash; // Return only the hash; salt is embedded in the hash
}

// Middleware for JWT authentication
export function authMiddleware(req, res, next) {
    let token = req.cookies.token;
    if (!token) {
        console.log("Authorization cookie missing");
        return res.status(401).json({ success: false, msg: "Authorization cookie missing" });
    }

    try {
        // If the token starts with 'JWT ', remove it
        if (token.startsWith('JWT ')) {
            token = token.split(' ')[1];
        }

        // Verify the token
        const verified = jwt.verify(token, jwtSecret);

        // Fetch the user from the database and explicitly check admin status
        UserDetails.findById(verified.sub)
            .then(user => {
                if (!user) {
                    console.log("User not found");
                    return res.status(401).json({ success: false, msg: "User not found" });
                }

                // Attach the complete user object to the request
                req.user = user;
                console.log(user);
                // For admin-panel route, explicitly check isAdmin
                if (req.path === '/admin-panel') {
                    if (!user.isAdmin) {
                        console.log("Access denied: User is not an admin");
                        return res.status(403).json({ 
                            success: false, 
                            msg: "Access denied. You are not an admin.",
                            userStatus: { isAdmin: user.isAdmin, email: user.email }
                        });
                    }
                }

                next();
            })
            .catch(err => {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, msg: "Database error occurred" });
            });
    } catch (err) {
        console.error("Token verification failed:", err);
        return res.status(401).json({ success: false, msg: "Invalid token" });
    }
}
// Validate the provided password against the stored hash
export function validPassword(password, hash) {
    return bcrypt.compareSync(password, hash); // bcrypt handles salt internally
}

// Issue a JWT token for a user
export function issueJWT(user) {
    const _id = user._id;
    const expiresIn = '14d';
    const payload = {
        sub: _id,
        iat: Date.now()
    };
    const signedToken = jwt.sign(payload, jwtSecret, { expiresIn: expiresIn });
    return {
        token: "JWT " + signedToken,
        expires: expiresIn
    };
}
