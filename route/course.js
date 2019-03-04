const express = require('express');
const router = express.Router();
const courseService = require('../service/course/courseService');


router.get('/', function (req, res) {
    courseService.getCourses(req, res);
});

router.post('/', function (req, res) {
    course.addCourse(req, res);
});

module.exports = router;