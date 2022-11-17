const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.get("/", (req, res) =>{
  console.log(req.url);
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req, res) =>{

  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const  email = req.body.email;
  console.log(firstname);
  console.log(lastname);
  console.log(email);

  // key = b82af6ea41508c0c7f770b88a40e3c43-us21
  //

  const data ={
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: lastname
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const options = {
    method: "POST",
    auth: "akshay:b82af6ea41508c0c7f770b88a40e3c43-us21"
  }
  const url = "https://us21.api.mailchimp.com/3.0/lists/f5fb05d5b2"

  const request = https.request(url, options, (response)=> {

    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }


    response.on("data", (data)=>{
      console.log(JSON.parse(data));

    })
  })
  request.write(jsonData);
  request.end();
});

app.listen(process.env.PORT || 3000,  () =>{
  console.log("The Local server is up and running successfully !");
})
