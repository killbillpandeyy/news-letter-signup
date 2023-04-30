//jshint esversion:6
const express=require("express");
const app=express();
const request=require("request");
const bodyParser=require("body-parser");
const https=require("https");
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/indexx.html");

});
app.post("/",function(req,res){
    // console.log(requ);
    var firstname=req.body.fname;
    var lastname=req.body.lname;
    var emailid=req.body.email;
    console.log(firstname,lastname,emailid);
    var data={
        members:[
            {
                email_address:emailid,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname,
                }
            }
        ]
    }
    var jsondata=JSON.stringify(data);
    const url="https://us9.api.mailchimp.com/3.0/lists/e72e731714";
    const options={
        method:"POST",
        auth:"sandeep1:2101b513cc802a4061b1418e79529e6e-us9"
    }
    const requestt=https.request(url,options,function(response){
        if(response.statusCode===200) res.sendFile(__dirname+"/success.html");
        else res.sendFile(__dirname+"/failure.html");
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    });
    requestt.write(jsondata);
    requestt.end();

});
app.post("/failure",function(req,res){
    res.redirect("/");
});
app.listen(process.env.PORT || 3000,function(){
    console.log("PORT IS SET UP ON 3000");
});
// 2101b513cc802a4061b1418e79529e6e-us9
// e72e731714