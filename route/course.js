const courseService = require('../service/course/courseService');

function addCourse(req, res) {
    courseService.addCourse(req, res);
}

function getCourses(req, res) {
    courseService.getCourses(req, res);
}

module.exports.addCourse = addCourse;
module.exports.getCourses = getCourses;