// Models
const { Console } = require("../models/console.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");

const getAllConsoles = catchAsync(async (req, res, next) => {
  const consoles = await Console.findAll();

  res.status(200).json({
    status: "success",
    data: { consoles },
  });
});

const createConsole = catchAsync(async (req, res, next) => {
  const { name, company } = req.body;

  const newConsole = await Console.create({ name, company });

  // 201 -> Success and a resource has been created
  res.status(201).json({
    status: "success",
    data: { newConsole },
  });
});

const updateConsole = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const { console } = req;

  await console.update({ name });

  res.status(200).json({
    status: "success",
    data: { console },
  });
});

const deleteConsole = catchAsync(async (req, res, next) => {
  const { console } = req;

  await console.update({ status: "deleted" });

  res.status(204).json({ status: "success" });
});

module.exports = {
  getAllConsoles,
  createConsole,
  updateConsole,
  deleteConsole,
};
