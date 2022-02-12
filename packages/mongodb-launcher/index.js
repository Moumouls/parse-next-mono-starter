process.env.MONGOMS_VERSION = "4.4.2";
const http = require("http");
const { MongoMemoryReplSet } = require("mongodb-memory-server");

const hostname = "127.0.0.1";
const port = 27272;

const run = async () => {
  const replSet = new MongoMemoryReplSet({
    instanceOpts: [
      {
        port: 27017, // port number for the instance
      },
    ],
    replSet: { storageEngine: "wiredTiger", dbName: "parse" },
  });
  await replSet.waitUntilRunning();
  console.info("MongDB Running");
  const server = http.createServer(async (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("ok");
  });
  server.listen(port, hostname, async () => {
    await replSet.waitUntilRunning();
  });
};

run();
