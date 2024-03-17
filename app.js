const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const port = 8080;
const path = require("path");
const app = express();
const ejsMate=require("ejs-mate");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")))
main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wandurlust");
}

app.get("/", (req, res) => {
  res.send("hi i am root ");
});

app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});
//new route

app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

//create route
app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

//edit route

app.get("/listing/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  res.render("listings/edit.ejs", { listing });
});

app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deleteListing = await Listing.findByIdAndDelete(id);
  console.log(deleteListing);
  res.redirect("/listings");
}); 

// app.get("/testListing",async (req,res)=>{
// let sampleListing=new Listing({
// title:"my new Villa",
// description:"by the beach",
// price:"1200",
// location:"mumbai",
// country:"India"
// });

// await sampleListing.save();
// console.log("sample was send");
// res.send("successfull testing");

// });

app.listen(port, () => {
  console.log("server is listening to port ", port);
});
