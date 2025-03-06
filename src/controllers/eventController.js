import Event from "../models/eventModel.js";
import asyncHandler from "../middleware/asyncMiddleware.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

export const createEvent = asyncHandler( async(req, res) => {
    try {
        const createEvent = await Event.create(req.body);

        res.status(200).json({
            message: 'Success add event!',
            data: createEvent
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
});

export const getEventAll = asyncHandler( async(req, res) => {
    const queryOjb = { ...req.query };

    // function for mengabaikan jika ada req page dan limit
    const excludeField = ['page', 'limit', 'name'];
    excludeField.forEach((element) => delete queryOjb[element]);

    let query;

    if (req.query.name) {
        query = Event.find({
            name: {$regex: req.query.name, $options: 'i'}
        })
    } else {
        query = Event.find(queryOjb)
    }

    query = query.sort({ date: 1 });

    // Pagination
    const page = req.query.page * 1 || 1
    const limitData = req.query.limit * 1 || 8
    const skipData = (page -1 ) * limitData

    query = query.skip(skipData).limit(limitData);

    let countEvent = await Event.countDocuments(queryOjb)
    if (req.query.page) {
        if (skipData >= countEvent) {
            res.status(404)
            throw new Error('This page doest exist')
        }
    }

    const data = await query
    const totalPage = Math.ceil(countEvent / limitData)

    return res.status(200).json({
        message: 'Success get all event!',
        data,
        pagination: {
            totalPage,
            page,
            totalEvent: countEvent
        }
    })
});

export const getEventId = asyncHandler( async(req, res) => {
    try {
        const paramsId = req.params.id
        const eventDataId = await Event.findById(paramsId)

        if (!eventDataId) {
            res.status(404)
            throw new Error('Data not found!')
        }

        return res.status(200).json({
            message: 'Success get detail event!',
            data: eventDataId
        })
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
});

export const updateEvent = asyncHandler( async(req, res) => {
    try {
        const paramsId = req.params.id
        const updateEventId = await Event.findByIdAndUpdate(paramsId, 
            req.body, {
                runValidators: false,
                new: true
            })

        return res.status(201).json({
            message: 'Success update event!',
            data: updateEventId
        })
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
});

export const deleteEvent = asyncHandler( async(req, res) => {
    try {
        const paramsId = req.params.id;

        // Cari event dulu untuk dapatkan `public_id`
        const event = await Event.findById(paramsId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found!' });
        }

        // Hapus gambar di Cloudinary jika ada
        if (event.image_url) {
            const publicId = event.image_url
                .split('/')
                .slice(-2) 
                .join('/')
                .split('.')[0];

            await cloudinary.uploader.destroy(publicId);
        }

        await Event.findByIdAndDelete(paramsId);

        return res.status(200).json({
            message: 'Success delete event!',
        })
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
});

export const fileUpload = asyncHandler( async(req, res) => {
    const stream = cloudinary.uploader.upload_stream({
        folder: 'techbuddies/event',
        allowed_formats: ['jpg', 'jpeg', 'png']
    }, 
    function(err, result){
        if (err) {
            console.log(err)
            return res.status(500).json({ message: 'Failed upload image!', error: err })
        }

        res.json({ message: 'Success upload image!', url: result.secure_url })
    })

    streamifier.createReadStream(req.file.buffer).pipe(stream)
})