const express = require('express');
const pool = require('../utils/db');
const router = express.Router();
const TABLE = require("../utils/tables");
const authMiddleware = require("../utils/authMiddleware");
const jwt = require('jsonwebtoken');
const {checkPhoneExistOrNot,
    checkEmailExistOrNot,
    validateEmail,
    validatePhone,

    } = require('../utils/common');


    

// add contact inquiry
router.post('/', async (req, res) => {
    try {
        const { name,email,phone,message } = req.body;

        if ( !name ||!email || !phone || !message) {
            return res.status(400).json({ error: 'Name,Email,Phone and Message fields are required', status: false });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({
              error:
                "Invalid email format. Please enter a valid email like abc@gmail.com",
              status: false,
            });
          }
      
     
        if (!validatePhone(phone)) {
            return res.status(400).json({
              error:
                "Phone number must be 10 digits",
              status: false,
            });
          }
   
        await pool.query(`INSERT INTO ${TABLE.CONTACTINQUIRY_TABLE} (name,email,phone,message) VALUES (?,?,?,?)`, [name,email,phone,message]);

        return res.status(201).json({ message: 'Record Successfully Created', status: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error', status: false });
    }
});

// All List 
router.get('/:id?',async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const [results] = await pool.query(`SELECT * FROM ${TABLE.CONTACTINQUIRY_TABLE} WHERE status !=0 and id = ? `, [id]);
            if (results.length > 0) {
                return res.status(200).json({ data: results[0], message: "Record Successfully Fetched", status: true });
            }
            return res.status(404).json({ error: "Sorry, Record Not Found", status: false });
        }

        const [results] = await pool.query(`SELECT * FROM ${TABLE.CONTACTINQUIRY_TABLE} WHERE status = 1 ORDER BY id DESC`);
        return res.status(200).json({ data: results, message: "Record Successfully Fetched", status: true, count: results.length });
    } catch (error) {
        return res.status(500).json({ error: 'Server error', status: false });
    }
});



// Update 
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ error: 'RowID must be required', status: false });
        }

        const [existingRecord] = await pool.query(`SELECT * FROM ${TABLE.CONTACTINQUIRY_TABLE} WHERE status = 1 and id = ?`, [id]);
        if (!existingRecord.length) {
            return res.status(404).json({ error: "Sorry, Record Not Found", status: false });
        }

        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            return res.status(400).json({ error: 'Name, Email, Phone and Message fields are required', status: false });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({
              error:
                "Invalid email format. Please enter a valid email like abc@gmail.com",
              status: false,
            });
          }
      
     
        if (!validatePhone(phone)) {
            return res.status(400).json({
              error:
                "Phone number must be 10 digits",
              status: false,
            });
          }
   

        // Email Validation
        if (email) {
            const emailExists = await checkEmailExistOrNot(TABLE.CONTACTINQUIRY_TABLE, email, id);
            if (emailExists) {
                return res.status(409).json({ error: 'Email already exists', status: false });
            }
        }

        // Phone Validation
        if (phone) {
            const phoneExists = await checkPhoneExistOrNot(TABLE.CONTACTINQUIRY_TABLE, phone, id);
            if (phoneExists) {
                return res.status(409).json({ error: 'Phone number already exists', status: false });
            }
        }
  

        let updateQuery = `UPDATE ${TABLE.CONTACTINQUIRY_TABLE} SET name=?, email = ?, phone = ?, message = ?, updated_at = NOW()`;
        let queryParams = [name, email, phone, message];

        updateQuery += ` WHERE id = ?`;
        queryParams.push(id);

        await pool.query(updateQuery, queryParams);

        return res.status(200).json({ message: "Record Successfully Updated", status: true });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Server error', status: false });
    }
});

// Delete 
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const idParam = req.params.id;

        const deletedIds = idParam ? idParam.split(',') : [];

        if (!deletedIds || deletedIds.length === 0) {
            return res.status(400).json({ error: 'RowID must be required', status: false });
        }

        await Promise.all(deletedIds.map(async (deletedId) => {
            await pool.query(`SELECT * FROM ${TABLE.CONTACTINQUIRY_TABLE} WHERE status = 1 and id = ?`, [deletedId]);
        }));

        const query = `UPDATE ${TABLE.CONTACTINQUIRY_TABLE} SET status = 0, deleted_at = NOW() WHERE id IN (?)`;

        const [results] = await pool.query(query, [deletedIds]);
        if (results.affectedRows > 0) {
            return res.status(200).json({ message: "Record Successfully Deleted", status: true });
        }
        return res.status(404).json({ error: "Sorry, Record Not Found", status: false });
    } catch (error) {
        return res.status(500).json({ error: 'Server error', status: false });
    }
});

module.exports = router;
