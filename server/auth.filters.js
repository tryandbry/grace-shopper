const mustBeLoggedIn = (req, res, next) => {
    // temporarily removing this so we can check things
    // if (!req.user) {
    //     return res.status(401).send('You must be logged in')
    // }
    next()
}

const selfOnly = action => (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return res.status(403).send(`You can only ${action} yourself.`)
  }
  next()
}

// rewrite to give access only to admins
const forbidden = message => (req, res) => {
  res.status(403).send(message)
}

// Feel free to add more filters here (suggested: something that keeps out non-admins)

module.exports = {mustBeLoggedIn, selfOnly, forbidden}
