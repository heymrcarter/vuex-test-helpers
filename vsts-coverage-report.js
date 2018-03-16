let fs = require('fs')
let path = require('path')
let inline = require('inline-css')

const TEST_RESULTS_DIRECTORY = './.test_output'
const CODE_COVERAGE_DIRECTORY = './.test_output/coverage'

const files = fs.readdirSync(CODE_COVERAGE_DIRECTORY)
const reports = files.filter(file => file.endsWith('.html'))

reports.forEach((report) => {
  let filePath = path.join(CODE_COVERAGE_DIRECTORY, report)
  let options = {
    url: 'file://' + path.resolve(filePath),
    extraCss: '.pad1 { padding: 0; }'
  }

  const reportData = fs.readFileSync(path.resolve(filePath))
  inline(reportData.toString(), options)
    .then((html) => {
      let outputFile = path.join(TEST_RESULTS_DIRECTORY, report)
      fs.writeFileSync(outputFile, html)
    })
    .catch((err) => {
      console.error(err)
    })
})
