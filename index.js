const fs = require('fs');

const convertFactory = require('electron-html-to');
fs.readFile('index.html', 'utf8', (err, htmlString) => {
  // add local path in case your HTML has relative paths
  htmlString = htmlString.replace(/href="|src="/g, match => {
      console.log(match + '~/Documents/bootcamp2019/homework/Developer-Profile-Generator/');
    return match + '~/Documents/bootcamp2019/homework/Developer-Profile-Generator/';
  });


//   const conversion = convertFactory({
//     converterPath: convertFactory.converters.PDF,
//     allowLocalFilesAccess: true
//   });
//   conversion({ html: htmlString }, (err, result) => {
//     if (err) return console.error(err);
//     result.stream.pipe(fs.createWriteStream('~/Documents/bootcamp2019/homework/test.pdf'));
//     conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
//   });
});