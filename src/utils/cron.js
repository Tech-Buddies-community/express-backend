// import cron from "node-cron";
// import Event from "../models/eventModel.js";

// console.log("Cron job script loaded!"); // Tambahkan ini

// const deleteExpiredEvents = async () => {
//     try {
//         console.log("Cron job running...");
//         const threeDaysAgo = new Date();
//         threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

//         await Event.deleteMany({ date: { $lt: threeDaysAgo } });
//         console.log("Expired events deleted successfully!");
//     } catch (error) {
//         console.error("Failed to delete expired events:", error);
//     }
// };

// // Jalankan setiap 1 jam
// cron.schedule("0 * * * *", deleteExpiredEvents, {
//     scheduled: true,
//     timezone: "Asia/Jakarta",
// });

// export default deleteExpiredEvents;