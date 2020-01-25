const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const convertFactory = require('electron-html-to');
// var htmlstring = null;

inquirer
  .prompt({
    message: "Enter your GitHub username:",
    name: "username"
  })
  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}`

    axios.get(queryUrl).then(function(res) {
      var htmlstring = `
      <img src=${res.data.avatar_url} alt="Github User Profile Avatar">\n
      <h1>${res.data.name}</h1>\n
      <h4>${res.data.location}</h4>\n
      <a href=${res.data.html_url}>Github</a>
      `
      // console.log("inside function: " + htmlstring)
      var conversion = convertFactory({
      converterPath: convertFactory.converters.PDF
    });
      
    conversion({ html: htmlstring }, function(err, result) {
      if (err) {
        return console.error(err);
      }
      
      console.log(result.numberOfPages);
      console.log(result.logs);
      result.stream.pipe(fs.createWriteStream('result.pdf'));
      conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
    });

      // return(htmlstring);
      })

  })
  // .then(function(htmlstring){
  //   console.log("outside function: " + htmlstring);
    

  // });
    
    
  
  