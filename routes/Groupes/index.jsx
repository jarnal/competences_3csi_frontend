module.exports = {
  path: 'groupes',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Groupes.jsx'))
    })
  }
}
