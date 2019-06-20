const puppeteer = require("puppeteer");
const clipboardy = require("clipboardy");
const player = require('node-wav-player');
const fs = require('fs');


const getData = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://www.notion.so/Review-ScreenToGif-a1135437c65240718707677d108c7034"
  );
  await page.waitFor(10000);
  await page.keyboard.down("Control");
  await page.keyboard.press("KeyA");
  await page.keyboard.press("KeyC");

  await page.goto("https://codepen.io/MatteoGauthier/pen/ZdLRMr");
  await page.waitFor(5000);

  await page.setViewport({ width: 1920, height: 969 });

  let frames = await page.frames();
  const frame_3199 = frames.find(
    f => f.url() === "https://s.codepen.io/MatteoGauthier/fullpage/ZdLRMr"
  );
  await frame_3199.waitForSelector("body > input");
  await frame_3199.click("body > input");
  await page.waitFor(2000);

  await browser.close();

  var data = clipboardy.readSync();
  console.log(data);
  
  
  return data;
};

getData().then(value => {
    console.log(value)
}).then(_ => {

    player.play({
        path: 'Success 1.wav',
      }).then(() => {
        console.log('The wav file started to be played successfully.');
      }).catch((error) => {
        console.error(error);
      });
      fs.writeFileSync('')
})
