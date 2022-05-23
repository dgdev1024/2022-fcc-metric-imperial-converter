const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

const LITERS_PER_GALLON = 3.78541;
const KG_PER_POUND = 0.453592;
const KM_PER_MILE = 1.60934;

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("'convertHandler' should correctly read a whole number input.", () => {
    assert.isNumber(convertHandler.getNum("250lbs"));
  });

  test("'convertHandler' should correctly read a decimal number input.", () => {
    assert.isNumber(convertHandler.getNum("250.44lbs"));
  });

  test("'convertHandler' should correctly read a fractional input.", () => {
    assert.isNumber(convertHandler.getNum("1/2lbs"));
  });

  test("'convertHandler' should correctly read a fractional input with a decimal.", () => {
    assert.isNumber(
      convertHandler.getNum("1.5/3lbs"),
      "Incorrectly read fraction with decimal numerator."
    );
    assert.isNumber(
      convertHandler.getNum("5/2.5lbs"),
      "Incorrectly read fraction with decimal denominator."
    );
    assert.isNumber(
      convertHandler.getNum("2.5/1.25lbs"),
      "Incorrectly read fraction with decimal numerator and denominator."
    );
  });

  test("'convertHandler' should correctly return an error on a double-fraction.", () => {
    assert.strictEqual(
      convertHandler.getNum("3/2/3lbs"),
      "invalid number",
      "Double-fraction did not return an error."
    );
  });

  test("'convertHandler' should correctly return an error on a fraction with a zero denominator.", () => {
    assert.strictEqual(
      convertHandler.getNum("5/0lbs"),
      "invalid number",
      "Zero denominator did not return an error."
    );
  });

  test("'convertHandler' should correctly default to a numerical input of 1 when no numerical input is provided.", () => {
    assert.strictEqual(
      convertHandler.getNum("lbs"),
      1,
      "Default return is not 1."
    );
  });

  test("'convertHandler' should correctly read each valid input unit.", () => {
    assert.strictEqual(convertHandler.getUnit("250lbs"), "lbs");
    assert.strictEqual(convertHandler.getUnit("250gal"), "gal");
    assert.strictEqual(convertHandler.getUnit("250mi"), "mi");
    assert.strictEqual(convertHandler.getUnit("250kg"), "kg");
    assert.strictEqual(convertHandler.getUnit("250l"), "L");
    assert.strictEqual(convertHandler.getUnit("250km"), "km");
  });

  test("'convertHandler' should correctly return an error for an invalid input unit.", () => {
    assert.strictEqual(convertHandler.getUnit("800m"), "invalid unit");
  });

  test("'convertHandler' should return the correct return unit for each valid input unit.", () => {
    assert.strictEqual(convertHandler.getReturnUnit("gal"), "L");
    assert.strictEqual(convertHandler.getReturnUnit("lbs"), "kg");
    assert.strictEqual(convertHandler.getReturnUnit("mi"), "km");
    assert.strictEqual(convertHandler.getReturnUnit("L"), "gal");
    assert.strictEqual(convertHandler.getReturnUnit("kg"), "lbs");
    assert.strictEqual(convertHandler.getReturnUnit("km"), "mi");
  });

  test("'convertHandler' should return the spelled-out string unit for each valid input unit.", () => {
    assert.strictEqual(convertHandler.spellOutUnit("gal"), "gallons");
    assert.strictEqual(convertHandler.spellOutUnit("lbs"), "pounds");
    assert.strictEqual(convertHandler.spellOutUnit("mi"), "miles");
    assert.strictEqual(convertHandler.spellOutUnit("L"), "liters");
    assert.strictEqual(convertHandler.spellOutUnit("kg"), "kilograms");
    assert.strictEqual(convertHandler.spellOutUnit("km"), "kilometers");
  });

  test("'convertHandler' should correctly convert from 'gal' to 'L'.", () => {
    assert.strictEqual(convertHandler.convert(250, "gal"), 946.3525);
    assert.strictEqual(convertHandler.convert(192.33, "gal"), 728.04791);
    assert.strictEqual(convertHandler.convert(25.123456789, "gal"), 95.10258);
  });

  test("'convertHandler' should correctly convert from 'L' to 'gal'.", () => {
    assert.strictEqual(convertHandler.convert(250, "l"), 66.04304);
    assert.strictEqual(convertHandler.convert(192.33, "l"), 50.80823);
    assert.strictEqual(convertHandler.convert(25.123456789, "l"), 6.63692);
  });

  test("'convertHandler' should correctly convert from 'mi' to 'km'.", () => {
    assert.strictEqual(convertHandler.convert(250, "mi"), 402.335);
    assert.strictEqual(convertHandler.convert(192.33, "mi"), 309.52436);
    assert.strictEqual(convertHandler.convert(25.123456789, "mi"), 40.43218);
  });

  test("'convertHandler' should correctly convert from 'km' to 'mi'.", () => {
    assert.strictEqual(convertHandler.convert(250, "km"), 155.34318);
    assert.strictEqual(convertHandler.convert(192.33, "km"), 119.50862);
    assert.strictEqual(convertHandler.convert(25.123456789, "km"), 15.61103);
  });

  test("'convertHandler' should correctly convert from 'lbs' to 'kg'.", () => {
    assert.strictEqual(convertHandler.convert(250, "lbs"), 113.398);
    assert.strictEqual(convertHandler.convert(192.33, "lbs"), 87.23935);
    assert.strictEqual(convertHandler.convert(25.123456789, "lbs"), 11.3958);
  });

  test("'convertHandler' should correctly convert from 'kg' to 'lbs'.", () => {
    assert.strictEqual(convertHandler.convert(138, "kg"), 304.23817);
    assert.strictEqual(convertHandler.convert(113.398, "kg"), 250);
    assert.strictEqual(convertHandler.convert(25.123456789, "kg"), 55.38779);
  });
});
