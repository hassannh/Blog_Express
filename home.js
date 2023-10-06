
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



export function getPosts(req, res) {
    connection.query('SELECT post.*, category.* FROM post INNER JOIN post_category ON post.id = post_category.post_id INNER JOIN category ON post_category.category_id = category.id;', (err, posts, fields) => {
      if (err) throw err;
    
  
      console.log(`Number of posts: ${posts.length}`);
    console.log(posts);
  
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


  // function getCategoryID(categoryName, callback) {
  //   const sql = 'SELECT id FROM category WHERE category_name = ?';
  //   connection.query(sql, [categoryName], (err, results) => {
  //     if (err) {
  //       callback(err, null);
  //     } else if (results.length === 0) {
  //       callback('Category not found', null);
  //     } else {
  //       const categoryId = results[0].id;
  //       callback(null, categoryId);
  //     }
  //   });
  // }
  

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



  
//   connection.end()



























// connection.query('SELECT * from post', (err, rows, fields) => {
//     if (err) throw err
  
//     console.log(rows)
//   })

