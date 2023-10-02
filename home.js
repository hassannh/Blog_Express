
import mysql from "mysql2"


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog',
});

connection.connect()






/////////////////////////////////////POST CRUD////////////////////////////////////



//////////////// get function ///////////////


export function getPosts(req, res) {
    connection.query('SELECT post.*, category.* FROM post INNER JOIN post_category ON post.id = post_category.post_id INNER JOIN category ON post_category.category_id = category.id;', (err, posts, fields) => {
      if (err) throw err;
  
      console.log(posts);
  
      res.render('index', { posts }); // 'index' should be the name of EJS template
    });
  }
  


  //////////////// insert function ///////////////



  export function insertPosts(req, res) {
    const { title, description, author, picture } = req.body;
  
    const sql = 'INSERT INTO post (title, description, author, picture) VALUES (?, ?, ?, ?)';
    const values = [title, description, author, picture];
  
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Error inserting data');
      } else {
        console.log('Data inserted successfully:', result);
        res.redirect('/');
      }
    });
  
  }

//////////////// update function ///////////////








  
//   connection.end()



























// connection.query('SELECT * from post', (err, rows, fields) => {
//     if (err) throw err
  
//     console.log(rows)
//   })

