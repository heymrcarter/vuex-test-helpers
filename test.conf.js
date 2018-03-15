process.env.NODE_ENV = 'test'

const td = require('testdouble')
global.td = td

const chai = require('chai')
const tdChai = require('testdouble-chai')

chai.use(tdChai(td))

require('chai/register-expect')
require('babel-register')()
