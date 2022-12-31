const app = require("./app");
const {PORT} = require("./config");

app.listen(PORT, () => {
    console.log("Server corriendo en http://localhost:"+PORT);
})
