const express = require('express');
const pool = require('../utils/db');
const router = express.Router();
const TABLE = require("../utils/tables");
const authMiddleware = require("../utils/authMiddleware");
const jwt = require('jsonwebtoken');
const {validateDate,
    validateTime,
    validateEmail,
    validatePhone,

    convertTo24HrFormat,} = require('../utils/common');



router.post('/', authMiddleware, async (req, res) => {
    try {
        // Get user details from token
        const userId = req.user_id;

        // Collect booking data from the request body
        const { first_name, last_name, email, phone, age, dob, address, doctor, specialty, date, time , amount } = req.body;

        // Validate that all necessary data is provided
        if (!first_name || !last_name || !email || !phone || !age || !dob || !address || !doctor || !specialty || !date || !time ||!amount) {
            return res.status(400).json({ error: 'All fields are required', status: false });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format. Please provide a valid email.', status: false });
        }

        // Validate phone
        if (!validatePhone(phone)) {
            return res.status(400).json({ error: 'Invalid phone number. It must be 10 digits.', status: false });
        }
        // Validate date and time format using imported utility functions
        const dateError = validateDate(date);
        if (dateError) {
            return res.status(400).json({ error: dateError.error, status: false });
        }

        const timeError = validateTime(time);
        if (timeError) {
            return res.status(400).json({ error: timeError.error, status: false });
        }

        // Convert time to 24-hour format
        const timeIn24HrFormat = convertTo24HrFormat(time);

        // Combine date and time into a single datetime string
        const appointmentDatetime = `${date} ${timeIn24HrFormat}`;

        // // Insert booking into the database
        // const [results] = await pool.query(`
        //     INSERT INTO ${TABLE.BOOKING_TABLE} 
        //     (first_name, last_name, email, phone, age, dob, address, doctor, specialty, patient_id, date_time,amount) 
        //     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`, 
        //     [first_name, last_name, email, phone, age, dob, address, doctor, specialty, userId, appointmentDatetime,amount]);

        //check doctor_id in doctor
       // Split the doctor name into first and last names
const doctorNameParts = doctor.split(" ");
if (doctorNameParts.length < 2) {
    return res.status(400).json({ error: 'Please provide a full name for the doctor.', status: false });
}

const doctorFirstName = doctorNameParts[0];
const doctorLastName = doctorNameParts.slice(1).join(" ");

// Check if the doctor exists in the DOCTORS_TABLE
const [doctorResults] = await pool.query(`
    SELECT doctor_id FROM ${TABLE.DOCTORS_TABLE} WHERE first_name = ? AND last_name = ?`, 
    [doctorFirstName, doctorLastName]);

if (doctorResults.length === 0) {
    return res.status(400).json({ error: 'Doctor not found. Please provide a valid doctor name.', status: false });
}

// Extract doctor_id
const doctorId = doctorResults[0].doctor_id;


        // Insert booking into the database
        const [results] = await pool.query(`
            INSERT INTO ${TABLE.BOOKING_TABLE} 
            (first_name, last_name, email, phone, age, dob, address, doctor, specialty, patient_id, date_time, amount) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [first_name, last_name, email, phone, age, dob, address, doctorId, specialty, userId, appointmentDatetime, amount]);



        // Return a success message with the created booking ID
        return res.status(201).json({
            message: "Appointment booked successfully",
            booking_id: results.insertId,
            status: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error', status: false });
    }
});


//update
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        // Get user details from token
        const userId = req.user_id;

        // Get booking ID from parameters
        const bookingId = req.params.id;

        // Collect updated booking data from the request body
        const { first_name, last_name, email, phone, age, dob, address, doctor, specialty, date, time, amount } = req.body;

        // Validate booking ID ownership
        const [booking] = await pool.query(`
            SELECT patient_id FROM ${TABLE.BOOKING_TABLE} WHERE id = ? LIMIT 1
        `, [bookingId]);

        if (booking.length === 0) {
            return res.status(404).json({ error: 'Booking not found', status: false });
        }

        if (booking[0].patient_id !== userId) {
            return res.status(403).json({ error: 'Unauthorized to update this booking', status: false });
        }

        // Validate input data
        if (!first_name || !last_name || !email || !phone || !age || !dob || !address || !doctor || !specialty || !date || !time || !amount) {
            return res.status(400).json({ error: 'All fields are required', status: false });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format. Please provide a valid email.', status: false });
        }

        if (!validatePhone(phone)) {
            return res.status(400).json({ error: 'Invalid phone number. It must be 10 digits.', status: false });
        }

        const dateError = validateDate(date);
        if (dateError) {
            return res.status(400).json({ error: dateError.error, status: false });
        }

        const timeError = validateTime(time);
        if (timeError) {
            return res.status(400).json({ error: timeError.error, status: false });
        }

        // Convert time to 24-hour format
        const timeIn24HrFormat = convertTo24HrFormat(time);

        // Combine date and time into a single datetime string
        const appointmentDatetime = `${date} ${timeIn24HrFormat}`;

        // Update booking in the database
        await pool.query(`
            UPDATE ${TABLE.BOOKING_TABLE} 
            SET first_name = ?, last_name = ?, email = ?, phone = ?, age = ?, dob = ?, address = ?, doctor = ?, specialty = ?, date_time = ?, amount = ?, 
            updated_at = NOW()                                     
            WHERE id = ? AND patient_id = ?
        `, [first_name, last_name, email, phone, age, dob, address, doctor, specialty, appointmentDatetime, amount, bookingId, userId]);

        // Return a success message
        return res.status(200).json({
            message: "Booking updated successfully",
            status: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error', status: false });
    }
});


router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const idParam = req.params.id;

        const deletedIds = idParam ? idParam.split(',') : [];

        if (!deletedIds || deletedIds.length === 0) {
            return res.status(400).json({ error: 'RowID must be required', status: false });
        }

        await Promise.all(deletedIds.map(async (deletedId) => {
            await pool.query(`SELECT * FROM ${TABLE.BOOKING_TABLE} WHERE status = 1 and id = ?`, [deletedId]);
        }));

        const query = `UPDATE ${TABLE.BOOKING_TABLE} SET status = 0, deleted_at = NOW() WHERE id IN (?)`;

        const [results] = await pool.query(query, [deletedIds]);
        if (results.affectedRows > 0) {
            return res.status(200).json({ message: "Record Successfully Deleted", status: true });
        }
        return res.status(404).json({ error: "Sorry, Record Not Found", status: false });
    } catch (error) {
        return res.status(500).json({ error: 'Server error', status: false });
    }
});

//get all specific 
router.get('/:id?', async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const [results] = await pool.query(`SELECT * FROM ${TABLE.BOOKING_TABLE} WHERE status = 1 and id = ?`, [id]);
            if (results.length > 0) {
                return res.status(200).json({ data: results[0], message: "Record Successfully Fetched", status: true });
            }
            return res.status(404).json({ error: "Sorry, Record Not Found", status: false });
        }

        const [results] = await pool.query(`SELECT * FROM ${TABLE.BOOKING_TABLE} WHERE status = 1 ORDER BY ID DESC`);

        return res.status(200).json({ data: results, message: "Record Successfully Fetched", status: true, count: results.length });

    } catch (error) {
        return res.status(500).json({ error: 'Server error', status: false });
    }
});



module.exports = router;
