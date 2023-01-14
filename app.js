const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
 });

 app.post("/", function(req, res){
    var name = req.body.Name;
    var surname = req.body.Surname;
    var email = req.body.Email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: name,
                    LNAME: surname

                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);
    const url = "https://us4.api.mailchimp.com/3.0/lists/4bcf3cbb34";

    const options = {
        method: "POST",
        auth: "md-OKsZKKpTpN7JYj0iZLa2dA"
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode === 2000){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

 });


 app.post("/failure", function(req, res){
       res.redirect("/");
 })


app.listen(process.env.PORT || 3000, function(){
    console.log("Server started");
})
