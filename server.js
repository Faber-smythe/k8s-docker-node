const express = require('express');
const axios = require('axios')
const app = express();
const router = express.Router();

const path = __dirname+'/views/';
const port = 8080

router.use(function (req,res,next) {
    console.log('/' + req.method);
    next();
  });
  
  router.get('/html', function(req,res){
    res.sendFile(path + 'index.html');
  });
  

  router.get('/jokes', async function(req,res){
    let result = await getJokes()
    // res.json(foo);
    console.log(result.data)
    res.json(result.data);
  });

  const getJokes = async () => {
    try {
      return await axios.get('https://official-joke-api.appspot.com/jokes/ten')
    } catch (error) {
      console.error(error)
    }
  }



app.use(express.static(path));
app.use('/', router);

app.listen(port, function () {
  console.log('The API is listening on port 8080!')
})