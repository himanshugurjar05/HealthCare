import Package from "../models/diseasePackageModel.js";
import 'dotenv/config';

const diseaseController = {
  // Get all disease packages
  async getAllDisease(req, res) {
    try {
      const allDisease = await Package.find();
      res.json(allDisease);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create a new disease package
  async createDisease(req, res) {
    const { image, name, price, description } = req.body;

    const newPackage = new Package({
      image,
      name,
      price,
      description
    });

    try {
      const savedPackage = await newPackage.save();
      res.status(201).json(savedPackage);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default diseaseController;
