// // src/utils/multerConfig.js
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // Create a function to get the storage configuration based on module type
// const getStorage = (moduleType) => {
//   return multer.diskStorage({
//     destination: function (req, file, cb) {
//       const uploadPath = path.join(
//         __dirname,
//         "../../public/uploads/",
//         moduleType
//       );

//       // Ensure the directory exists
//       if (!fs.existsSync(uploadPath)) {
//         fs.mkdirSync(uploadPath, { recursive: true });
//       }

//       cb(null, uploadPath);
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       cb(null, uniqueSuffix + path.extname(file.originalname));
//     },
//   });
// };

// //file types allowed
// const fileFilter = (req, file, cb) => {
//   const fileTypes = /jpeg|jpg|png/; //gif opetional
//   const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = fileTypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb(new Error("Only jpg, jpeg, and png files are allowed"));
//   }
// };


// const uploadMedicine = multer({
//   storage: getStorage("medicines"),
//   fileFilter: fileFilter,
//   limits: { fileSize: 40 * 1024 * 1024 },
// }).any();

// const uploadTest = multer({
//   storage: getStorage("bodytest"),
//   fileFilter: fileFilter,
//   limits: { fileSize: 40 * 1024 * 1024 },
// }).any();





// module.exports = {
//   uploadMedicine,
//   uploadTest
 
// };


const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Function to configure storage dynamically based on moduleType
const getStorage = (moduleType) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = path.join(__dirname, "../../public/uploads/", moduleType);

      // Ensure directory exists for the specific folder type
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });
};

// File filter for allowed file types (jpeg, jpg, png)
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Only jpg, jpeg, and png files are allowed"));
  }
};

// Middleware for uploading files to different folders
const uploadMedicine = multer({
  storage: getStorage("medicines"),  // Medicines folder
  fileFilter: fileFilter,
  limits: { fileSize: 40 * 1024 * 1024 },  // 40MB max file size
}).any();

const uploadTest = multer({
  storage: getStorage("bodytest"),  // Bodytest folder
  fileFilter: fileFilter,
  limits: { fileSize: 40 * 1024 * 1024 },  // 40MB max file size
}).any();

const uploadProfile = multer({
  storage: getStorage("profile"),  // Bodytest folder
  fileFilter: fileFilter,
  limits: { fileSize: 40 * 1024 * 1024 },  // 40MB max file size
}).any();

module.exports = {
  uploadMedicine,
  uploadTest,
  uploadProfile
};
