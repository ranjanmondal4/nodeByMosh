const express = require('express');
const router = express.Router();

const course = require('./course');


// get balance by account
router.get('/api/v1/courses', function (req, res) {
     course.getCourses(req, res);
});

// get balance by account
router.post('/api/v1/course', function (req, res) {
    course.addCourse(req, res);
});

module.exports = router;