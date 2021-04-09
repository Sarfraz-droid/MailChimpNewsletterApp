const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/failure", function(req, res) {
    res.redirect("/");
});

app.post("/", function(req, res) {
    const first = req.body.fname;
    const last = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: first,
                LNAME: last
            }
        }]
    };

    var jsonData = JSON.stringify(data);

    var url = "https://us1.api.mailchimp.com/3.0/lists/3abf712716";

    const options = {
        method: "POST",
        auth: "sarfraz:69168e7e2f63a5d35d051928fe844374-us1"
    }

    const request = https.request(url, options, function(response) {
        console.log(response.statusCode);
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else
            res.sendFile(__dirname + "/failure.html");

        // response.on("data", function(data) {
        //     console.log(JSON.parse(data));
        // });
    });

    request.write(jsonData);
    request.end();

});
app.listen(process.env.PORT || 3000, function() {
    console.log("Server started at port 3000");
});


// 69168e7e2f63a5d35d051928fe844374-us1

// 3abf712716