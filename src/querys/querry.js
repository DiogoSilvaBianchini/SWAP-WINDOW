const db = require("../config/dbCofig")

const dataBaseLength = async () => {
    try {
        const [results] = await db.query("SELECT * FROM HSSPLFIL ;")
        return results.length
    } catch (error) {
    }
}

module.exports = {dataBaseLength}