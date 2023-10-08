
import { render } from "ejs";
import mysql from "mysql2"


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog',
});

connection.connect()






/////////////////////////////////////POST CRUD////////////////////////////////////




export function getPosts(req, res ) {

  console.log("im in");

  let query = 'SELECT post.*, category.* FROM post INNER JOIN post_category ON post.id = post_category.post_id INNER JOIN category ON post_category.category_id = category.id';

  
  if (req.params.cat) {
      query += ` WHERE category.category_name = '${req.params.cat}'`;
  }

  const searchValue = req.query.search;
  
  if (searchValue) {
    console.log(searchValue);

    if (req.params.cat = searchValue) {
      query += ` AND (post.title LIKE '%${searchValue}%' OR post.description LIKE '%${searchValue}%')`;
    } else {
      query += ` WHERE post.title LIKE '%${searchValue}%' OR post.description LIKE '%${searchValue}%'`;
    }
  }

  connection.query(query, (err, posts, fields) => {
      if (err) throw err;


      posts.forEach(post => {
        if (post.date instanceof Date) {
          post.date = post.date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });
        }
      });
         
      res.render('index', { posts });
  });
}





  export  function getOnePost(req, res){
    console.log(res.params);
    const postId = req.params.postId;

    connection.query(`SELECT * FROM post WHERE id = ${postId}`, (err, post, fields) => {
      if (err) throw err;

      console.log(post)
      res.render('postDetails', {post: post[0]})
      
    })
   
  }


  

  export function insertPosts(req, res) {
    const { title, description, author, picture, category_id } = req.body;
  
    const post = 'INSERT INTO post (title, description, author, picture, category_id) VALUES (?, ?, ?, ?, ?)';
    const values = [title, description, author, picture, category_id];
  
    connection.query(post, values, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Error inserting data');
      } else {
        console.log('Data inserted successfully:', result);
        res.redirect('/');
      }
    });
  }
  

/////////////////////////////////////POST CRUD END ////////////////////////////////////

 


/////////////////////////////////////category CRUD START ////////////////////////////////////


export function insertCategory(req, res){
  const {category_name } = req.body;
  const category = 'INSERT INTO category (category_name) VALUES (?)';
  const values = [category_name];

  connection.query(category, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data');
    } else {
      console.log('Data inserted successfully:', result);
      res.redirect('/category');
    }
  });
    
}


export function getCategory(req ,res){

  
  connection.query('SELECT * FROM category', (err, categories, fields) => {
    if (err) throw err;

    console.log(categories);

    res.render('category', { categories });
  });
}


export function getAllCategories(req ,res){

   
  connection.query('SELECT * FROM category', (err, categories, fields) => {
    if (err) throw err;

    console.log(categories);

    res.render('post', { categories });
  });
}

export function updateCategory(req, res) {
  const categoryId = req.params.id; 
  const updatedCategoryData = req.body; // Assuming you receive updated category data in the request body


  connection.query(
    'UPDATE category SET ? WHERE id = ?',
    [updatedCategoryData, categoryId],
    (err, result) => {
      if (err) {
        console.error('Error updating category:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Category not found' });
        return;
      }

      res.status(200).json({ message: 'Category updated successfully' });
    }
  );
}



