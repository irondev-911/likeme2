const express = require("express"),
    cors = require("cors"),
    morgan = require("morgan"),
    indexRoutes = require("./routes/posts.routes");

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// endpoints
app.use(indexRoutes);

module.exports = app;
