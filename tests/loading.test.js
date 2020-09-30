const { Database } = require("sqlite3")
const {load, convert} = require("../src/loader")
const aeroports = require("../data/airports.json")

jest.setTimeout(30000);

describe("load tests", () => {
    test("test load function", (done) => {

        db = new Database("test.db")
        load(db, aeroports, "Aeroports", (err) => {
            done()
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

