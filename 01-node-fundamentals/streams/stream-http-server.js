import { Transform } from "node:stream";
import http from "node:http";

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    callback(null, Buffer.from(String(transformed)));
  }
}

const server = http.createServer((req, res) => {});

server.listen(3334);
