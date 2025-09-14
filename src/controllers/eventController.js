import Event from "../models/eventModel.js";
import asyncHandler from "../middleware/asyncMiddleware.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc)
dayjs.extend(timezone)

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

export const getEventAll = asyncHandler(async (req, res) => {
    const queryOjb = { ...req.query };

    const excludeField = ['page', 'limit', 'name'];
    excludeField.forEach((element) => delete queryOjb[element]);

    const today = new Date().toISOString().split("T")[0];

    let query = Event.find({
        ...queryOjb,
        $or: [
            { date: { $gte: today }},
            { dateend: {$gte: today}}
        ]
    });

    if (req.query.name) {
        query = query.find({
            name: { $regex: req.query.name, $options: 'i' }
        });
    }

    // Sorting asc
    query = query.sort({ date: 1 });

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limitData = parseInt(req.query.limit) || 8;
    const skipData = (page - 1) * limitData;

    query = query.skip(skipData).limit(limitData);

    let data = await query;

    // convert date
    data = data.map(event => ({
        ...event._doc,
        parsedDate: dayjs(event.date).tz('Asia/Jakarta').format('YYYY-MM-DD'),
        parsedDateEnd: event.dateend ? dayjs(event.date).tz('Asia/Jakarta').format('YYYY-MM-DD') : null
    }));

    const totalEvent = await Event.countDocuments({
        ...queryOjb,
        $or: [
            { date: { $gte: today }},
            { dateend: {$gte: today}}
        ]
    });
    const totalPage = Math.ceil(totalEvent / limitData);

    return res.status(200).json({
        message: 'Success get all event!',
        data,
        pagination: {
            totalPage,
            page,
            totalEvent
        }
    });
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

            console.log("Public ID yang akan dihapus:", publicId);

            await cloudinary.uploader.destroy(publicId);
            console.log("Hasil hapus Cloudinary:", result);
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