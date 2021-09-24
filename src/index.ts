import http from "http";
import { start } from "./api/slack";
import { getCommands } from "./commands";

start(getCommands());

http
  .createServer(function (req, res) {
    res.write("Bot is alive!");
    res.end();
  })
  .listen(8080);
