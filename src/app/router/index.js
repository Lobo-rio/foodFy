const express = require('express')

const site = require('./site/index')
const admin = require('./admin/index')

const router = express.Router()

router.use(site)
router.use(admin)

module.exports = router