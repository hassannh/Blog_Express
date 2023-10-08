import express from "express";
import path from "path";
import { getPosts, insertPosts ,insertCategory , getCategory ,getOnePost ,getAllCategories} from './home.js';
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

// Use bodyParser middleware to parse JSON and form data
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));



const __dirname = path.resolve();
app.use(express.static(__dirname));




app.set('view engine', 'ejs');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog',
});


connection.connect();









app.get('/filter/:cat', getPosts);
app.get('/', getPosts);


app.get('/post',getAllCategories );

app.post('/post', upload.single("image") , insertPosts);




// app.get('/category', (req, res) => {
//     res.render('category');
// });

app.get('/category', getCategory);

app.post('/category', insertCategory);




// app.get('/postDetails', (req, res) => {
//     res.render('postDetails');
// });



app.get('/postDetails/:postId', getOnePost);




app.listen(port, () => console.log(`The server is running on port ${port}`));



// You should also consider adding code to properly close the database connection when your application exits.
// connection.end();
