module.exports = {
  path: 'matieres',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Matieres.jsx'))
    })
  }
}
