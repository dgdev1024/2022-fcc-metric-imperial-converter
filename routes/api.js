"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  const convertHandler = new ConvertHandler();

  app.get("/api/convert", (req, res) => {
    // Get the measure from the query parameter.
    let { input } = req.query;

    // Early out if no measure was provided.
    if (!input) {
      return res.status(400).json({ error: "no measure provided." });
    }

    // Pull the number and unit from the measure.
    const [initNum, initUnit] = [
      convertHandler.getNum(input),
      convertHandler.getUnit(input),
    ];

    // Early out if one or both of the above boolean checks return false.
    if (initNum === "invalid number" && initUnit === "invalid unit") {
      return res.send("invalid number and unit");
    } else if (initUnit === "invalid unit") {
      return res.send("invalid unit");
    } else if (initNum === "invalid number") {
      return res.send("invalid number");
    }

    // Perform the conversion.
    const [returnNum, returnUnit] = [
      convertHandler.convert(initNum, initUnit),
      convertHandler.getReturnUnit(initUnit),
    ];

    // Get the readout.
    const readout = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );

    // Return the response.
    return res.status(200).json({
      initNum,
      initUnit: convertHandler.getInitUnit(initUnit),
      returnNum,
      returnUnit,
      string: readout,
    });
  });
};
