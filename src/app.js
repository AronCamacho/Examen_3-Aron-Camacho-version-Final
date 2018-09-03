const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      mysql = require('mysql'),
      myConnection = require('express-myconnection');
      const request=require('request');
      const async=require('async');
const app = express();


const customerRoutes = require('./routes/customer');


app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');





//conexion da la base de datos en la nube
app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: 'db4free.net',
  user: 'aroncamacho',
  password: 're1234567',
  port: 3306,
  database: 'repasoexamen'
}, 'single'));
app.use(express.urlencoded({extended: false}));



//API 
app.get('/datos',(req,res)=>{
  async.times(1,(i,callback)=>{
      var options={
          url:'https://www.datos.gov.co/resource/vetm-3sb9.json',

      }
      request(options.url,(error,response,body)=>{
        var result=JSON.parse(body);
        var data=(null,result);
        callback(null,result);
        console.log(data);
      });
    },(err,error)=>{
      res.json(error);
    })
   
  });

//CONSULTA DE DATOS LOS DATOS

app.get('/consulta',(req,res)=>{
    async.times(1,(i,callback)=>{
       var options={
        url:'https://www.datos.gov.co/resource/vetm-3sb9.json',
       }
       request(options.url,(error,response,body)=>{
         var result=JSON.parse(body);
         var dato=(null,result);
         //var aux='';
        // dato.forEach(function(posicion){
          //aux=aux+posicion[1];
          console.log(result[1].dato);
          callback(null,result[1].dato);
         });
       },(err,error)=>{
        res.json(error);
       
       });
    });
//});


/*app.get('/consulta2', (req,res) =>{
  async.times(1,(i,callback)=>{
    var options ={
      url:'https://www.datos.gov.co/resource/2r8y-vqxz.JSON',
    }
    request(options.url, (error,response,body) =>{
      var result = JSON.parse(body);
      var dato= result.result.records;
      req.getConnection(function(err, connection){
      dato.forEach(function(posicion){
       console.log(posicion.dato);
          var data = {
                  Nombre : posicion.email,
                  Pais : posicion.red,
                  Provincia : posicion.municipio,
                  Ciudad : posicion.minicipio,
                  latitud : posicion.nivel,
                  longitud : posicion.nivel,
                  Tipo : posicion.gerente
        };
        var sql_api = 'Insert into turisticos.lugares set ?';
        var query= connection.query(sql_api,data, function(err, rows){
          if(err)
            console.log("Error de carga : %s", err);
              });
           });
        
    });
    callback(null, data);

  }, (err, error) => {  
    res.json(error);
  });
})
*/





   

// routes
app.use('/', customerRoutes);

// static files
//app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
