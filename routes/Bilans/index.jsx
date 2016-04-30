module.exports = {
  path: 'bilans',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Bilans.jsx'))
    })
  }
}
