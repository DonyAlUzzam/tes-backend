module.exports = app => {
    const books = require("../controllers/book.controller.js");
    const multer = require("multer");
    const storage = multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, "./public/images");
      },
      filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + "-" + file.originalname);
      }
    });

    const imageFilter = (req, file, cb) => {
      if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
      } else {
        cb(null, false);
      }
    };

    const upload = multer({
      storage: storage,
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
      fileFilter: imageFilter
    });
  
    var router = require("express").Router();
  
    // Create a new Book
    router.post("/", upload.single('image'), books.create);
  
    // Retrieve all Books
    router.get("/", books.findAll);
  
    // Retrieve a single Book with id
    router.get("/:id", books.findOne);
  
    // Update a Book with id
    router.put("/:id", books.update);
  
    // Delete a Book with id
    router.delete("/:id", books.delete);
  
    // Create a new Book
    router.delete("/", books.deleteAll);
  
    app.use('/api/books', router);
    // app.use(app.static('public'));
  };