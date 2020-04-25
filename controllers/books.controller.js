const shortid = require("shortid");

const db = require("../db");

module.exports.index = (req, res) => {
  let perPage = 4;
  let page = req.query.page || 1;
  let start = (page - 1) * perPage;
  let end = page * perPage;

  res.render("books/index", {
    books: db
      .get("books")
      .value()
      .slice(start, end),
    pageQuantity: Math.floor(db.get("books").value().length / perPage + 1)
  });
};

module.exports.create = (req, res) => {
  res.render("books/create");
};

module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();
  db.get("books")
    .push(req.body)
    .write();
  res.redirect("/books");
};

module.exports.edit = (req, res) => {
  res.render("books/edit", {
    id: req.params.id
  });
};

module.exports.postEdit = (req, res) => {
  db.get("books")
    .find({ id: req.body.id })
    .assign({ title: req.body.title })
    .write();
  res.redirect("/books");
};

module.exports.delete = (req, res) => {
  db.get("books")
    .remove({ id: req.params.id })
    .write();
  res.redirect("/books");
};
