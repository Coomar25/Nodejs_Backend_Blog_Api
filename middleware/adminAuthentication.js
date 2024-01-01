export const adminAuthentication = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect("/components/signin");
};
