const optionsDb = require('../../model/index')
const { fieldsCreate, valuesCreate } = require('../../../lib/utils')

module.exports = {
    async list(req, res) {
        try {
            let table = 'chefs',
                options = 'ORDER BY name'

            const params = { table, options }

            let results = await optionsDb.all(params)
            const chefs = results.rows

            res.render("admin/chefs/list", { chefs })
        } catch (error) {
            console.error(error)
            return res.render("admin/chefs/lis", {
                error: "Houve um error na consulta, favor voltar mas tarde!"
            })
        }
    },
    create(req, res) {
        try {
            return res.render("admin/chefs/create")
        } catch (error) {
            console.error(error)
        }
    },
    async show(req, res) {
        try {
            const { id } = req.params
            let table = 'chefs',
                tableJoin = 'recipes',
                idJoin = 'chef_id',
                params = ''

            params = { id, table, tableJoin, idJoin }

            let results = await optionsDb.findJoinCounter(params)
            const chef = results.rows

            res.render("admin/chefs/show", { chef })
        } catch (error) {
            console.error(error)
            return res.render("admin/chefs/list", {
                error: "Houve um error na consulta, favor voltar mas tarde!"
            })
        }
    },
    async edit(req, res) {
        try {
            const { id } = req.params
            let table = 'chefs'

            const params = { id, table }

            let results = await optionsDb.findBy(params)
            const chef = results.rows[0]

            res.render("admin/chefs/edit", { chef })
        } catch (error) {
            console.error(error)
            return res.render("admin/chefs/list", {
                error: "Houve um error na edição do chef, favor voltar mas tarde!"
            })
        }
    },
    async save(req, res) {
        try {

            const keys = Object.keys(req.body)
            let table = 'chefs',
                fields = fieldsCreate(req.body),
                values = valuesCreate(fields),
                params = ''

            for (key of keys) {
                if (req.body[key] == "") {
                    return res.render("chefs/create", {
                        chef: req.body,
                        error: 'Por favor, preencher todo os campos!'
                    })
                }
            }

            const data = [
                req.body.name,
                req.body.avatar
            ]

            params = { fields, values, table, data }
            await optionsDb.save(params)

            let options = 'ORDER BY name'
            params = { table, options }
            let results = await optionsDb.all(params)
            const chefs = results.rows

            return res.render("admin/chefs/list", {
                chefs,
                success: "O Chef, foi salvo com sucesso!"
            })
        } catch (error) {
            console.error(error)
            return res.render("chefs/list", {
                error: "Houve um error na hora de Salvar, favor voltar mas tarde!"
            })
        }

    },
    async update(req, res) {
        try {
            const keys = Object.keys(req.body)
            let table = 'chefs',
                params = ''

            for (key of keys) {
                if (req.body[key] == "") {
                    return res.render("chefs/edit", {
                        chef: req.body,
                        error: 'Por favor, preencher todo os campos!'
                    })
                }
            }

            const query = `
                UPDATE chefs SET
                    name = ($1),
                    avatar = ($2)
                    WHERE id = $3
            `

            const data = [
                req.body.name,
                req.body.avatar,
                req.body.id
            ]

            params = { query, data }
            await optionsDb.update(params)

            let options = 'ORDER BY name'
            params = { table, options }
            let results = await optionsDb.all(params)
            const chefs = results.rows

            return res.render("admin/chefs/list", {
                chefs,
                success: "O Chef, foi alterado com sucesso!"
            })
        } catch (error) {
            console.error(error)
            return res.render("admin/chefs/list", {
                error: "Houve um error no Update, favor voltar mas tarde!"
            })
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.params
            let table = 'chefs',
                params = ''

            params = { id, table }
            await optionsDb.delete(params)

            let options = 'ORDER BY name'
            params = { table, options }
            let results = await optionsDb.all(params)
            const chefs = results.rows

            return res.render("admin/chefs/list", {
                chefs,
                success: "O Chef, foi alterado com sucesso!"
            })
        } catch (error) {
            console.error(error)
            return res.render("admin/chefs/list", {
                error: "Error ao tentar deletar sua conta!"
            })
        }
    }
}