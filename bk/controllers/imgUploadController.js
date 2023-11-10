exports.imgUploadHandler = async (req, res) => {
  console.log(req.file);
  console.log(req.body);

  return res.sendStatus(200);
};
