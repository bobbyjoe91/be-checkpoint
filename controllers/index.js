function index(req, res) {
  res.status(200).json({
    message: '[BE] CheckPoint'
  });
}

module.exports = {
  index
};
