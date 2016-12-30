var request = require('request');

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var url = 'http://localhost:8081/';

// testing the api
function testNodeAPI() {
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    });
};

// post method
function getNameAge (data) {
    
    request.post({
            url: url,
            form: data
        },
        function (err, res, body) {
            parsedRes = JSON.parse(body);
            console.log(parsedRes.name + "=" + parsedRes.age);
        })
};
 
//testNodeAPI();
rl.question('Please give a name: ', (answer) => {
  console.log(`Thank you for your Name : ${answer}`);
  formData = JSON.parse('{ "name": "' + answer + '", "age": 27 }');
  getNameAge(formData);
  rl.close();
});
