// guillaume.harel@skazy.nc

import http from "node:http";

const host = "localhost";
const port = 8000;

import fs from "node:fs/promises";

function readfile() {
  return fs.readFile("index.html", "utf8");
}

async function requestListener(request, response) {
    response.setHeader("Content-Type", "text/html");
    try {
        const urlParts=request.url.split("/");
        const contents = await fs.readFile("index.html", "utf8");
        switch (urlParts[1]) {
            case "":
                response.writeHead(200);
                return response.end(contents);
            case "index.html":
                response.writeHead(200);
                return response.end(contents);
            case "random.html":
                response.writeHead(200);
                return response.end(
                `<html><p>${Math.floor(100 * Math.random())}</p></html>`,
                );
            case "random":

                const nb=parseInt(urlParts[2]);
                if (!isNaN(nb) && nb > 0) {
                    const randomNumbers=[];

                    for(let i=0;i<nb;i++){
                        randomNumbers.push(Math.floor(100 * Math.random()));
                    }

                    response.writeHead(200);
                    return response.end(
                    `<html><p>${randomNumbers.join("<br>")}</p></html>`,
                    );
                }
                else{
                    response.writeHead(400);
                    return response.end(`<html><p>400: invalid number</p></html>`);
                }
            default:
                response.writeHead(404);
                return response.end(`<html><p>404: NOT FOUND</p></html>`);
        }
    } catch (error) {
        console.error(error);
        response.writeHead(500);
        return response.end(`<html><p>500: INTERNAL SERVER ERROR</p></html>`);
    }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
  console.log("NODE_ENV =", process.env.NODE_ENV);
});
