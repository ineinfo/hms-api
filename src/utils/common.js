const pool = require('../utils/db');
const TABLE = require('../utils/tables');

const multer = require('multer');

function multerErrorHandler(err, req, res, next) {
    if (err) {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ error: 'File size must be less than 5KB', status: false });
            }
        }
        return res.status(400).json({ error: err.message, status: false });
    }
    next();
}





// Generate OTP
function generateOTP(digits) {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(min + Math.random() * (max - min + 1)).toString();
}
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;
  return emailRegex.test(email);
}
function validatePhone(phone) {
  const mobileRegex = /^[0-9]{10}$/;
  return mobileRegex.test(phone);
}


// Check email exists or not
const checkEmailExistOrNot = async (tableName, email, ID = null) => {
  try {
      let sql = 'SELECT * FROM ' + tableName + ' WHERE email = ? and status = 1';
      const values = [email];

      if (ID !== null) {
          sql += ' AND id != ?';
          values.push(ID);
      }

      const [rows] = await pool.query(sql, values);
      return rows.length > 0;
  } catch (error) {
      console.error('Error occurred while checking email:', error);
      throw new Error('Failed to check email existence');
  }
}

// Check mobile exists or not
const checkPhoneExistOrNot = async (tableName, phone, ID = null) => {
  try {
      let sql = 'SELECT * FROM ' + tableName + ' WHERE phone = ? and status = 1';
      const values = [phone];

      if (ID !== null) {
          sql += ' AND id != ?';
          values.push(ID);
      }

      const [rows] = await pool.query(sql, values);
      return rows.length > 0;
      // return !!rows.length; // Returns true if phone exists, false otherwise
  } catch (error) {
      console.error('Error occurred while checking phone:', error);
      throw new Error('Failed to check phone existence');
  }
}

// Manage API Response Status
function ManageResponseStatus(action) {
  const defaultTitles = {
      created: 'Record Successfully Created',
      updated: 'Record Successfully Updated',
      deleted: 'Record Successfully Deleted',
      fetched: 'Record Successfully Fetched',
      alreadyDeleted: 'Record Already Deleted',
      notFound: 'Sorry, Record Not Found',
      error: 'Something Went Wrong!',
      exist: 'Record Already Exist!',
      RowIdRequired: 'RowID must be required',
  };
  return defaultTitles[action];
}

// Password validation - Password must be at least 9 characters long and contain at least one uppercase letter, one lowercase letter and one special character.
function validatePassword(password) {
  // Minimum length check
  if (password.length < 9) {
      return false;
  }

  // Uppercase, lowercase, and special characters check
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const specialCharactersRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  const hasUppercase = uppercaseRegex.test(password);
  const hasLowercase = lowercaseRegex.test(password);
  const hasSpecialCharacters = specialCharactersRegex.test(password);

  // Check if all conditions are met
  return hasUppercase && hasLowercase && hasSpecialCharacters;
}

function formatDateForDB(dateStr) {
  const [day, month, year] = dateStr.split('-');
  const fullYear = year.length === 2 ? `20${year}` : year;
  return `${fullYear}-${month}-${day}`;
}

const validateDate = (date) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
      return { error: 'Invalid date format. Please use yyyy-mm-dd.' };
  }
  return null;
};

// Function to validate the time format (hh:mm AM/PM)
const validateTime = (time) => {
  const timeRegex = /^(0[1-9]|1[0-2]):([0-5][0-9])\s([APap][Mm])$/;
  if (!timeRegex.test(time)) {
      return { error: 'Invalid time format. Please use hh:mm AM/PM.' };
  }
  return null;
};

// Function to convert time from AM/PM to 24-hour format
const convertTo24HrFormat = (time) => {
  let timeIn24HrFormat = time;
  if (time.includes('AM') || time.includes('PM')) {
      const [timeStr, period] = time.split(' ');
      let [hour, minute] = timeStr.split(':');
      hour = parseInt(hour);

      // Convert to 24-hour format
      if (period.toUpperCase() === 'PM' && hour < 12) {
          hour += 12; // Convert PM to 24-hour time
      }
      if (period.toUpperCase() === 'AM' && hour === 12) {
          hour = 0; // Convert 12 AM to 00:00
      }

      // Format time as hh:mm
      timeIn24HrFormat = `${hour < 10 ? '0' + hour : hour}:${minute}`;
  }
  return timeIn24HrFormat;
};




module.exports = {
  generateOTP,
  validateEmail,
  ManageResponseStatus,
  checkEmailExistOrNot,
  checkPhoneExistOrNot,
  validatePassword,
  multerErrorHandler,
  formatDateForDB,
  validateDate,
    validateTime,
    convertTo24HrFormat,
    validatePhone
 

}
