const asyncHandler = require("express-async-handler");
const prisma = require("../config/prismaConfig");

const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  console.log(req.body.data);
  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: { connect: { email: userEmail } },
      },
    });

    res.send({ message: "Residency created successfully" });
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("A residency with same address is already present");
    }
    throw new Error(err.message);
  }
});

const getAllResedencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.send(residencies);
});

const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const residency = await prisma.residency.findUnique({
      where: { id: id },
    });
    res.send(residency);
  } catch (err) {
    throw new Error(err.msg);
  }
});

module.exports = { createResidency, getAllResedencies, getResidency };
