const express = require("express");
const CarModel = require("../Model/Car");
const AdminCarRouter = express.Router();

AdminCarRouter.get("/admin-cars/:adminId", async (req, res) => {
  const adminId = req.params.adminId; // <--- You get it from the URL
  const cars = await CarModel.find({ ownerId: adminId });
  res.json(cars);
});

module.exports = AdminCarRouter;
