const db = require('../../config/db')

module.exports = {
    all(params) {
        const { table, options } = params
        return db.query(`
            SELECT * from ${table} ${options}
        `)
    },
    findBy(params) {
        const { id, table } = params
        return db.query(`SELECT * FROM ${table} WHERE id = $1`, [id])
    },
    async findJoin(params) {
        try {
            const { table, tableJoin, idJoin, filterQuery } = params

            let query = `
                SELECT ${table}.id AS idchef, ${table}.name AS chef, ${tableJoin}.* 
                FROM ${tableJoin}
                LEFT JOIN ${table} ON (${table}.id = ${tableJoin}.${idJoin})
                ORDER BY ${tableJoin}.title;
            `
            return await db.query(query)
        } catch (error) {
            console.error(error)
        }
    },
    async findJoinBy(params) {
        try {
            const { id, table, tableJoin, idJoin } = params

            let query = `
                SELECT ${tableJoin}.*, ${table}.id AS idchef, ${table}.name AS chef
                FROM ${tableJoin}
                LEFT JOIN ${table} ON (${table}.id = ${tableJoin}.${idJoin})
                WHERE ${tableJoin}.id = ${id};
            `
            return await db.query(query)
        } catch (error) {
            console.error(error)
        }
    },
    async findJoinCounter(params) {
        try {
            const { id, table, tableJoin, idJoin } = params

            let query = `
                SELECT (SELECT count(*) FROM ${tableJoin} WHERE ${tableJoin}.${idJoin} = ${id}) AS total, ${tableJoin}.*, 
                ${table}.id AS idchef, ${table}.name AS chef, ${table}.avatar AS avatar 
                FROM ${table}
                LEFT JOIN ${tableJoin} ON (${tableJoin}.${idJoin} = ${table}.id)
                WHERE ${table}.id = ${id};
            `
            return await db.query(query)
        } catch (error) {
            console.log(error)
        }
    },
    async findJoinCounterAll(params) {
        try {
            const { table, tableJoin, idJoin } = params

            let query = `
                SELECT ${table}.*, count(${tableJoin}) AS total
                FROM ${table}
                LEFT JOIN ${tableJoin} ON (${table}.id = ${tableJoin}.${idJoin})
                GROUP BY ${table}.id
            `
            return await db.query(query)
        } catch (error) {
            console.log(error)
        }
    },
    async findOne(table, filters) {
        let query = `SELECT * FROM ${table}`

        Object.keys(filters).map(key => {
            query = `${query}
            ${key}
            `

            Object.keys(filters[key]).map(field => {
                query = `${query} ${field} = '${filters[key][field]}'`
            })
        })

        const results = await db.query(query)
        return results.rows[0]
    },
    async findJoinSearch(params) {
        try {
            const { filter, table, tableJoin, idJoin } = params

            let query = "",
                filterQuery = `WHERE`

            filterQuery = `
                ${filterQuery}
                ${tableJoin}.title ilike '%${filter}%'
                OR ${tableJoin}.ingredients ilike '%${filter}%'
                OR ${tableJoin}.preparation ilike '%${filter}%'
            `
            query = `
                SELECT ${tableJoin}.*, ${table}.id AS idchef, ${table}.name AS chef
                FROM ${tableJoin}
                LEFT JOIN ${table} ON (${table}.id = ${tableJoin}.${idJoin})
                ${filterQuery}
            `

            return await db.query(query)
        } catch (error) {
            console.error(error)
        }
    },
    async save(params) {
        const { fields, values, table, data } = params
        const query = `
            INSERT INTO ${table} (${fields}) VALUES (${values})
            RETURNING id
        `
        return await db.query(query, data)
    },
    async update(params) {
        const { query, data } = params

        return await db.query(query, data)
    },
    async delete(params) {

        try {
            let { id, table } = params
            return await db.query(`DELETE FROM ${table} WHERE id = $1`, [id])
        } catch (error) {
            console.error(error)
        }

    }
}