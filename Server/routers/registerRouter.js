import {
  // authUser,
  // deleteUser,
  // getUserById,
  // getUserProfile,
  // getUsers,
  // logoutUser,
  registerUser,
  // updateUser,
  // updateUserProfile,
} from "../controllers/userControllers.js";
// import { admin, protect } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

router.route("/").post(registerUser)
// .get(protect, admin, getUsers);
// router.post("/auth", authUser);
// router.post("/logout", logoutUser);
// router
//   .route("/profile")
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile);
// router
//   .route("/:id")
//   .delete(protect, admin, deleteUser)
//   .get(protect, admin, getUserById)
//   .put(protect, admin, updateUser);

export default router;