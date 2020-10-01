const { Database } = require("sqlite3")
const {load, convert} = require("../src/loader")
const aeroports = require("../data/airports.json")

jest.setTimeout(30000);

describe("load tests", () => {
    test("test load function", (done) => {

        db = new Database(":memory:")
        load(db, aeroports, "Aeroports", (db) => {

            // perform tests
            db.all("Select city from Aeroports LIMIT 3", (err, rows) => {
                console.log("error is ", err);


                expect(rows.length).toBe(3)
                expect(rows[0].city).toBe("Anchor Point")
                done()
            })
        })
    })
})

describe("converter tests", () => {
    test("test conversion test", () => {
        expect(convert("")).toEqual("TEXT")
        expect(convert(1)).toEqual("INTEGER")
        expect(convert(true)).toEqual("BOOLEAN")
    })
})

