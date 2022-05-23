const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("GET /api/convert: Convert a valid input through the API.", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=250lbs")
      .end((err, res) => {
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.initNum, 250);
        assert.strictEqual(res.body.initUnit, "lbs");
        assert.strictEqual(res.body.returnUnit, "kg");
        assert.strictEqual(res.body.returnNum, 113.398);
        assert.strictEqual(
          res.body.string,
          "250 pounds converts to 113.39800 kilograms"
        );

        done();
      });
  });

  test("GET /api/convert: Convert an invalid unit input.", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=32g")
      .end((err, res) => {
        assert.strictEqual(res.text, "invalid unit");
        done();
      });
  });

  test("GET /api/convert: Convert an invalid numeric input.", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kg")
      .end((err, res) => {
        assert.strictEqual(res.text, "invalid number");
        done();
      });
  });

  test("GET /api/convert: Convert an invalid number AND unit.", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kilomegagramer")
      .end((err, res) => {
        assert.strictEqual(res.text, "invalid number and unit");
        done();
      });
  });

  test("GET /api/convert: Convert with no number.", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=kg")
      .end((err, res) => {
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.initNum, 1);
        assert.strictEqual(res.body.initUnit, "kg");
        assert.strictEqual(res.body.returnUnit, "lbs");
        assert.strictEqual(res.body.returnNum, 2.20462);
        assert.strictEqual(
          res.body.string,
          "1 kilograms converts to 2.20462 pounds"
        );
        done();
      });
  });
});
