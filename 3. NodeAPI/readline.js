const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please give a device ID: ', (answer) => {
  console.log(`Thank you for your device ID : ${answer}`);
  rl.close();
});
