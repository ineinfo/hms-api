
const express = require('express');
const TABLE = require('../utils/tables')
const pool = require('../utils/db');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const { uploadTest } = require('../utils/multerConfig');
const {multerErrorHandler} = require('../utils/common');


// Add
router.post('/', uploadTest,multerErrorHandler, authMiddleware,async (req, res) => {
    try {

        const {title} = req.body;

        if ( !title) {
            return res.status(400).json({ error: 'Title field required', status: false });
        }
        const [existingTitle] = await pool.query(`SELECT * FROM ${TABLE.BODYTEST_TABLE} WHERE status = 1 and title = ?`, [title]);
        if (existingTitle.length) {
            return res.status(400).json({ error: 'Record already exists', status: false });
        }


        const baseUrl = req.protocol + '://' + req.get('host') + '/uploads/bodytest/';
        const image_urls = req.files.map(file => baseUrl + file.filename);
        const image_url = image_urls.length > 0 ? image_urls[0] : '';

         // Generate the base URL for images - multiple
    // const baseUrl = req.protocol + "://" + req.get("host") + "/uploads/bodytest";
    // const image_urls = req.files.map((file) => baseUrl + file.filename);

    // const [image_url, image_url2, image_url3, image_url4, image_url5] = [
    //   image_urls[0] || null,
    //   image_urls[1] || null,
    //   image_urls[2] || null,
    //   image_urls[3] || null,
    //   image_urls[4] || null,
    // ];


        await pool.query(`INSERT INTO ${TABLE.BODYTEST_TABLE} (title,image_url) VALUES (?,?)`, [title,image_url]);
                
        return res.status(201).json({ message: 'Record Successfully Created', status: true });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Server error', status: false });
    }
});


// All List & Specific List
router.get('/:id?', async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const [results] = await pool.query(`SELECT * FROM ${TABLE.BODYTEST_TABLE} WHERE status = 1 and id = ?`, [id]);
            if (results.length > 0) {
                return res.status(200).json({ data: results[0], message: "Record Successfully Fetched", status: true });
            }
            return res.status(404).json({ error: "Sorry, Record Not Found", status: false });
        }

        const [results] = await pool.query(`SELECT * FROM ${TABLE.BODYTEST_TABLE} WHERE status = 1 ORDER BY ID DESC`);

        return res.status(200).json({ data: results, message: "Record Successfully Fetched", status: true, count: results.length });

    } catch (error) {
        return res.status(500).json({ error: 'Server error', status: false });
    }
});

// Update
router.put('/:id', uploadTest, multerErrorHandler, authMiddleware, async (req, res) => {
    try {
        const { id } = req.params; // Medicine ID
        const { title } = req.body; // Parse form-data title field

        // Validate input
        if (!title) {
            return res.status(400).json({ error: 'Title field is required', status: false });
        }

        // Check if the medicine exists
        const [existingMedicine] = await pool.query(
            `SELECT * FROM ${TABLE.BODYTEST_TABLE} WHERE status = 1 and id = ?`, 
            [id]
        );
        if (existingMedicine.length === 0) {
            return res.status(404).json({ error: 'Record not found', status: false });
        }

        // Check for duplicate title
        const [duplicateTitle] = await pool.query(
            `SELECT * FROM ${TABLE.BODYTEST_TABLE} WHERE status = 1 and title = ? AND id != ?`, 
            [title, id]
        );
        if (duplicateTitle.length > 0) {
            return res.status(400).json({ error: 'Record with the same title already exists', status: false });
        }

  

        const baseUrl = req.protocol + '://' + req.get('host') + '/uploads/bodytest/'; // Ensure trailing slash
const image_urls = req.files.map(file => baseUrl + file.filename);
const image_url = image_urls.length > 0 ? image_urls[0] : existingMedicine[0].image_url;



    //     const baseUrl = req.protocol + '://' + req.get('host') + '/uploads/bodytest/';
    // const image_urls = req.files.map(file => baseUrl + file.filename);
    // const image_url = image_urls.length > 0 ? image_urls[0] : '';

        // Update the medicine
        await pool.query(
            `UPDATE ${TABLE.BODYTEST_TABLE} 
             SET title = ?, 
                 image_url = ?, 
                 updated_at = NOW() 
             WHERE id = ?`,
            [title, image_url, id]
        );

        return res.status(200).json({ message: 'Record Successfully Updated', status: true });
    } catch (error) {
        console.error(error);
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
            await pool.query(`SELECT * FROM ${TABLE.BODYTEST_TABLE} WHERE status = 1 and id = ?`, [deletedId]);
        }));

        const query = `UPDATE ${TABLE.BODYTEST_TABLE} SET status = 0, deleted_at = NOW() WHERE id IN (?)`;

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