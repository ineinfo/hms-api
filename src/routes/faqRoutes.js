const express = require('express');
const pool = require('../utils/db');
const router = express.Router();
const TABLE = require("../utils/tables");
const authMiddleware = require("../utils/authMiddleware");
const jwt = require('jsonwebtoken');



    

// add contact inquiry
router.post('/',authMiddleware, async (req, res) => {
    try {
        const { title,description } = req.body;

        if ( !title || !description) {
            return res.status(400).json({ error: 'Title and Description fields are required', status: false });
        }

        // Check if title already exists
        const [existingTitle] = await pool.query(`SELECT * FROM ${TABLE.FAQ_TABLE} WHERE title = ?`, [title]);
        if (existingTitle.length > 0) {
            return res.status(400).json({ error: 'Record already exists', status: false });
        }
   
        await pool.query(`INSERT INTO ${TABLE.FAQ_TABLE} (title,description) VALUES (?,?)`, [title,description]);

        return res.status(201).json({ description: 'Record Successfully Created', status: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Server error', status: false });
    }
});

// All List 
router.get('/:id?',async (req, res) => {
    try {
        const id = req.params.id;
       

        if (id) {
            const [results] = await pool.query(`SELECT * FROM ${TABLE.FAQ_TABLE} WHERE status !=0 and id = ? `, [id]);
            if (results.length > 0) {
                return res.status(200).json({ data: results[0], description: "Record Successfully Fetched", status: true });
            }
            return res.status(404).json({ error: "Sorry, Record Not Found", status: false });
        }

        const [results] = await pool.query(`SELECT * FROM ${TABLE.FAQ_TABLE} WHERE status = 1 ORDER BY id DESC `);
        return res.status(200).json({ data: results, description: "Record Successfully Fetched", status: true, count: results.length });
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

        const [existingRecord] = await pool.query(`SELECT * FROM ${TABLE.FAQ_TABLE} WHERE status = 1 and id = ?`, [id]);
        if (!existingRecord.length) {
            return res.status(404).json({ error: "Sorry, Record Not Found", status: false });
        }

        const { title, description } = req.body;

        if (!title && !description) {
            return res.status(400).json({ error: 'At least one field (Title or Description) is required', status: false });
        }

        // Check if title already exists
        if (title) {
            const [existingTitle] = await pool.query(`SELECT * FROM ${TABLE.FAQ_TABLE} WHERE title = ? AND id != ?`, [title, id]);
            if (existingTitle.length > 0) {
                return res.status(400).json({ error: 'Record already exists', status: false });
            }
        }

        let updateQuery = `UPDATE ${TABLE.FAQ_TABLE} SET `;
        let queryParams = [];

        if (title) {
            updateQuery += `title = ?, `;
            queryParams.push(title);
        }

        if (description) {
            updateQuery += `description = ?, `;
            queryParams.push(description);
        }

        // Remove trailing comma and space
        updateQuery = updateQuery.slice(0, -2);

        updateQuery += ` WHERE id = ?`;
        queryParams.push(id);

        await pool.query(updateQuery, queryParams);

        return res.status(200).json({ description: "Record Successfully Updated", status: true });

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
            await pool.query(`SELECT * FROM ${TABLE.FAQ_TABLE} WHERE status = 1 and id = ?`, [deletedId]);
        }));

        const query = `UPDATE ${TABLE.FAQ_TABLE} SET status = 0 WHERE id IN (?)`;

        const [results] = await pool.query(query, [deletedIds]);
        if (results.affectedRows > 0) {
            return res.status(200).json({ description: "Record Successfully Deleted", status: true });
        }
        return res.status(404).json({ error: "Sorry, Record Not Found", status: false });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Server error', status: false });
    }
});

module.exports = router;
