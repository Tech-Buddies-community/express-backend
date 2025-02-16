import express from "express";
import { createProgram, deleteProgram, fileUpload, getAllProgram, getDetailProgram, updateProgram } from "../controllers/programController.js";
import { upload } from "../utils/uploadFileHandler.js";
import { adminMiddleware, protectedMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// post /api/v1/program/add
router.post('/add', protectedMiddleware, adminMiddleware, createProgram);

// get /api/v1/program
router.get('/', getAllProgram);

// get api/v1/program/:id
router.get('/:id', getDetailProgram);

// put /api/v1/program/:id
router.put('/:id', protectedMiddleware, adminMiddleware, updateProgram);

// delete api/v1/program/:id
router.delete('/:id', protectedMiddleware, adminMiddleware, deleteProgram);

// post api/v1/program/fileupload
router.post('/fileupload', upload.single('poster'), fileUpload);

export default router;