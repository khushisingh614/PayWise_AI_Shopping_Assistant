import express from 'express';
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";

const app = express();
const port = 3000;
env.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/' , async (req,res)=>{
  let result = (await db.query("SELECT * from orders;")).rows;
  let badge = 0;
  for (let i = 0; i < result.length; i++) {
    badge += result[i].batch;
  }
  res.render("main_page.ejs" ,{
    badges : badge
  });
});

app.get("/threshold_setter" , async(req , res)=>{
  let result = (await db.query("SELECT * from threshold")).rows;
  let category = [] , monthly = [] , yearly = [];
  for(let i = 0 ; i < result.length ; i++){
    category.push(result[i].category);
    monthly.push(result[i].monthly);
    yearly.push(result[i].yearly);
  }
  res.render("threshold_setter.ejs" , {
    cat: category,
    month: monthly,
    year: yearly
  });
});

app.get("/checkout" , async (req , res)=>{
  let result = (await db.query("SELECT * from cart")).rows;
  let items = [], original_price = [] ,  discount = [] , final_price = [] , batches = [];
  for (let i = 0; i < result.length; i++) {
    items.push(result[i].item);
    original_price.push(result[i].original_price);
    discount.push(result[i].discount);
    final_price.push(result[i].final_price);
    batches.push(result[i].batches);
  }
  result = (await db.query("SELECT * from orders;")).rows;
  let badge = 0;
  for (let i = 0; i < result.length; i++) {
    badge += result[i].batch;
  }
  res.render("checkout.ejs" ,{
    item: items,
    mrp: original_price,
    dis : discount,
    fin_price :final_price,
    batch : batches,
    badges :badge
  });
});

app.get("/cart" , async (req , res)=>{
  let result = (await db.query("SELECT * from cart")).rows;
  let items = [], original_price = [] ,  discount = [] , final_price = [] , batches = [];
  for (let i = 0; i < result.length; i++) {
    items.push(result[i].item);
    original_price.push(result[i].original_price);
    discount.push(result[i].discount);
    final_price.push(result[i].final_price);
    batches.push(result[i].batches);
  }
  res.render("cart.ejs" , {
    item: items,
    mrp: original_price,
    dis : discount,
    fin_price :final_price,
    batch : batches
  });
});

app.get("/game_saving" , async (req , res)=>{
  let result = (await db.query("SELECT * from orders;")).rows;
  let saving = 0 , badge = 0;
  for (let i = 0; i < result.length; i++) {
    saving += result[i].discount;
    badge += result[i].batch;
  }
  res.render("game_saving.ejs" , {
    savings : saving,
    badges : badge
  });
});

app.get("/educational", (req , res)=>{
  res.render("educational.ejs");
});

app.get("/offer" , (req , res)=>{
  res.render("offer.ejs");
});

app.get("/feedback" , (req , res)=>{
  res.render("feedback.ejs");
});

app.get("/orders" , async (req , res)=>{
  let result = (await db.query("SELECT * from orders")).rows;
  let items = [], original_price = [] ,  discount = [] , final_price = [] , batches = [];
  for (let i = 0; i < result.length; i++) {
    items.push(result[i].item);
    original_price.push(result[i].mrp_price);
    discount.push(result[i].discount);
    final_price.push(result[i].final_price);
    batches.push(result[i].batch);
  }
  res.render("orders.ejs" , {
    item: items,
    mrp: original_price,
    dis : discount,
    fin_price :final_price,
    batch : batches
  });
});

app.post("/add_item" , async(req , res)=>{
  console.log(req.body);
  let discount = req.body.Badge*30;
  let final_price = req.body.Price - discount;
  let result  = (await db.query("Select * from cart;")).rows;
  await db.query("insert into cart (id , item , original_price , discount ,final_price , batches) values ($1 , $2 , $3 , $4 , $5 , $6)" , [result.length + 1 , req.body.item , req.body.Price , discount , final_price , req.body.Badge]);
  res.redirect("/");
  
});

app.post("/add_threshold" , async (req, res)=>{
  console.log(req.body);

  if(req.body.thresholdElectronicsMonthly != undefined){
    await db.query("update threshold set monthly = $1 where category='Electronics';", [req.body.thresholdElectronicsMonthly]);
    console.log("done");
  }

  if(req.body.thresholdClothingMonthly){
    await db.query("update threshold set monthly = $1 where category='Clothing';", [req.body.thresholdClothingMonthly]);
  }

  if(req.body.thresholdHouseholdMonthly){
    await db.query("update threshold set monthly = $1 where category='Household';", [req.body.thresholdHouseholdMonthly]);
  }

  if(req.body.thresholdGroceryMonthly){
    await db.query("update threshold set monthly = $1 where category='Grocery';", [req.body.thresholdGroceryMonthly]);
  }

  if(req.body.thresholdOthersMonthly){
    await db.query("update threshold set monthly = $1 where category='others';", [req.body.thresholdOthersMonthly]);
  }

  if(req.body.thresholdElectronicsYearly){
    await db.query("update threshold set yearly = $1 where category='Electronics';", [req.body.thresholdElectronicsYearly]);
  }

  if(req.body.thresholdClothingYearly){
    await db.query("update threshold set yearly = $1 where category='Clothing';", [req.body.thresholdClothingYearly]);
  }

  if(req.body.thresholdHouseholdYearly){
    await db.query("update threshold set yearly = $1 where category='Household';", [req.body.thresholdHouseholdYearly]);
  }

  if(req.body.thresholdGroceryYearly){
    await db.query("update threshold set yearly = $1 where category='Grocery';", [req.body.thresholdGroceryYearly]);
  }

  if(req.body.thresholdOthersYearly){
    await db.query("update threshold set yearly = $1 where category='others';", [req.body.thresholdOthersYearly]);
  }

  
  res.redirect("/threshold_setter");

})

app.post("/add_feedback" , async (req , res)=>{
  console.log(req.body);

  await db.query("insert into feedback values ($1 , $2 , $3)", [req.body.name , req.body.email , req.body.feedback]);
  res.redirect("/feedback")
});

app.listen(port , ()=>{
  console.log(`the server is running on port ${port}`);
});
