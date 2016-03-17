var async = require('async');
var thrift = require('thrift');
var HelloService = require('./gen-nodejs/HelloService');

// var connection = thrift.createConnection("localhost", 8090);

// connection.on('error', function(err) {
//     console.log(err);
// });

// // Create a Calculator client with the connection
// var client = thrift.createClient(HelloService, connection);

// client.helloString('你好', function(err, res) {
//     console.log(err, res);
// });


var start = Date.now();
async.timesLimit(10000, 10, function(n, cb) {
    if (n % 1000 === 0) console.log('fin: ', n, Date.now() - start);

    var connection = thrift.createConnection("localhost", 8090);
    connection.on('error', function(err) {
        console.log(err);
    });

    var client = thrift.createClient(HelloService, connection);

    client.helloString('你好' + n, function(err, res) {
        connection.end();
        cb(null, res);
    });

    // 5000 100 1050
    // 5000 500 1050
    // client.helloString('你好' + n, cb);
}, function(err) {
    console.log('done: ', Date.now() - start);
})
