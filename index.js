const express = require('express');

const app = express();

app.use(express.static('static'));

app.get('/', (req, res) => {
 res.sendFile(__dirname+'/index.html');
});



app.post('/',(req,res)=>{
  res.send("This is post");
});

app.put('/',(req,res)=>{
res.send("This is put");
}
);


app.get('/Game', (req, res)=>{
  res.sendFile(__dirname+'/game.html');
});

app.get('*',(req, res)=>{
  res.status(404).sendFile(__dirname+'/404.html');
});

app.get('/login', (req, res)=>{
  res.sendFile(__dirname+'/login.html');
});

app.delete('/products',(req,res)=>{
  res.send("Products Page");
});


app.listen(3000, () => {
  console.log('server started');
});
