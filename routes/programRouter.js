import express from "express";
import { createProgram, deleteProgram, fileUpload, getAllProgram, getDetailProgram, updateProgram } from "../controllers/programController.js";
import { upload } from "../utils/uploadFileHandler.js";

const router = express.Router();

// post /api/v1/program/add
router.post('/add', createProgram);

// get /api/v1/program
router.get('/', getAllProgram);

// get api/v1/program/:id
router.get('/:id', getDetailProgram);

// put /api/v1/program/:id
router.put('/:id', updateProgram);

// delete api/v1/program/:id
router.delete('/:id', deleteProgram);

// post api/v1/program/fileupload
router.post('/fileupload', upload.single('poster'), fileUpload);

export default router;