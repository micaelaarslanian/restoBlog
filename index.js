import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;


//Step 3 - Make the styling show up.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

let blogEntries = [];

app.post("/submit", (req, res) => {
  // si recibo el indice, entonces es una edicion,
  // entonces busco el indice de ese elemento y lo reemplazo
  // si no recibo el indice, entonces es un nuevo elemento
  const title = req.body.title;
  const author = req.body.author;
  const feedback = req.body.feedback;
  const index = req.body.index;

  var blogEntry = { title: title, author: author, feedback: feedback };

  //si el indice esta indefinido (porque es una entry nueva), entonces meterlo en la lista de blog entries
  if ( index == undefined) {
    blogEntries.push(blogEntry);

  //si el indice ya esta definido (porque es una edicion), entonces reemplazar el elemento en la lista de blog entries
  } else {
    blogEntries[index] = blogEntry;
  }

  res.redirect("/");

});

//renders the 'index.ejs' page with the blogEntries array
app.get("/", (req, res) => {
  res.render("index.ejs", { blogEntries: blogEntries });
});


//allows to delete a blog entry using delete request triggered by the delete button 
app.post("/delete", (req, res) => {
  //find the index of the array that the 'delete' button is being clicked on
  const index = req.body.index;

  //remove the element from the array
  blogEntries.splice(index, 1);
  res.redirect("/");
  });


//allows to edit a blog entry using post request triggered by the edit button
app.post("/edit", (req, res) => {
    const index = req.body.index;

    const blogEntry = blogEntries[index];

    //assigns the element to be edited to a variable
     console.log(blogEntry);

    // renders the 'editBlog.ejs' page with the index of the element to be edited printed on each input of the form
    res.render("editBlog.ejs", { blogEntry: blogEntry, index: index });   
  
  });


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
