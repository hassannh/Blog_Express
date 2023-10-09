import express from "express";
import path from "path";
import { getPosts, insertPosts ,insertCategory , getCategory ,getOnePost ,getAllCategories, deleteCategory ,updateCategory} from './home.js';
import mysql from "mysql2";
import bodyParser from 'body-parser';
import multer from 'multer';












const storage = multer.diskStorage({
    destination: (req, file,cb)=>{

    cb(null,'uploadedpic')
},
filename: (req,file,cb)=>{
    console.log(file);
    cb(null, path.extname(file.originalname))
}
})



const upload = multer({storage: storage})
const app = express();
const port = 5000;





app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));



const __dirname = path.resolve();
app.use(express.static(__dirname));




app.set('view engine', 'ejs');


export function database(){


    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'blog',
    });
    
    
    connection.connect();

}











app.get('/filter/:cat', getPosts);
app.get('/', getPosts);
app.post('/createPost',  insertPosts ,upload.single("image"));



// app.post('/creat', (req, res) => {
//     const body = req.body;
//     console.log(body);
// })

// upload.single("image")
app.get('/post',getAllCategories);








// app.get('/category', (req, res) => {
//     res.render('category');
// });

app.get('/category', getCategory);

app.post('/category', insertCategory);

app.get('/delete_category/:categoryId', deleteCategory);

app.get('/update_category/:categoryName', updateCategory);

// /delete-category

// /delete/category




app.get('/Contact', (req, res) => {
    res.render('contact');
});



app.get('/postDetails/:postId', getOnePost);




app.listen(port, () => console.log(`The server is running on port ${port}`));



// You should also consider adding code to properly close the database connection when your application exits.
// connection.end();
