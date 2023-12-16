const express = require("express");
const {
  createUser,
  bookResidency,
  getAllBookings,
  cancelBooking,
  favBookings,
  getAllFav,
} = require("../controllers/userController");
const router = express.Router();

router.route("/register").post(createUser);
router.route("/bookVisit/:id").post(bookResidency);
router.route("/bookedVisits").post(getAllBookings);
router.route("/cancelBooking/:id").post(cancelBooking);
router.route("/fav/:rid").post(favBookings);
router.route("/allFav").post(getAllFav);

module.exports = router;
