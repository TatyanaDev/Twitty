const http = require("http");
const application = require("./app.ts");

const server: any = http.createServer(application);
const port: string | number = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server started on port: ${port}`));