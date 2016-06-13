// inclusiones requeridas
var http = require('http');
var dispatcher = require('httpdispatcher');
var qs = require('querystring');
const PORT=8080;

/*
  GET /registro
  Devuelve text/html con un formulario sencillo que pide
  por nombre y apellido. La acción de este formulario es
  /registro (la misma), y el verbo es POST.
*/
dispatcher.onGet("/registro", function(req, res) {
  res.statusCode = 200; // siempre exito
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Powered-By', 'PUCMM');

  res.write('<html>');
  res.write('<body>');
  res.write('<h1>HOLA!</h1>');
  res.write('<form method="post" action="/registro">')
  res.write('<input type="text" name="nombre" id="nombre"/>')
  res.write('<input type="text" name="apellido" id="apellido"/>')
  res.write('<input type="submit" value="ENVIAR!" />')
  res.write('</form>')
  res.write('</body>');
  res.write('</html>');
  res.end();
});

/*
  POST /registro
  Recibe la data del formulario GET /registro, la imprime en consola
  y redirecciona a /recibo.
  */

dispatcher.onPost("/registro", function(req, res) {
  res.statusCode = 301;
  res.setHeader('Location', '/recibo');
  res.setHeader('X-Powered-By', 'PUCMM');
  console.log('query string:' + req.body);
  var postData = qs.parse(req.body);
  var nombre = postData["nombre"];
  var apellido = postData["apellido"];
  console.log("Nombre: " + nombre + ", Apellido: " + apellido);
  res.end();
});

/*
  GET /recibo
  Deveulve text/html con un simple mensaje de "Registrado".
*/
dispatcher.onGet("/recibo", function(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Powered-By', 'PUCMM');

  res.write('<html>');
  res.write('<body>');
  res.write('<h1>HOLA!</h1>');
  res.write('REGISTRADO!');
  res.write('</form>')
  res.write('</body>');
  res.write('</html>');
  res.end();
});

// Subir el servidor
function handleRequest(request, response) {
  try {
    console.log('Recibi: ' + request.method + " " + request.url);
    dispatcher.dispatch(request, response);
  }
  catch (err) {
    console.log('Error:' + err);
  }
}

var server = http.createServer(handleRequest);
server.listen(PORT, function(){
    console.log("Escuchando en el puerto %s:", PORT);
});
