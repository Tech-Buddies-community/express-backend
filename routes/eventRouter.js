import express from "express";
import { createEvent, deleteEvent, fileUpload, getEventAll, getEventId, updateEvent } from "../controllers/eventController.js";
import { upload } from "../utils/uploadFileHandler.js";
import { protectedMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// post /api/v1/event/add
router.post('/add', createEvent);

// get /api/v1/event
router.get('/', getEventAll);

// get /api/v1/event/:id
router.get('/:id', getEventId);

// put /api/v1/event/:id
router.put('/:id', updateEvent);

// delete /api/v1/event/:id
router.delete('/:id', deleteEvent);

// post /api/v1/event/fileupload
router.post('/fileupload', upload.single('poster'), fileUpload);

export default router;