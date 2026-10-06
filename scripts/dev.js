const http = require("node:http");
const net = require("node:net");
const { spawn } = require("node:child_process");

const publicPort = Number(process.env.PORT || 8443);
const expoPort = publicPort === 65535 ? publicPort - 1 : publicPort + 1;
const expoHost = "127.0.0.1";

function proxyHeaders(headers) {
  const forwarded = { ...headers, host: `${expoHost}:${expoPort}` };
  delete forwarded.origin;
  return forwarded;
}

const server = http.createServer((request, response) => {
  const proxyRequest = http.request(
    {
      hostname: expoHost,
      port: expoPort,
      method: request.method,
      path: request.url,
      headers: proxyHeaders(request.headers),
    },
    (proxyResponse) => {
      response.writeHead(proxyResponse.statusCode || 502, proxyResponse.headers);
      proxyResponse.pipe(response);
    },
  );

  proxyRequest.on("error", () => {
    if (!response.headersSent) {
      response.writeHead(503, { "Content-Type": "text/plain" });
    }
    response.end("Expo development server is starting.");
  });
  request.pipe(proxyRequest);
});

server.on("upgrade", (request, socket, head) => {
  const upstream = net.connect(expoPort, expoHost, () => {
    const headers = proxyHeaders(request.headers);
    const lines = [`${request.method} ${request.url} HTTP/${request.httpVersion}`];

    for (const [name, value] of Object.entries(headers)) {
      if (value !== undefined) {
        lines.push(`${name}: ${Array.isArray(value) ? value.join(", ") : value}`);
      }
    }

    upstream.write(`${lines.join("\r\n")}\r\n\r\n`);
    if (head.length) upstream.write(head);
    socket.pipe(upstream).pipe(socket);
  });

  upstream.on("error", () => socket.destroy());
});

const expo = spawn(
  "pnpm",
  ["exec", "expo", "start", "--web", "--port", String(expoPort)],
  { stdio: "inherit", env: process.env },
);

function shutdown(signal) {
  server.close();
  if (!expo.killed) expo.kill(signal);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

expo.on("exit", (code, signal) => {
  server.close(() => process.exit(signal ? 1 : code ?? 1));
});

server.listen(publicPort, "0.0.0.0", () => {
  console.log(`Figma Make proxy listening on http://localhost:${publicPort}`);
});
