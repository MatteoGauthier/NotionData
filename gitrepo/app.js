const prompts = require('prompts');
var response;
(async () => {
    response = await prompts(
        {
            type: 'password',
            name: 'value',
            message: 'Your Github Password',
            validate: value => value.length < 8 ? `Password is at least 8 characters` : true
    });
  
    console.log(response); // => { value: 24 }
  })();


setTimeout(() => {
    console.log(response);
}, 5000);
/*
const USER = 'MattixNow';
const PASS = process.env;
const REPO = 'github.com/username/private-repo';




const git = require('simple-git/promise');
const remote = `https://${USER}:${PASS}@${REPO}`;

git().silent(true)
  .clone(remote)
  .then(() => console.log('finished'))
  .catch((err) => console.error('failed: ', err)); */