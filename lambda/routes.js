module.exports = function (app) {
  const userRouter = require("./routes/userRouter");
  app.use("/user", userRouter);

  const stationRouter = require("./routes/stationRouter");
  app.use("/station", stationRouter);

  const chargerRouter = require("./routes/chargerRouter");
  app.use("/charger", chargerRouter);

  const connectorRouter = require("./routes/connectorRouter");
  app.use("/connector", connectorRouter);

  const logRouter = require("./routes/logRouter");
  app.use("/log", logRouter);

  const areaRouter = require("./routes/areaRouter");
  app.use("/area", areaRouter);

  const cityRouter = require("./routes/cityRouter");
  app.use("/city", cityRouter);

  const stateRouter = require("./routes/stateRouter");
  app.use("/state", stateRouter);

  const countryRouter = require("./routes/countryRouter");
  app.use("/country", countryRouter);

  const oemVendorRouter = require("./routes/oemVendorRouter");
  app.use("/oem-vendor", oemVendorRouter);

  const oemRouter = require("./routes/oemRouter");
  app.use("/oem", oemRouter);

  const connectorTypeRouter = require("./routes/connectorType");
  app.use("/connector-type", connectorTypeRouter);

  const tariffRouter = require("./routes/tariffRouter");
  app.use("/tariff", tariffRouter);

  const chargingSpeedRouter = require("./routes/chargingSpeedRouter");
  app.use("/charging-speed", chargingSpeedRouter);

  const chargespotNameRouter = require("./routes/chargeSpotRouter");
  app.use("/charge-spot", chargespotNameRouter);

  const chargeStationStatusRouter = require("./routes/chargeStationStatusRouter");
  app.use("/charge-station-status", chargeStationStatusRouter);

  const accessTypeRouter = require("./routes/accessTypeRouter");
  app.use("/access-type", accessTypeRouter);

  // const chargingStationLisingApiRouter = require("./routes/chargingStationLisingApiRouter")
  // app.use("/chargingStationLisingApi", chargingStationLisingApiRouter)

  const customerRouter = require("./routes/customerRouter");
  app.use("/customer", customerRouter);

  const transactionRouter = require("./routes/transactionRouter");
  app.use("/transaction", transactionRouter);

  const paymentMethodRouter = require("./routes/paymentMethodRouter");
  app.use("/payment-method", paymentMethodRouter);

  const bookingRouter = require("./routes/bookingRouter");
  app.use("/booking", bookingRouter);

  const tenantRouter = require("./routes/tenantRouter");
  app.use("/tenant", tenantRouter);

  const chargingStationRouter = require("./routes/chargingStationRouter");
  app.use("/chargingStation", chargingStationRouter);
};
