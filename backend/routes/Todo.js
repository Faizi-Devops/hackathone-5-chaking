const express= require ("express")
const router = express.Router();
const { body, validationResult } = require('express-validator');
const {createTodo,getAllTodo,deleteTodo,updateTodo} = require("../controllers/Todo");
const uploadToCloudinary = require("../helper/upload")
const multer = require('multer');
var uploader = multer();
router.post(
  '/add-todo',
  uploader.single('file'),
  [
    // Validation using express-validator
    body('title').notEmpty().withMessage('Title is required').isString().withMessage('Title must be a string').trim().matches(/^[A-Za-z\s]+$/).withMessage('Title must contain only alphabetic characters'),
    body('brand').notEmpty().withMessage('Brand is required').isString().withMessage('Brand must be a string').trim().withMessage('Brand must contain only alphabetic characters'),
    body('description').notEmpty().withMessage('Description is required').isString().withMessage('Description must be a string').trim(),
    body('price').notEmpty().withMessage('Price is required').isNumeric().withMessage('Price must be a number'),
  ],createTodo // Function responsible for creating a new Todo
);
router.get('/get-todo',getAllTodo);
router.delete('/delete-todo/:id',deleteTodo);
router.put('/update-todo/:id',
[
    // Validation using express-validator
    body('title').notEmpty().withMessage('Title is required').isString().withMessage('Title must be a string').trim(),
    body('brand').notEmpty().withMessage('Brand is required').isString().withMessage('Brand must be a string').trim(),
    body('description').notEmpty().withMessage('Description is required').isString().withMessage('Description must be a string').trim(),
    body('price').notEmpty().withMessage('Price is required').isNumeric().withMessage('Price must be a number'),
    
  ]
,updateTodo);

module.exports = router;