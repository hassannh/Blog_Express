
import mysql from "mysql2"
// import {database} from './app.js'


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog',
});

connection.connect()






/////////////////////////////////////POST CRUD////////////////////////////////////




export function getPosts(req, res ) {

  // console.log("im in");

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


  

  // export function insertPosts(req, res) {
  //   const { title, description, author, picture, category_id } = req.body;
  
  //   const post = 'INSERT INTO post (title, description, author, picture, category_id) VALUES (?, ?, ?, ?, ?)';
  //   const values = [title, description, author, picture, category_id];
  
  //   connection.query(post, values, (err, result) => {
  //     if (err) {
  //       console.error('Error inserting data:', err);
  //       res.status(500).send('Error inserting data');
  //     } else {
  //       console.log('Data inserted successfully:', result);
  //       res.redirect('/');
  //     }
  //   });
  // }




export function insertPosts(req,res ,callback) {


  const request = req.body;

  console.log(request);
  
  // const { category_name } = req.body;
console.log('Category name from request:', category_name);


  const getCategoryName = 'SELECT id FROM category WHERE category_name = ?';

  connection.query(getCategoryName, [category_name], (err, result) => {

      console.log('result', result);

      if (err) {
          console.error('Error retrieving category ID: ' + err.message);
          return callback(err);
      }

      if (result.length === 0) {
          console.error('Category not found');
          return callback(new Error('Category not found'));
      }

      const categoryId = result[0].id;


      console.log(categoryId);

      
      const insertPostSql = 'INSERT INTO post (title, description, date, author, picture) VALUES (?, ?, ?, ?, ?)';
      const postValues = [title, description, date, author, picture];

      connection.query(insertPostSql, postValues, (err, postResult) => {
          if (err) {
              console.error('Error inserting post: ' + err.message);
              return callback(err);
          }


          console.log('Inserted post with ID ' + postResult.insertId);



          // Now, insert the association into the 'Post_category' table
          const insertPostCategory = 'INSERT INTO Post_category (post_id, category_id) VALUES (?, ?)';
          const categoryValues = [postResult.insertId, categoryId];

          connection.query(insertPostCategory, categoryValues, (err) => {
              if (err) {
                  console.error('Error associating category with post: ' + err.message);
                  return callback(err);
              }
              console.log('Associated category with post');
              callback(null, postResult.insertId);
          });
      });
  });

  // res.redirect('/');
}



  

/////////////////////////////////////POST CRUD END ////////////////////////////////////

 


/////////////////////////////////////category CRUD START ////////////////////////////////////


export function insertCategory(req, res){
  const {category_name} = req.body;

  console.log(category_name);

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


  const categoryId  = req.params.categoryId

  let new_category_name = "sidati"

  console.log(categoryId);
  console.log(new_category_name);


  const updateQuery = 'UPDATE category SET category_name = ? WHERE id = ?';
  const values = [new_category_name , categoryId];

  connection.query(updateQuery, values, (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).send('Error updating data');
    } else {
      console.log('Data updated successfully:', result);
      res.redirect('/category');
    }
  });
}





export function deleteCategory(req, res) {

  const categoryId = req.params.categoryId; 

  console.log(categoryId);

  const deleteQuery = 'DELETE FROM category WHERE id = ?'
  const values = [categoryId];

  connection.query(deleteQuery, values, (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).send('Error deleting data');
    } else {
      console.log('Data deleted successfully:', result);
      res.redirect('/category');
    }
  });
}





