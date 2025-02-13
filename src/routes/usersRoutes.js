// src/routes/userRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const TABLE = require("../utils/tables");
const pool = require("../utils/db");
const {
  checkEmailExistOrNot,
  validatePassword,
  validateEmail,
  formatDateForDB,
  validatePhone,
  generateOTP
} = require("../utils/common");
const router = express.Router();
const authMiddleware = require("../utils/authMiddleware");

const API_SECRET_KEY = process.env.API_SECRET_KEY;
const API_TOKEN_EXPIRESIN = process.env.API_TOKEN_EXPIRESIN;

// Register both doctor, patients - eithout booking code
router.post("/", async (req, res) => {
  try {
    const {
      role,
      first_name,
      last_name,
      email,
      phone,
      password,
      age,
      dob,
      address,
      doctor_id,
      speciality,
      fees,
    } = req.body;


    if (!role || !first_name || !last_name || !email || !phone || !password) {
      return res.status(400).json({
        error:
          "Role, First Name, Last Name, Email, Phone, and Password are required fields",
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

    if (!validateEmail(email)) {
      return res.status(400).json({
        error:
          "Invalid email format. Please enter a valid email like abc@gmail.com",
        status: false,
      });
    }

    if (!formatDateForDB(dob)) {
      return res.status(400).json({
        error: "Invalid date format. Please enter a valid date ",
        status: false,
      });
    }


    const emailExists = await checkEmailExistOrNot(
      role === "patient" ? TABLE.PATIENTS_TABLE : TABLE.DOCTORS_TABLE,
      email
    );
    if (emailExists) {
      return res
        .status(409)
        .json({ error: "Email already exists, do login", status: false });
    }


    if (!validatePassword(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 9 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.",
        status: false,
      });
    }

 
    const hashedPassword = await bcrypt.hash(password, 10);

    let userId = null;
    let userDetails = null;


    if (role === "patient") {
      
      if (!age || !dob || !address) {
        return res.status(400).json({
          error: "Age, Date of Birth, and Address are required for patients",
          status: false,
        });
      }

      const patientInsertResult = await pool.query(
        `INSERT INTO ${TABLE.PATIENTS_TABLE} (first_name, last_name, email, phone, password, age, dob, address) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [first_name, last_name, email, phone, hashedPassword, age, dob, address]
      );

      userId = patientInsertResult[0].insertId;

      userDetails = {
        role,
        first_name,
        last_name,
        email,
        phone,
        age,
        dob,
        address,
        p_id: userId,
      };
    } else if (role === "doctor") {
      
      if (!doctor_id || !speciality) {
        return res.status(400).json({
          error: "Doctor ID and Speciality are required for doctors",
          status: false,
        });
      }

  
      const [existingDoctor] = await pool.query(
        `SELECT * FROM ${TABLE.DOCTORS_TABLE} WHERE doctor_id = ? AND speciality = ?`,
        [doctor_id, speciality]
      );

      if (existingDoctor.length > 0) {
        return res.status(409).json({
          error: `Doctor with ID ${doctor_id} and speciality ${speciality} is already registered`,
          status: false,
        });
      }

      const doctorInsertResult = await pool.query(
        `INSERT INTO ${TABLE.DOCTORS_TABLE} (first_name, last_name, email, phone, password, dob, age, doctor_id, speciality, fees) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          first_name,
          last_name,
          email,
          phone,
          hashedPassword,
          dob,
          age,
          doctor_id,
          speciality,
          fees,
        ]
      );

      userId = doctorInsertResult[0].insertId;

      userDetails = {
        role,
        first_name,
        last_name,
        email,
        phone,
        dob,
        age,
        doctor_id,
        speciality,
        d_id: userId,
      };
    } else {
      return res.status(400).json({
        error: 'Role must be either "patient" or "doctor"',
        status: false,
      });
    }

    return res.status(201).json({
      message: "User successfully registered",
      status: true,
      user: userDetails,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error", status: false });
  }
});





//login patients
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and Password field must be required",
        status: false,
      });
    }

    const [rows] = await pool.query(
      `SELECT * FROM ${TABLE.PATIENTS_TABLE} WHERE email = ? AND status = 1`,
      [email]
    );
    if (rows.length > 0) {
      const user = rows[0];

      const storedHashedPassword = user.password;
      const passwordMatch = await bcrypt.compare(
        password,
        storedHashedPassword
      );

      if (passwordMatch) {
        const token = jwt.sign({ data: user }, API_SECRET_KEY, {
          expiresIn: API_TOKEN_EXPIRESIN,
        });
        return res.status(200).json({
          accessToken: token,
          user,
          message: "Login Successfully",
          status: true,
        });
      } else {
        return res
          .status(401)
          .json({ error: "Invalid User ID or Password", status: false });
      }
    }

    return res
      .status(404)
      .json({ error: "User ID does not exist or Invalid User", status: false });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error occurred: ${error.message}`, status: false });
  }
});

// Doctor login
router.post("/doctor-login", async (req, res) => {
  try {
    const { doctor_id, password } = req.body;

    if (!doctor_id || !password) {
      return res.status(400).json({
        error: "Doctor ID and Password field must be required",
        status: false,
      });
    }

    const [rows] = await pool.query(
      `SELECT * FROM ${TABLE.DOCTORS_TABLE} WHERE doctor_id = ? AND status = 1`,
      [doctor_id]
    );
    if (rows.length > 0) {
      const doctor = rows[0];

      const storedHashedPassword = doctor.password;
      const passwordMatch = await bcrypt.compare(
        password,
        storedHashedPassword
      );

      if (passwordMatch) {
        const token = jwt.sign({ data: doctor }, API_SECRET_KEY, {
          expiresIn: API_TOKEN_EXPIRESIN,
        });
        return res.status(200).json({
          accessToken: token,
          doctor:{...doctor,
            password:""
          },
          message: "Login Successfully",
          status: true,
        });
      } else {
        return res
          .status(401)
          .json({ error: "Invalid Doctor ID or Password", status: false });
      }
    }

    return res.status(404).json({
      error: "Doctor ID does not exist or Invalid Doctor",
      status: false,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error occurred: ${error.message}`, status: false });
  }
});

//get all doctors and specific doctors
router.get("/doctor/:id?", async (req, res) => {
  try {
    const id = req.params.id; 
    console.log("Fetching doctor with ID:", id); 

    if (id) {
      const [doctor] = await pool.query(
        `SELECT * FROM ${TABLE.DOCTORS_TABLE} WHERE id = ? AND status = 1`,
        [id]
      );
      console.log("Doctor found:", doctor);

      if (doctor.length > 0) {
        return res.status(200).json({
          data: doctor[0],
          message: "Record successfully fetched",
          status: true,
        });
      }
      return res.status(404).json({
        error: "Doctor not found",
        status: false,
      });
    }

    const [doctors] = await pool.query(
      `SELECT * FROM ${TABLE.DOCTORS_TABLE} WHERE status = 1`
    );
    console.log("Doctors found:", doctors); 

    return res.status(200).json({
      data: doctors,
      message: "Records successfully fetched",
      status: true,
      count: doctors.length,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Server error",
      status: false,
    });
  }
});

//get all patiens and specific
router.get("/patients/:id?", async (req, res) => {
  try {
    const id = req.params.id;

    if (id) {
      const [patient] = await pool.query(
        `SELECT * FROM ${TABLE.PATIENTS_TABLE} WHERE id = ? AND status = 1`,
        [id]
      );
      if (patient.length > 0) {
        return res.status(200).json({
          data: patient[0],
          message: "Record Successfully Fetched",
          status: true,
        });
      }
      return res.status(404).json({
        error: "Patient not found",
        status: false,
      });
    }

   
    const [patients] = await pool.query(
      `SELECT * FROM ${TABLE.PATIENTS_TABLE} WHERE status = 1`
    );

    return res.status(200).json({
      data: patients,
      message: "Records successfully fetched",
      status: true,
      count: patients.length,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Server error",
      status: false,
    });
  }
});

//delete doctors
router.delete("/doctor/:id", authMiddleware, async (req, res) => {
  try {
    const idParam = req.params.id;

    const deletedIds = idParam ? idParam.split(",") : [];

    if (!deletedIds || deletedIds.length === 0) {
      return res
        .status(400)
        .json({ error: "RowID must be required", status: false });
    }

    await Promise.all(
      deletedIds.map(async (deletedId) => {
        await pool.query(
          `SELECT * FROM ${TABLE.DOCTORS_TABLE} WHERE status = 1 and id = ?`,
          [deletedId]
        );
      })
    );

    const query = `UPDATE ${TABLE.DOCTORS_TABLE} SET status = 0, deleted_at = NOW() WHERE id IN (?)`;

    const [results] = await pool.query(query, [deletedIds]);
    if (results.affectedRows > 0) {
      return res
        .status(200)
        .json({ message: "Record Successfully Deleted", status: true });
    }
    return res
      .status(404)
      .json({ error: "Sorry, Record Not Found", status: false });
  } catch (error) {
    return res.status(500).json({ error: "Server error", status: false });
  }
});

//delete patients
router.delete("/patients/:id", authMiddleware, async (req, res) => {
  try {
    const idParam = req.params.id;

    const deletedIds = idParam ? idParam.split(",") : [];

    if (!deletedIds || deletedIds.length === 0) {
      return res
        .status(400)
        .json({ error: "RowID must be required", status: false });
    }

    await Promise.all(
      deletedIds.map(async (deletedId) => {
        await pool.query(
          `SELECT * FROM ${TABLE.PATIENTS_TABLE} WHERE status = 1 and id = ?`,
          [deletedId]
        );
      })
    );

    const query = `UPDATE ${TABLE.PATIENTS_TABLE} SET status = 0, deleted_at = NOW() WHERE id IN (?)`;

    const [results] = await pool.query(query, [deletedIds]);
    if (results.affectedRows > 0) {
      return res
        .status(200)
        .json({ message: "Record Successfully Deleted", status: true });
    }
    return res
      .status(404)
      .json({ error: "Sorry, Record Not Found", status: false });
  } catch (error) {
    return res.status(500).json({ error: "Server error", status: false });
  }
});

// // Update Doctor
// router.put("/doctor/:id", authMiddleware,async (req, res) => {
//   try {
//     const id = req.params.id;

//     if (!id) {
//       return res
//         .status(400)
//         .json({ error: "Doctor ID is required", status: false });
//     }


//     const [existingDoctor] = await pool.query(
//       `SELECT * FROM ${TABLE.DOCTORS_TABLE} WHERE id = ?  AND status = 1`,
//       [id]
//     );
//     if (!existingDoctor.length) {
//       return res.status(404).json({ error: "Doctor not found", status: false });
//     }

//     const {
//       first_name,
//       last_name,
//       email,
//       phone,
//       password,
//       dob,
//       age,
//       doctor_id,
//       speciality,
//       fees,
//     } = req.body;


//     // if (
//     //   !first_name ||
//     //   !last_name ||
//     //   !email ||
//     //   !phone ||
//     //   !password ||
//     //   !dob ||
//     //   !age ||
//     //   !doctor_id ||
//     //   !speciality
//     // ) 
//     // {
//     //   return res.status(400).json({
//     //     error:
//     //       "First Name, Last Name, Email, Phone, Password, DOB, Age, Doctor ID, and Speciality are required fields",
//     //     status: false,
//     //   });
//     // }

//     const mobileRegex = /^[0-9]{10}$/;
//     if (!mobileRegex.test(phone)) {
//       return res
//         .status(400)
//         .json({ error: "Phone number must be 10 digits", status: false });
//     }

//     if (!validateEmail(email)) {
//       return res
//         .status(400)
//         .json({ error: "Invalid email format", status: false });
//     }

//     if (!formatDateForDB(dob)) {
//       return res
//         .status(400)
//         .json({ error: "Invalid date format for DOB", status: false });
//     }

//     // Check if the email is already used by another doctor
//     const emailExists = await checkEmailExistOrNot(TABLE.DOCTORS_TABLE, email);
//     if (emailExists && email !== existingDoctor[0].email) {
//       return res
//         .status(409)
//         .json({ error: "Email already exists", status: false });
//     }

//     // Check if the doctor ID and speciality already exist
//     const [existingDoctorRecord] = await pool.query(
//       `SELECT * FROM ${TABLE.DOCTORS_TABLE} WHERE doctor_id = ? AND speciality = ?`,
//       [doctor_id, speciality]
//     );
//     if (
//       existingDoctorRecord.length &&
//       (doctor_id !== existingDoctor[0].doctor_id ||
//         speciality !== existingDoctor[0].speciality)
//     ) {
//       return res.status(409).json({
//         error: "Doctor ID and Speciality already exist",
//         status: false,
//       });
//     }

 
//     let hashedPassword = existingDoctor[0].password;
//     if (password) {
//       if (!validatePassword(password)) {
//         return res.status(400).json({
//           error:
//             "Password must be at least 9 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.",
//           status: false,
//         });
//       }
//       hashedPassword = await bcrypt.hash(password, 10);
//     }

//     await pool.query(
//       `UPDATE ${TABLE.DOCTORS_TABLE} 
//              SET first_name = ?, last_name = ?, email = ?, phone = ?, password = ?, dob = ?, age = ?, doctor_id = ?, speciality = ?, fees = ?, updated_at = NOW() 
//              WHERE id = ? AND status = 1`,
//       [
//         first_name,
//         last_name,
//         email,
//         phone,
//         hashedPassword,
//         dob,
//         age,
//         doctor_id,
//         speciality,
//         fees,
//         id,
//       ]
//     );

//     return res
//       .status(200)
//       .json({ message: "Doctor details successfully updated", status: true });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Server error", status: false });
//   }
// });

router.put("/doctor/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res
        .status(400)
        .json({ error: "Doctor ID is required", status: false });
    }

    // Fetch existing doctor details
    const [existingDoctor] = await pool.query(
      `SELECT * FROM ${TABLE.DOCTORS_TABLE} WHERE id = ? AND status = 1`,
      [id]
    );
    if (!existingDoctor.length) {
      return res.status(404).json({ error: "Doctor not found", status: false });
    }

    // Extract provided fields from req.body
    const allowedFields = [
      "first_name",
      "last_name",
      "email",
      "phone",
      "password",
      "dob",
      "age",
      "doctor_id",
      "speciality",
      "fees",
    ];
    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (!Object.keys(updates).length) {
      return res
        .status(400)
        .json({ error: "No fields to update", status: false });
    }

    // Validate provided fields
    if (updates.phone && !/^[0-9]{10}$/.test(updates.phone)) {
      return res
        .status(400)
        .json({ error: "Phone number must be 10 digits", status: false });
    }

    if (updates.email && !validateEmail(updates.email)) {
      return res
        .status(400)
        .json({ error: "Invalid email format", status: false });
    }

    if (updates.dob && !formatDateForDB(updates.dob)) {
      return res
        .status(400)
        .json({ error: "Invalid date format for DOB", status: false });
    }

    if (updates.password) {
      if (!validatePassword(updates.password)) {
        return res.status(400).json({
          error:
            "Password must be at least 9 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.",
          status: false,
        });
      }
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    // Prepare dynamic SQL query
    const fields = Object.keys(updates)
      .map((field) => `${field} = ?`)
      .join(", ");
    const values = Object.values(updates);

    // Append updated_at field
    const updateQuery = `
      UPDATE ${TABLE.DOCTORS_TABLE}
      SET ${fields}, updated_at = NOW()
      WHERE id = ? AND status = 1
    `;
    values.push(id);

    // Execute the update query
    await pool.query(updateQuery, values);

    return res
      .status(200)
      .json({ message: "Doctor details successfully updated", status: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error", status: false });
  }
});


// Update Patient
router.put("/patient/:id",authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res
        .status(400)
        .json({ error: "Patient ID is required", status: false });
    }


    const [existingPatient] = await pool.query(
      `SELECT * FROM ${TABLE.PATIENTS_TABLE} WHERE id = ? AND status = 1`,
      [id]
    );
    if (!existingPatient.length) {
      return res
        .status(404)
        .json({ error: "Patient not found", status: false });
    }

    const { first_name, last_name, email, phone, password, age, dob, address } =
      req.body;


    if (
      !first_name ||
      !last_name ||
      !email ||
      !phone ||
      !password ||
      !age ||
      !dob ||
      !address
    ) {
      return res.status(400).json({
        error:
          "First Name, Last Name, Email, Phone, Password, Age, DOB, and Address are required fields",
        status: false,
      });
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(phone)) {
      return res
        .status(400)
        .json({ error: "Phone number must be 10 digits", status: false });
    }

    if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ error: "Invalid email format", status: false });
    }

    if (!formatDateForDB(dob)) {
      return res
        .status(400)
        .json({ error: "Invalid date format for DOB", status: false });
    }

 
    const emailExists = await checkEmailExistOrNot(TABLE.PATIENTS_TABLE, email);
    if (emailExists && email !== existingPatient[0].email) {
      return res
        .status(409)
        .json({ error: "Email already exists", status: false });
    }

 
    let hashedPassword = existingPatient[0].password;
    if (password) {
      if (!validatePassword(password)) {
        return res.status(400).json({
          error:
            "Password must be at least 9 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.",
          status: false,
        });
      }
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await pool.query(
      `UPDATE ${TABLE.PATIENTS_TABLE} SET first_name = ?, last_name = ?, email = ?, phone = ?, password = ?, age = ?, dob = ?, address = ?, updated_at = NOW() WHERE id = ?`,
      [
        first_name,
        last_name,
        email,
        phone,
        hashedPassword,
        age,
        dob,
        address,
        id,
      ]
    );

    return res
      .status(200)
      .json({ message: "Patient details successfully updated", status: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error", status: false });
  }
});


//forgot password patientc
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required', status: false });
        }

        // Check if the email exists in the patient table
        const [existingPatient] = await pool.query(
            `SELECT * FROM ${TABLE.PATIENTS_TABLE} WHERE email = ? AND status = 1`,
            [email]
        );

        if (!existingPatient.length) {
            return res.status(404).json({ error: 'Email not found', status: false });
        }

        // Generate OTP using the imported generateOTP function
        const otp = generateOTP(6); // 6-digit OTP

        // Save OTP in database (You might want to store this in a separate table or in the patients' table for verification)
        await pool.query(
            `UPDATE ${TABLE.PATIENTS_TABLE} SET otp = ?, otp_expiry = NOW() + INTERVAL 5 MINUTE WHERE email = ?`,
            [otp, email]
        );

        // Create a transporter using the SMTP details from .env
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Send OTP email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP for Password Reset',
            text: `Your OTP for password reset is ${otp}. This OTP will expire in 5 minutes.`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to send OTP email', status: false });
            } else {
                return res.status(200).json({ message: 'OTP sent to your email', status: true });
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error', status: false });
    }
});

//reset after otp patient
router.post('/reset-password', async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        // Validate input fields
        if (!email || !otp || !newPassword) {
            return res.status(400).json({ error: 'Email, OTP, and new password are required', status: false });
        }

        
    if (!validatePassword(newPassword)) {
        return res.status(400).json({
          error:
            "Password must be at least 9 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.",
          status: false,
        });
      }

      
        // Check if the email exists in the patient table
        const [patient] = await pool.query(
            `SELECT * FROM ${TABLE.PATIENTS_TABLE} WHERE email = ? AND status = 1`,
            [email]
        );

        if (!patient.length) {
            return res.status(404).json({ error: 'Email not found', status: false });
        }

        // Check if OTP is correct and not expired
        const [patientWithOtp] = await pool.query(
            `SELECT otp, otp_expiry FROM ${TABLE.PATIENTS_TABLE} WHERE email = ?`,
            [email]
        );

        const { otp: storedOtp, otp_expiry } = patientWithOtp[0];

        // Check if OTP matches and has not expired
        if (storedOtp !== otp) {
            return res.status(400).json({ error: 'Invalid OTP', status: false });
        }

        // Check OTP expiry (10 minutes window, adjust as per your requirement)
        const currentTime = new Date();
        if (currentTime > otp_expiry) {
            return res.status(400).json({ error: 'OTP has expired', status: false });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the patient's password
        await pool.query(
            `UPDATE ${TABLE.PATIENTS_TABLE} SET password = ?, otp = NULL WHERE email = ?`,
            [hashedPassword, email]
        );

        return res.status(200).json({ message: 'Password reset successfully', status: true });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error', status: false });
    }
});

// Forgot Password for Doctor
router.post('/doctor/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required', status: false });
        }

        // Check if the email exists in the doctors table
        const [existingDoctor] = await pool.query(
            `SELECT * FROM ${TABLE.DOCTORS_TABLE} WHERE email = ? AND status = 1`,
            [email]
        );

        if (!existingDoctor.length) {
            return res.status(404).json({ error: 'Email not found', status: false });
        }

        // Generate OTP
        const otp = generateOTP(6);

        // Save OTP in the database
        await pool.query(
            `UPDATE ${TABLE.DOCTORS_TABLE} SET otp = ?, otp_expiry = NOW() + INTERVAL 5 MINUTE WHERE email = ?`,
            [otp, email]
        );

        // Send OTP email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP for Password Reset',
            text: `Your OTP for password reset is ${otp}. This OTP will expire in 5 minutes.`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to send OTP email', status: false });
            } else {
                return res.status(200).json({ message: 'OTP sent to your email', status: true });
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error', status: false });
    }
});


// Reset Password for Doctor
router.post('/doctor/reset-password', async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({ error: 'Email, OTP, and new password are required', status: false });
        }

        if (!validatePassword(newPassword)) {
            return res.status(400).json({
                error: 'Password must be at least 9 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.',
                status: false
            });
        }

        const [doctor] = await pool.query(
            `SELECT * FROM ${TABLE.DOCTORS_TABLE} WHERE email = ? AND status = 1`,
            [email]
        );

        if (!doctor.length) {
            return res.status(404).json({ error: 'Email not found', status: false });
        }

      
        const [doctorWithOtp] = await pool.query(
            `SELECT otp, otp_expiry FROM ${TABLE.DOCTORS_TABLE} WHERE email = ?`,
            [email]
        );

        const { otp: storedOtp, otp_expiry } = doctorWithOtp[0];

        
        if (storedOtp !== otp) {
            return res.status(400).json({ error: 'Invalid OTP', status: false });
        }

        const currentTime = new Date();
        if (currentTime > otp_expiry) {
            return res.status(400).json({ error: 'OTP has expired', status: false });
        }

       
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await pool.query(
            `UPDATE ${TABLE.DOCTORS_TABLE} SET password = ?, otp = NULL WHERE email = ?`,
            [hashedPassword, email]
        );

        return res.status(200).json({ message: 'Password reset successfully', status: true });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error', status: false });
    }
});


router.post("/change-password", async (req, res) => {
    try {
      const { role, email, oldPassword, newPassword, confirmPassword } = req.body;
  

      if (!role || !email || !oldPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({
          error: "Role, Email, Old Password, New Password, and Confirm Password are required fields.",
          status: false,
        });
      }
  

      if (newPassword !== confirmPassword) {
        return res.status(400).json({
          error: "New password and confirm password do not match.",
          status: false,
        });
      }
  
 
      if (!validatePassword(newPassword)) {
        return res.status(400).json({
          error:
            "Password must be at least 9 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.",
          status: false,
        });
      }
  
 
      let table = "";
      if (role === "patient") {
        table = TABLE.PATIENTS_TABLE;
      } else if (role === "doctor") {
        table = TABLE.DOCTORS_TABLE;
      } else {
        return res.status(400).json({
          error: 'Role must be either "patient" or "doctor".',
          status: false,
        });
      }
  
     
      const [user] = await pool.query(`SELECT * FROM ${table} WHERE email = ? AND status = 1`, [email]);
  
      if (!user.length) {
        return res.status(404).json({ error: "User not found or inactive.", status: false });
      }
  
     
      const isOldPasswordValid = await bcrypt.compare(oldPassword, user[0].password);
  
      if (!isOldPasswordValid) {
        return res.status(400).json({ error: "Old password is incorrect.", status: false });
      }
  
      
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
   
      await pool.query(
        `UPDATE ${table} SET password = ? WHERE email = ?`,
        [hashedNewPassword, email]
      );
  
      return res.status(200).json({
        message: "Password updated successfully.",
        status: true,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error", status: false });
    }
  });
  

// Verify Token (Admin)
router.get('/admin-verifytoken', async (req, res) => {
  try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
          return res.status(400).json({ error: 'Token is required', status: false });
      }

      jwt.verify(token, API_SECRET_KEY, async (err, decoded) => {
          if (err) {
              return res.status(401).json({ error: 'Invalid or expired token', status: false });
          }

          const [result] = await pool.query(`SELECT * FROM ${TABLE.DOCTORS_TABLE} WHERE id = ?`, [decoded.data.id]);

          if (result.length === 0) {
              return res.status(404).json({ error: 'User not found', status: false });
          }

          const user = result[0];

          return res.status(200).json({
              data: {
                  ...user,
                  accessToken: token,
                  password:""
              },
              message: 'Token is valid',
              status: true
          });
      });
  } catch (error) {
      return res.status(500).json({ error: `Error occurred: ${error.message}`, status: false });
  }
});


// Get bookings for a specific doctor by doctor_id
router.get('/:doctor_id', async (req, res) => {
  try {
      const doctorId = req.params.doctor_id;

      
      if (!doctorId) {
          return res.status(400).json({ error: 'Doctor ID is required', status: false });
      }

    
      const [results] = await pool.query(`
          SELECT * 
          FROM ${TABLE.BOOKING_TABLE} 
          WHERE status = 1 AND doctor = ?
      `, [doctorId]);

      // Check if any bookings are found
      if (results.length > 0) {
          return res.status(200).json({
              data: results,
              message: 'Bookings for the doctor fetched successfully',
              status: true,
              count: results.length
          });
      } else {
          return res.status(404).json({
              error: 'No bookings found for this doctor',
              status: false
          });
      }

  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error', status: false });
  }
});

module.exports = router;
