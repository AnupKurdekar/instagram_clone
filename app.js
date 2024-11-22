const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const {v4 : uuidv4} = require("uuid");

const newUuid = uuidv4();
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","views");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

let data = [

 {

        username : "Anup Kurdekar",
        id : uuidv4(),
        post : "https://i.pinimg.com/736x/f1/ff/87/f1ff87319a1457b61176eed85ef703f8.jpg",
        caption : "a tree gives us oxygen"
    },
   {
        username : "chandan kubasad",
        id : uuidv4(),
        post : "https://i.pinimg.com/736x/19/e1/3c/19e13c58ff5cf5ffe040169d30751737.jpg",
        caption : "a tree gives us oxygen"
    },
    {
        username : "varun dhotargavi",
        id : uuidv4(),
        post : "https://www.shutterstock.com/image-illustration/full-moon-hd-260nw-219135316.jpg",
        caption : "a tree gives us oxygen"
    },
    {
        username : "goutam bhat",
        id : uuidv4(),
        post : "https://www.shutterstock.com/image-illustration/full-moon-hd-260nw-219135316.jpg",
        caption : "a tree gives us oxygen"
    },
];
const port = 9090;
console.log(data);
app.listen(port , () =>{
    console.log("app is listening");
});

app.get('/ig/home' , (req,res) =>{
    res.render("home.ejs", {data});
});

app.get('/ig/new' , (req,res) =>{
    res.render("new.ejs");
});

app.post('/ig/new', (req,res) =>{
    let {username ,post ,caption} = req.body;
    let newpost = {
        username : username,
        id : uuidv4(),
        post : post,
        caption : caption
    };
    data.push(newpost);
    res.redirect("/ig/home");
});
app.get("/ig/post/:id" , (req,res) =>{
    let {id} = req.params;

   let post =  data.find(data => data.id === id);
    console.log(post);
   if(post) {
    res.render("post.ejs",{post});
   }
   res.send("page not found");

});
app.get("/ig/delete/:id" , (req,res) =>{
    let {id} = req.params;
     
   let content = data.findIndex(item => item.id === id);
   
   if(content != 0){
    data.splice(content,1);
    res.redirect("/ig/home");
   }

    
});
