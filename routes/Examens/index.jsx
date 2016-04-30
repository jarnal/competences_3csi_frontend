module.exports = {
  path: 'examens',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Examens.jsx'))
    })
  }
}
