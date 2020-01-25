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
    <head>
      <style>

        * {
        text-align: center;
        margin: auto;
        } 

        .card {
          background-color: rgb(0, 255, 255);
        }

        img {
          border-radius: 8px;
          width: 200px;
        }
      
        table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 60%;
        }
        
        td, th {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }
      </style>
      </head>
      <body>
      <div class='card'>
      <img src=${res.data.avatar_url} alt="Github User Profile Avatar">
      <h1>${res.data.name}</h1>
      <h4>${res.data.location}</h4>
      <br>
      </div>
      <br>
      <h4>Bio: </h4>
      <p>${res.data.bio}</p>
      <br>
        <table>
            <tr>
              <th>Public Repositories</th>
              <th>Followers</th>
              <th>Github Stars</th>
              <th>Users Following</th>
            </tr>
            <tr>
              <td>${res.data.public_repos}</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
            </tr>
          </table>
          <br>
          <a href=${res.data.html_url}>Github</a>
          <a href=${res.data.blog}>Blog</a>
        </body>
      `
      // console.log("inside function: " + htmlstring)
      var conversion = convertFactory({
      converterPath: convertFactory.converters.PDF
    });
      
    conversion({ html: htmlstring }, function(err, result) {
      if (err) {
        return console.error(err);
      }
      
      // console.log(result.numberOfPages);
      // console.log(result.logs);
      result.stream.pipe(fs.createWriteStream('result.pdf'));
      conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
    });

      // return(htmlstring);
      })

  })
  // .then(function(htmlstring){
  //   console.log("outside function: " + htmlstring);
    

  // });
    
    
  
  