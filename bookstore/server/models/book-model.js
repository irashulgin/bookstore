const { Schema, model } = require("mongoose");

const BookSchema = new Schema({
  title: String,
  description: String,
  author: String,
  publicationDate: Date,
  genre: String,
  price: Number
});
module.exports = model("Book", BookSchema);
