const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const res = require('express/lib/response');
const app= express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.set("view engine","ejs");

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser: true});
const itemsSchema={
  name: String
};
const Item=mongoose.model("item",itemsSchema); 
const eat=new Item({name:"Hit the + button to add a new item"});
const cook=new Item({name:"<-- Hit this to delete an item"});
const defaultItems=[eat,cook];


app.get("/",function(req,res){
  Item.find({}).then((data)=>{
    if(data.length===0)
    {
       Item.insertMany(defaultItems);
       res.redirect("/")
    }
    else
    {
  res.render("list",{kindOfDay: "Today" ,it:data});
    }
});
})

app.post("/delete",function(req,res){
 
  Item.findByIdAndRemove(req.body.checkbox)
.then(function () {
    console.log("Successfully removed");
})
.catch(function (err) {
    console.log(err);
});
res.redirect("/");
})
app.post("/",function(req,res){
  const item1=req.body.in;
    const ite=new Item({
      name: item1
    });
    ite.save();
   res.redirect("/");
})

app.listen(3002,()=>{
    console.log("listening");
})