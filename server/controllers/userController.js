const asyncHandler = require("express-async-handler");
const prisma = require("../config/prismaConfig");

const createUser = asyncHandler(async (req, res) => {
  let { email } = req.body.data;
  console.log(email);
  const userExists = await prisma.user.findUnique({ where: { email: email } });
  if (!userExists) {
    const user = await prisma.user.create({ data: req.body.data });
    res.send({
      message: "Thank you for registering",
      user: user,
    });
  } else {
    res.status(201).send("User already registered");
  }
});

const bookResidency = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      res.status(400).json({ message: "This residency is already booked." });
    } else {
      await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });
      res.send("Your visit is booked succesfully");
    }
  } catch (err) {
    throw new Error(err.msg);
  }
});

const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const allBookedVisits = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    res.status(200).send(allBookedVisits);
  } catch (err) {
    throw new Error(err.message);
  }
});

const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    const index = user.bookedVisits.findIndex((visit) => visit.id === id);

    if (index === -1) {
      res.send(404).send({ message: "Booking not found" });
    } else {
      user.bookedVisits.splice(index, 1);
      await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: user.bookedVisits,
        },
      });
      res.send("Booking cancelled succesfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

const favBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user.favResidenciesID.includes(rid)) {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            set: user.favResidenciesID.filter((id) => id !== rid),
          },
        },
      });

      res.send({ message: "Removed from favorites", user: updateUser });
    } else {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            push: rid,
          },
        },
      });
      res.send({ message: "Updated favorites", user: updateUser });
    }

    const addFav = user.favResidenciesID.some((visit) => {
      visit.id === id;
    });
  } catch (err) {
    throw new Error(err.message);
  }
});

const getAllFav = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    res.send(user.favResidenciesID);
  } catch (err) {
    throw new Error(err.message);
  }
});

module.exports = {
  createUser,
  bookResidency,
  getAllBookings,
  cancelBooking,
  favBookings,
  getAllFav,
};
