import express, { Router } from "express";
import UserDetails from "../models/user-data.js";
import { genPassword, validPassword, issueJWT, authMiddleware } from "../lib/utils.js";

const router = express.Router();

router.get("/secret", authMiddleware, (req, res) => {
    const user = req.user; // `authMiddleware` has attached user data to `req.user`
    res.status(200).json({ success: true, msg: "This is a secret area", user });
  });
  

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Find the user by username
    UserDetails.findOne({ username })
    .then((user) => {
        if (!user) {
            return res.status(401).json({ success: false, msg: "Could not find user" });
        }
        
        // Validate the password
        const isValid = validPassword(password, user.hash); // Updated to use just the hash
        if (isValid) {
            const tokenObject = issueJWT(user);

            // Store the JWT token in a secure, HttpOnly cookie
            res.cookie("token", tokenObject.token, {
                httpOnly: true,
                secure: false, // Use true for HTTPS, false in local development (http)
                sameSite: "None", // For cross-site cookies (if your frontend is on a different domain)
                maxAge: 14 * 24 * 60 * 60 * 1000 // 14 days in milliseconds (matches token expiry)
            });
            
            res.status(200).json({ 
                success: true, 
                msg: "Login successful", 
                token: tokenObject.token, 
                expiresIn: tokenObject.expires,
                user: { username: user.username, email: user.email, isAdmin: user.isAdmin } // Include user data
            });
        } else {
            res.status(401).json({ success: false, msg: "Invalid password" });
        }
    })
    .catch(err => {
        console.error("Login error:", err); // Log error for debugging
        res.status(500).json({ success: false, msg: "An error occurred", error: err });
    });
});

router.post("/register", (req, res) => {
    const { username, email, password } = req.body;
    
    // Generate hash for the password (salt is handled internally by bcrypt)
    const hash = genPassword(password);

    // Determine if the user is an admin based on email
    const isAdmin = email.endsWith("@iiitdwd.ac.in");

    // Create new user document
    const user = new UserDetails({
        username, 
        email, 
        hash, // No longer need to store salt
        isAdmin
    });

    // Save user to database
    user.save()
    .then(savedUser => {
        // Issue JWT after successful registration
        const tokenObject = issueJWT(savedUser);

        // Store the JWT token in a secure, HttpOnly cookie
        res.cookie("token", tokenObject.token, {
            httpOnly: true,
            secure: false, // Use true for HTTPS in production
            sameSite: "None", // For cross-site cookies (different domains)
            maxAge: 14 * 24 * 60 * 60 * 1000 // 14 days (same as token expiry)
        });

        res.status(200).json({ success: true, msg: "Registration successful", user: savedUser });
    })
    .catch(err => {
        console.error("Registration error:", err); // Log error for debugging
        res.status(500).json({ success: false, msg: "An error occurred", error: err });
    });
});

router.get("/logout", (req, res) => {
    // Clear the cookie by setting the expiration date in the past
    res.cookie("token", "", { 
        httpOnly: true, 
        secure: false, 
        sameSite: "None", 
        expires: new Date(0) 
    });
    res.status(200).json({ success: true, msg: "Logout successful" });
});


router.get("/admin-panel", authMiddleware, (req, res) => {
    const user = req.user;
    console.log("User accessing admin panel:", user); // Log user info

    if (user && user.isAdmin) {
        res.status(200).json({ success: true, msg: "Welcome to the admin panel!", user });
    } else {
        console.log("User is not an admin or not found:", user);
        return res.status(403).json({ success: false, msg: "Access denied. You are not an admin." });
    }
});



export default router;
