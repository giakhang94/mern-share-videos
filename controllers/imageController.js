import Image from "../models/Image.js";

const uploadImg = async (req, res) => {
  const thumbnail = req.file.buffer;
  const description = req.body.description;
  const img = await Image.create({
    thumb: thumbnail,
    description,
  });
  await img.save();
  res.status(201).json({ img });
};
//upload img len bo nho cua server
const uploadImgLocal = async (req, res) => {
  console.log(req.file);
  res
    .status(201)
    .json({
      link: `http://localhost:5000/uploads/images/${req.file.filename}`,
    });
};
const getImage = async (req, res) => {
  const img = await Image.findOne({ _id: req.params.id });
  res.set("Content-Type", "image/jpg, image/png, image/jpeg");
  res.send(img.thumb);
};
const getAllThumb = async (req, res) => {
  const allthumbs = await Image.find();
  res.status(200).json({ allthumbs });
};
export { uploadImg, getImage, getAllThumb, uploadImgLocal };
