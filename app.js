//jshint esversion:6

//  load libraries
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");

// nonsense starting content for each page
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// array that will hold JS objects {title: title, content: content}
var blogs = [];

// standard express app stuff
// use bondyParser for requests
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// root page show home and blog content
// see views/home.ejs for truncation and link to readmore page
app.get("/", function(req, res){
  var data = {
startingContent:homeStartingContent,
theBlogs:blogs
  }
res.render("home", data);
})

// go to sub pages
app.get("/about", function(req, res){
res.render("about", {about:aboutContent});
})
app.get("/contact", function(req, res){
res.render("contact", {contact:contactContent});
})

// Compose page is 2 text boxes {title: title, content:content}
app.get("/compose", function(req, res){
res.render("compose");
})

// go to home page and see your post
app.post("/compose", function(req, res){
const blog = {
  title: req.body.blogTitle,
  content: req.body.blogPost
};
blogs.push(blog);
res.redirect("/");
})

// no 404 page currently
// render blog posts from blogs array using views/post.ejs template
app.get("/posts/:blogPost", function(req, res){
  const blogSearch = _.lowerCase(req.params.blogPost);

  blogs.forEach(function(blog){
    const storedTitle = _.lowerCase(blog.title);

    if(storedTitle === blogSearch){
   const selectedBlog = {
     selectedBlogTitle: blog.title,
     selectedBlogContent: blog.content
   }
    res.render("post", selectedBlog);
  }

  })

})

// listen locally 
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
