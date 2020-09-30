
function load(database, data, tableName, callback) {
    if (!database) throw new Error("no database given")
    if (!data) throw new Error("no data given")
    if (data.length < 1) throw new Error("no data given 0 length")
    if (!tableName) throw new Error("no table name given")

    console.log(callback);

    let typePairs = Object.keys(data[0]).map(key => `${key} ${convert(data[0][key])}`)

    console.log(`CREATE TABLE ${tableName} (id INTEGER PRIMARY KEY, ${typePairs})`);
    database.all(`CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY, ${typePairs})`, function (err) {
        insert(database, data, tableName, callback)
    })    
}

function insert(database, items, tableName, callback) {
    if (items.length < 1) return callback(database)
    let item = items[0]

    let keys = Object.keys(items[0]).map(key => `${key}`)
    let values = Object.values(items[0]).map((val) => {
        if ((typeof val) == "string") {
            return `"${val}"`
        }
        return `${val}`
        
    })

    database.all(`INSERT INTO ${tableName}(${keys}) VALUES (${values}) `, function(err) {
        if (err != undefined) return console.log(err);
        insert(database, items.slice(1), tableName, callback)
    })
}

function convert(type) {
    switch (typeof type) {
        case "number":
            return (String(type).indexOf(".") < 0 ? "INTEGER" : "FLOAT")
            break;

        case "boolean":
            return "BOOLEAN"
            break;
        
        case "string":
            return "TEXT"
            break;

        default:
            throw new Error(`no type for ${typeof type}`);
    }
}

module.exports = {load, convert}