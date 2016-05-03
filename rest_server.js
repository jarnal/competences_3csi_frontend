var express = require('express');
var app = express();

var classe = `{
  "class": [
    "3CSI",
    "MS2I",
    "SN"
  ]
}
`
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/class', function (req, res) {
  res.type('text/json'); // set content-type
  res.send(classe)
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})
