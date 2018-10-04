module.exports = {
  async index(req, res, next) {
    try {
      return res.render('dashboard/index');
    } catch (error) {
      return next(error);
    }
  },
};
