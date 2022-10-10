let { promises: fs } = require("fs");

export let getMessageTemplate = async (filename) => {
  let message = await fs.readFile(filename, { encoding: "utf-8" });
  return message;
};
