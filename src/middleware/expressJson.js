const expressJson = (req, res, next) => {
  if (req.headers["content-type"] !== "application/json") {
    return next();
  }

  let body = "";
  req.on("data", (chunk) => (body += chunk.toString()));
  req.on("end", () => {
    try {
      req.body = JSON.parse(body);
      next();
    } catch (err) {
      res.status(400).json({ error: "Invalid JSON" });
    }
  });
};
