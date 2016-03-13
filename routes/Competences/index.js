module.exports = {
  path: 'competences',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Competences'))
    })
  }
}
