const ContentModel = require("../models/ContentModel");
const contentModel = require("../models/ContentModel");
const uploadContent = async (req, res) => {
  const { name, price, description, category } = req.body;
  const img = "/img/" + req.fileName;

  const content = new contentModel({
    name,
    price,
    description,
    category,
    img,
  });

  try {
    await content.save();
    res.status(200).json({ message: "content added" });
  } catch (err) {
    res.send(err);
  }
};

const getAllContent = async (req, res) => {
  try {
    const contents = await contentModel.find();
    res.status(200).json({ contents });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteContent = async (req, res) => {
  try {
    let contentId = req.params.id;
    console.log(contentId);
    const content = await ContentModel.findOne({ _id: contentId });
    if (content) {
      await content.deleteOne({ _id: contentId });
      res
        .status(200)
        .json({ message: "Content deleted successfully", _id: contentId });
    } else {
      res.status(404).json({ message: "Content not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
// look for filename in the database and delete it

const updateContent = async (req, res) => {
  try {
    const id = req.params.id;
    const img = "/img/" + req.fileName;
    console.log(img);
    console.log(req.fileName);
    const updateData = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.price,
      category: req.body.category,
      img,
    };
    const updatedContent = await ContentModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    if (updatedContent) {
      res.status(200).json({ content: updatedContent });
    } else {
      res.status(404).json({ message: "Content not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  uploadContent,
  deleteContent,
  getAllContent,
  updateContent,
};
