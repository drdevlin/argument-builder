const sendResponse = (req, res) => {
  const payload = req.payload || null;
  res.send(payload);
}

module.exports = { sendResponse };