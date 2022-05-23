function ConvertHandler() {
  this.getNum = function (input) {
    // A regular expression to valid the numeric portion of the measure input
    const numericRegex = /^\d+(?:\.\d+)?(?:\/\d+(?:\.\d+)?)?$/;

    // Use the search and slice methods to pull the numeric portion from the input.
    const unitIndex = input.search(/[a-z]+$/);
    const numericString = unitIndex !== -1 ? input.slice(0, unitIndex) : input;

    // Next, test the numeric portion of the measure. If that passes, then parse that numeric
    // portion into a float.
    let isValidNumber, parsedNumber;
    if (numericString === "") {
      // If no number was provided at the start of the input, then default to 1.
      parsedNumber = 1;
      isValidNumber = true;
    } else {
      // Make sure the extracted number passes the number regex above.
      isValidNumber = numericRegex.test(numericString);
      if (isValidNumber === true) {
        // If this is valid, then this may be a fraction. If so, then divide the numerator
        // and denominator.
        parsedNumber = numericString
          .split("/")
          .map(parseFloat)
          .reduce((result, part) => result / part);

        // If this results in a divide-by-zero, then this number is invalid.
        if (Math.abs(parsedNumber) === Infinity) {
          isValidNumber = false;
        }
      }
    }

    return isValidNumber === true ? parsedNumber : "invalid number";
  };

  this.getUnit = function (input) {
    // A regular expression to validate the unit portion of the input.
    const unitRegex = /^(?:lbs|gal|mi|kg|l|km)$/i;

    // Use the search and slice methods to pull the unit portion from the input.
    const unitIndex = input.search(/[a-z]+$/);
    const unitString = unitIndex !== -1 ? input.slice(unitIndex) : "";

    // Return the unit string if it is a valid measure unit.
    return unitRegex.test(unitString)
      ? this.getInitUnit(unitString)
      : "invalid unit";
  };

  this.getInitUnit = function (initUnit) {
    switch (initUnit.toLowerCase()) {
      case "l":
        return "L";
      case "kg":
        return "kg";
      case "km":
        return "km";
      case "gal":
        return "gal";
      case "lbs":
        return "lbs";
      case "mi":
        return "mi";
      default:
        return "";
    }
  };

  this.getReturnUnit = function (initUnit) {
    switch (initUnit.toLowerCase()) {
      case "l":
        return "gal";
      case "kg":
        return "lbs";
      case "km":
        return "mi";
      case "gal":
        return "L";
      case "lbs":
        return "kg";
      case "mi":
        return "km";
      default:
        return "";
    }
  };

  this.spellOutUnit = function (unit) {
    switch (unit.toLowerCase()) {
      case "l":
        return "liters";
      case "kg":
        return "kilograms";
      case "km":
        return "kilometers";
      case "gal":
        return "gallons";
      case "lbs":
        return "pounds";
      case "mi":
        return "miles";
      default:
        return "";
    }
  };

  this.convert = function (initNum, initUnit) {
    const LITERS_PER_GALLON = 3.78541;
    const KG_PER_POUND = 0.453592;
    const KM_PER_MILE = 1.60934;

    let result;

    switch (initUnit.toLowerCase()) {
      case "l":
        result = parseFloat((initNum / LITERS_PER_GALLON).toFixed(5));
        break;
      case "kg":
        result = parseFloat((initNum / KG_PER_POUND).toFixed(5));
        break;
      case "km":
        result = parseFloat((initNum / KM_PER_MILE).toFixed(5));
        break;

      case "gal":
        result = parseFloat((initNum * LITERS_PER_GALLON).toFixed(5));
        break;
      case "lbs":
        result = parseFloat((initNum * KG_PER_POUND).toFixed(5));
        break;
      case "mi":
        result = parseFloat((initNum * KM_PER_MILE).toFixed(5));
        break;

      default:
        return null;
    }

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
