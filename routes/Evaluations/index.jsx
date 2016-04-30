module.exports = {
  path: 'evaluations',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Evaluations.jsx'))
    })
  }
}
