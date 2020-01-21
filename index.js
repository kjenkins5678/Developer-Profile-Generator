// var fs = require('fs'),
//     convertFactory = require('electron-html-to');
 
// var conversion = convertFactory({
//   converterPath: convertFactory.converters.PDF
// });
 
// conversion({ html: '<h1>Hello World</h1>' }, function(err, result) {
//   if (err) {
//     return console.error(err);
//   }
 
//   console.log(result.numberOfPages);
//   console.log(result.logs);
//   result.stream.pipe(fs.createWriteStream('the_result.pdf'));
//   conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
// });

const fs = require('fs');
// const convertFactory = require('electron-html-to');
fs.readFile('index.html', 'utf8', (err, htmlString) => {
  // add local path in case your HTML has relative paths
  htmlString = htmlString.replace(/href="|src="/g, match => {
    return console.log(match + 'file://path/to/you/base/public/directory');
  });
  // const conversion = convertFactory({
  //   converterPath: convertFactory.converters.PDF,
  //   allowLocalFilesAccess: true
  // });
  // conversion({ html: htmlString }, (err, result) => {
  //   if (err) return console.error(err);
  //   result.stream.pipe(fs.createWriteStream('result.pdf'));
  //   conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
  // });
});