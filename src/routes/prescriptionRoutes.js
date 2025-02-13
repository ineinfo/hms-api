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
            const { patient_id, medicine, test, notes, process, booking_id } = req.body;
    
            // Validate that all necessary fields are provided
            if (!patient_id || !medicine || !test || !notes || !process || !booking_id) {
                return res.status(400).json({ error: 'All fields are required', status: false });
            }
    
            // Validate medicine and test are arrays
            if (!Array.isArray(medicine) || !Array.isArray(test)) {
                return res.status(400).json({ error: 'Medicine and test must be arrays', status: false });
            }
    
            // Validate that arrays are not empty
            if (medicine.length === 0 || test.length === 0) {
                return res.status(400).json({ error: 'Medicine and test arrays cannot be empty', status: false });
            }
    
            // Check if the doctor is authorized
            const [appointmentResults] = await pool.query(`
                SELECT * FROM ${TABLE.BOOKING_TABLE}
                WHERE id = ? AND patient_id = ? AND doctor = ?`,
                [booking_id, patient_id, req.doctor_id]
            );
    
            if (appointmentResults.length === 0) {
                return res.status(403).json({ error: 'You are not authorized to prescribe for this patient', status: false });
            }
    
            // Check existing medicines
            const [medicineResults] = await pool.query(`
                SELECT id, title FROM ${TABLE.MEDICINES_TABLE}
                WHERE title IN (?)`, [medicine]
            );
    
            const existingMedicineIds = medicineResults.map(med => med.id);
            const missingMedicines = medicine.filter(title => !medicineResults.map(med => med.title).includes(title));
    
            if (missingMedicines.length > 0) {
                return res.status(400).json({
                    error: `The following medicines are not found: ${missingMedicines.join(', ')}`,
                    status: false
                });
            }
    
            // Check existing tests
            const [testResults] = await pool.query(`
                SELECT id, title FROM ${TABLE.BODYTEST_TABLE}
                WHERE title IN (?)`, [test]
            );
    
            const existingTestIds = testResults.map(tst => tst.id);
            const missingTests = test.filter(title => !testResults.map(tst => tst.title).includes(title));
    
            if (missingTests.length > 0) {
                return res.status(400).json({
                    error: `The following tests are not found: ${missingTests.join(', ')}`,
                    status: false
                });
            }
    
            // Insert prescription
            const [prescriptionResults] = await pool.query(`
                INSERT INTO ${TABLE.PRESCRIPTION_TABLE} 
                (patient_id, medicine, test, notes, process, booking_id) 
                VALUES (?, ?, ?, ?, ?, ?)`,
                [patient_id, existingMedicineIds.join(','), existingTestIds.join(','), notes, process, booking_id]
            );
    
            // Update booking table
            await pool.query(`
                UPDATE ${TABLE.BOOKING_TABLE}
                SET process = ?
                WHERE id = ? AND patient_id = ?`,
                [process, booking_id, patient_id]
            );
    
            return res.status(201).json({
                message: 'Prescription created successfully',
                prescription_id: prescriptionResults.insertId,
                patient_id,
                medicines: existingMedicineIds,
                tests: existingTestIds,
                notes,
                process,
                booking_id,
                status: true
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Server error', status: false });
        }
    });
    

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ error: 'RowID must be required', status: false });
        }

        const [existingRecord] = await pool.query(
            `SELECT * FROM ${TABLE.PRESCRIPTION_TABLE} WHERE status = 1 AND id = ?`,
            [id]
        );

        if (!existingRecord.length) {
            return res.status(404).json({ error: "Sorry, Record Not Found", status: false });
        }

        const { medicine, test, notes, process } = req.body;

        if (!medicine || !test || !notes || !process) {
            return res.status(400).json({
                error: 'Medicine, Test, Notes, and Process fields are required',
                status: false
            });
        }

        // Process medicine input
        const medicineTitles = medicine.split(',').map(title => title.trim());

        const [medicineResults] = await pool.query(
            `SELECT id, title FROM ${TABLE.MEDICINES_TABLE} WHERE title IN (?)`,
            [medicineTitles]
        );

        const existingMedicineIds = medicineResults.map(med => med.id);
        const existingMedicineTitles = medicineResults.map(med => med.title);

        const missingMedicines = medicineTitles.filter(title => !existingMedicineTitles.includes(title));

        if (missingMedicines.length > 0) {
            return res.status(400).json({
                error: `The following medicines are not found: ${missingMedicines.join(', ')}`,
                status: false
            });
        }

        // Process test input
        const testNames = test.split(',').map(title => title.trim());

        const [testResults] = await pool.query(
            `SELECT id, title FROM ${TABLE.BODYTEST_TABLE} WHERE title IN (?)`,
            [testNames]
        );

        const existingTestIds = testResults.map(tst => tst.id);
        const existingTestNames = testResults.map(tst => tst.title);

        const missingTests = testNames.filter(title => !existingTestNames.includes(title));

        if (missingTests.length > 0) {
            return res.status(400).json({
                error: `The following tests are not found: ${missingTests.join(', ')}`,
                status: false
            });
        }

        // Update the prescription record
        const updateQuery = `
            UPDATE ${TABLE.PRESCRIPTION_TABLE}
            SET medicine = ?, test = ?, notes = ?, process = ?, updated_at = NOW()
            WHERE id = ?
        `;
        const queryParams = [
            existingMedicineIds.join(','), // Store medicine IDs
            existingTestIds.join(','),     // Store test IDs
            notes,
            process,
            id
        ];

        await pool.query(updateQuery, queryParams);

        return res.status(200).json({ message: "Record Successfully Updated", status: true });
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
            await pool.query(`SELECT * FROM ${TABLE.PRESCRIPTION_TABLE} WHERE status = 1 and id = ?`, [deletedId]);
        }));

        const query = `UPDATE ${TABLE.PRESCRIPTION_TABLE} SET status = 0, deleted_at = NOW() WHERE id IN (?)`;

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
            const [results] = await pool.query(`SELECT * FROM ${TABLE.PRESCRIPTION_TABLE} WHERE status = 1 and id = ?`, [id]);
            if (results.length > 0) {
                return res.status(200).json({ data: results[0], message: "Record Successfully Fetched", status: true });
            }
            return res.status(404).json({ error: "Sorry, Record Not Found", status: false });
        }

        const [results] = await pool.query(`SELECT * FROM ${TABLE.PRESCRIPTION_TABLE} WHERE status = 1 ORDER BY ID DESC`);

        return res.status(200).json({ data: results, message: "Record Successfully Fetched", status: true, count: results.length });

    } catch (error) {
        return res.status(500).json({ error: 'Server error', status: false });
    }
});



// //all medical history of patient
router.get('/patientid/:patient_id', async (req, res) => {
    try {
       
        const patientId = req.params.patient_id; 
        console.log("Patient ID from request params:", patientId); 

        if (!patientId) {
            return res.status(400).json({ error: 'Patient ID is required', status: false });
        }

      
        const [prescriptions] = await pool.query(`
            SELECT p.id AS prescription_id, p.booking_id, p.patient_id, p.medicine, p.test, p.process, 
                   p.notes, 
                   b.*,  
                   d.*  
            FROM ${TABLE.PRESCRIPTION_TABLE} p
            LEFT JOIN ${TABLE.BOOKING_TABLE} b ON p.booking_id = b.id
            LEFT JOIN ${TABLE.DOCTORS_TABLE} d ON b.doctor = d.doctor_id  
            WHERE p.patient_id = ? AND p.status = 1
        `, [patientId]);

        console.log("Prescriptions with full Booking and Doctor Info:", prescriptions); 

        if (prescriptions.length === 0) {
            return res.status(404).json({ error: 'No prescriptions found for this patient', status: false });
        }

        
        return res.status(200).json({
            data: prescriptions,
            message: 'Prescriptions with booking and doctor details successfully fetched',
            status: true,
            count: prescriptions.length
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error', status: false });
    }
});


// // Get bookings for a specific doctor by doctor_id
// router.get('/doctor/:doctor_id', async (req, res) => {
//     try {
//         const doctorId = req.params.doctor_id;

        
//         if (!doctorId) {
//             return res.status(400).json({ error: 'Doctor ID is required', status: false });
//         }

      
//         const [results] = await pool.query(`
//             SELECT * 
//             FROM ${TABLE.BOOKING_TABLE} 
//             WHERE status = 1 AND doctor = ?
//         `, [doctorId]);

//         // Check if any bookings are found
//         if (results.length > 0) {
//             return res.status(200).json({
//                 data: results,
//                 message: 'Bookings for the doctor fetched successfully',
//                 status: true,
//                 count: results.length
//             });
//         } else {
//             return res.status(404).json({
//                 error: 'No bookings found for this doctor',
//                 status: false
//             });
//         }

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Server error', status: false });
//     }
// });


module.exports = router;
