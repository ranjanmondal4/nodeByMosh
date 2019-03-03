const Model = require('../../model/index');
const Course = Model.Course;

/**
 * Creates new course
 * 
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
function addCourse(req, res){
    let data = req.body;
    let course = new Course({
        name: data.name,
        category: data.category,
        author: data.author,
        tags: data.tags,
        isPublished: data.isPublished,
        date: data.date,
        price: data.price
    });
    createCourse(course)
        .then(() =>  res.status(200).send(course))
        .catch(error => res.status(400).send(error));
}

/**
 * Saves the course object in the database
 * @param {Object} course - The course object to saved in database
 */
async function createCourse(course){
    try {
        return await course.save();
    } catch (error) {
        console.log('Error in creating new course ', error);
        return Promise.reject(error);
    }
}

/**
 * Fetches the list of courses through paginations
 * 
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
function getCourses(req, res) {
   const pageNumber = parseInt(req.query.pageNumber);
   const pageSize = parseInt(req.query.pageSize);
   getCoursesByPagination(pageNumber, pageSize)
        .then(courses => res.status(200).send(courses))
        .catch(error => res.status(400).send(error));  
}

/**
 * Fetches courses from database by page number and pagesize
 * 
 * @param {*} pageNumber - The pagenumber like 1, 2, etc
 * @param {*} pageSize - The number of elements in each page eg. 10
 */
async function getCoursesByPagination(pageNumber, pageSize){
     try {
        return await Course
            .find({author: 'Mosh', isPublished: true})
            .skip((pageNumber-1) * pageSize)
            .limit(pageSize)
            .sort({name: 1})
            .select({name: 1, tags: 1});
      //return Promise.reject(new Error('Custom Exception'));
     } catch (error) {
        console.log('Error in fetching courses ', error);
        return Promise.reject(error);
     }
}

module.exports.addCourse = addCourse;
module.exports.getCourses = getCourses;