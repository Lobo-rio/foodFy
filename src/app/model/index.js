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
                SELECT ${table}.id AS idChef, ${table}.name AS chef, ${tableJoin}.* 
                FROM ${tableJoin}
                LEFT JOIN ${table} ON (${table}.id = ${tableJoin}.chef_id)
                ORDER BY ${tableJoin}.title;
            `
            return db.query(query)
        } catch (error) {
            console.error(error)
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

    },
    search(params) {
        try {
            const { filter, category, table } = params

            let query = "",
                filterQuery = `WHERE`

            if (category) {
                filterQuery = `${filterQuery}
                    ${table}.category_id = ${category}
                    AND`
            }

            filterQuery = `
                ${filterQuery}
                ${table}.name ilike '%${filter}%'
                OR ${table}.description ilike '%${filter}%'
            `
            query = `
                SELECT ${table}.*, 
                categories.name AS category_name
                FROM ${table}
                LEFT JOIN categories ON (categories.id = ${table}.category_id)
                ${filterQuery}
            `

            return db.query(query)
        } catch (error) {
            console.error(error)
        }
    }
}