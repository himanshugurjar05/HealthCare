import { Router } from 'express';
import usercontroller from '../controller/userController.js';
// import jwt from 'jsonwebtoken';

// import passport from 'passport';

const router = Router();

// // ✅ Google OAuth Login Route
// router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// // ✅ Google OAuth Callback Route
// router.get("/auth/google/callback", 
//     passport.authenticate("google", { failureRedirect: "/login" }),
//     async (req, res) => {
//       if (!req.user) {
//         return res.status(401).json({ message: "Authentication failed" });
//       }
  
//       let token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: "30d" });

//       res.json
  
//       console.log("Generated Token:", token);  // ✅ Debugging
//       res.redirect(`http://localhost:5173/login?token=${token}`);
//     }
//   );

// Other routes
router.get('/', usercontroller.getAllUser);
router.get('/:id', usercontroller.getUserById);
router.post('/login', usercontroller.loginUser);
router.post('/signUp', usercontroller.createUser);
router.put('/:id', usercontroller.updatedUser);
router.delete('/:id', usercontroller.deletedUser);

export default router;

