const example = async (req, res) => {
  res.json({
    success: true,
    message: 'Example endpoint response message!',
    payload: { status: 'ok' }
  });
};
module.exports = {
  example
};
