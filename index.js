const fs               = require('fs')
const md5              = require('md5-file')
const {exec}           = require('child_process')
const tamara_directory = './hilf-tamara/'

fs.readdir(tamara_directory, (err, files) => {
  if (err) {
    console.log(err.stack)
  } else {
    const make_tamara_path = filename => {
      return `${tamara_directory}${filename}`
    }

    let key_file = null, dat_file = null
    files.forEach(filename => {
      const tamara_file = make_tamara_path(filename)
      const hash        = md5.sync(tamara_file)

      if (hash === '994a97b3e1e85878aee2702b48549a37') {
        key_file = tamara_file
      } else if (hash === '68f264d9a908f93e8ffea4fb8e77e799') {
        dat_file = tamara_file
      }
    })

    if (key_file !== null && dat_file !== null) {
      exec(`openssl rsautl -decrypt -inkey "${key_file}" -in "${dat_file}"`, (err, stdout) => {
        if (err) {
          console.log(`Failed to execute command openssl, error: ${err}`)
        } else {
          console.log(stdout)
        }
      })
    } else {
      console.log('Could not locate dat/key file')
    }
  }
})
