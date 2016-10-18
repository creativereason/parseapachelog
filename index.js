var filePath = "";
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(filePath)
});
//todo: pass the path as a readline question for the console...
var parse = require('clf-parser');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'user',
  password : '*********',
  database : '&&&&%%%%%%==='
});
file_row_count = 0;
var i = 0;
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});
lineReader.on('line', function (line) {
  // console.log('Line from file:', line);
  var parsed = parse(line);
  // console.log(parsed);
  var split = parsed['remote_addr'].split(' ');
  var url = split[0].replace(":80", "");
  var ip_address = split[1];
  // ip_address = parsed
  var post  = {
    remote_addr: parsed['remote_addr'], 
    ip_address: ip_address,
    time_local: parsed['time_local'],
    request: parsed['request'],
    status: parsed['status'],
    bytes_transferred: parsed['body_bytes_sent'],
    http_referer: parsed['http_referrer'],
    http_user_agent: parsed['http_user_agent'],
    http_method: parsed['http_method'],
    method: parsed['method'],
    path: parsed['path'],
    protocol: parsed['protocol'],
    file_row_count: i++,
    url: url
  };
  var query = connection.query('INSERT INTO import SET ?', post, function(err, result) {
    // Neat!
    if (err != null) {
      console.log("error on row#: " + i);
      console.log(parsed);
      console.log(err);
      // process.exit(1);
      //  connection.destroy();
    }
    // console.log(result);
    // console.log(query);
  }
});
// connection.destroy();
// console.log('finished processing...');
// process.exit();
//todo: close connection 


