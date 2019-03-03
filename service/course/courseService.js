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
        author: data.author,
        tags: data.tags,
        date: data.date,
        isPublished: data.isPublished
    });
    createCourse(course)
        .then(() =>  {
            res.status(200).send(course);
        })
        .catch(error => res.status(400).send(error));
}

/**
 * Saves the course object in the database
 * @param {Object} course - The course object to saved in database
 */
async function createCourse(course){
    try {
        course = await course.save();
    } catch (error) {
        console.log('Error in creating new course ', error);
    }
}

function getCourses(req, res) {
   getCoursesByPagination(10)
    .then(courses => res.status(200).send(courses))
    .catch(error => res.status(400).send(error));
}

async function getCoursesByPagination(limit){
     try {
        const courses = await Course
            .find({author: 'Mosh', isPublished: true})
            .limit(limit)
            .sort({name: 1})
            .select({name: 1, tags: 1});
      //  return Promise.resolve(courses);
      return Promise.reject(new Error('Custom Exception'));
     } catch (error) {
        console.log('Error in fetching courses ', error);
        return Promise.reject(error);
     }
}

module.exports.addCourse = addCourse;
module.exports.getCourses = getCourses;