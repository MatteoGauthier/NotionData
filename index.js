const request = require('request'), argv = require('yargs').argv, puppeteer = require("puppeteer"), clipboardy = require("clipboardy"), player = require("node-wav-player"), getUrls = require("get-urls"), fs = require("fs");
var pageTitle;
var arguments = process.argv.slice(2);
console.log(arguments)
var urlToFetch = arguments[0]; // Input
var file_path = arguments[1]; // Output

const urltest = arguments.length === 2 ? true : false;
if (!urltest) {
  throw new Error("Not enough argument")
}

console.log("Input : ", urlToFetch, " Output : ", file_path)
insert = function insert(main_string, ins_string, pos) {
  if (typeof pos == "undefined") {
    pos = 0;
  }
  if (typeof ins_string == "undefined") {
    ins_string = "";
  }
  return main_string.slice(0, pos) + ins_string + main_string.slice(pos);
};

const getData = async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  await page.goto(
    urlToFetch
  );

  await page.waitFor(10000);
  pageTitle = await page.title();
  await page.keyboard.down("Control");
  await page.keyboard.press("KeyA");
  await page.keyboard.press("KeyC");

  var data = clipboardy.readSync();

  await browser.close();
  return data;
};

// Fetch Weather Data

let apiKey = '17057ac07423aea45e89374601e85ef5'
let city = argv.c || 'Poitiers';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    let weather = JSON.parse(body)
    let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
    console.log(message);
  }
});


// Call Async Puppeteer function

getData().then(value => {
  console.log(value);
  console.log(pageTitle);
  player
    .play({
      path: "Success 1.wav"
    })
    .then(() => {
      console.log("The wav file started to be played successfully.");
    })
    .catch(error => {
      console.error(error);
    });
  pageTitle = "# " + pageTitle + "\n";
  value = insert(value, pageTitle);

  console.log(getUrls(value));
  fs.writeFile(file_path, value, err => {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
  });
});
