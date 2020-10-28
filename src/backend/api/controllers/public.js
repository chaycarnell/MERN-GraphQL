const example = async (req, res) => {
  res.json({
    success: true,
    status: 200,
    message: 'Example endpoint response message!',
    payload: { status: 'ok' }
  });
};
module.exports = {
  example
};
