
const {Blog, Author} = require('../../model');

function addAuthor(req, res) {
     let data = req.body;
     let author = new Author({
         firstName: data.firstName,
         lastName: data.lastName,
         nationality: data.nationality
     });

     createAuthor(author)
        .then(() => res.status(200).send(author))
        .catch((error) => res.status(400).send(error));
}

async function createAuthor(author) {
    try {
        return await author.save();
    } catch (error) {
        console.log('Error in creating new author ', error);
        return Promise.reject(error);
    }
}

function addBlog(req, res){
    let data = req.body;
    let blog = new Blog({
        name: data.name,
        category: data.category,
        author: data.author
    });

    createBlog(blog)
        .then(() => res.status(200).send(blog))
        .catch((error) => res.status(400).send(error));
}

async function createBlog(blog) {
    try {
        return await blog.save();
    } catch (error) {
        console.log('Error in creating new blog ', error);
        return Promise.reject(error);
    }
}

function getBlogs(req, res){
    getBlogsByPagination()
        .then((blogs) => res.status(200).send(blogs))
        .catch((error) => res.status(400).send(error));
}

async function getBlogsByPagination(){
    try {
        return await Blog.find()
            .populate('author', 'firstName lastName -_id')
            .select('name category author');
    } catch (error) {
        console.log('Error in fetch new blogs ', error);
        return Promise.reject(error);
    }
}

module.exports.addAuthor = addAuthor;
module.exports.addBlog = addBlog;
module.exports.getBlogs = getBlogs;