const express = require("express");
const bookRoutes = require("./routes/bookRoutes.js");
const middleware = require("./middleware/middleware.js");

const app = express();
const port = 8000;

app.use("/v1", middleware, bookRoutes);

app.listen(port, () => {
	console.log(`Servidor rodando no local: http://localhost:${port}`);
});
