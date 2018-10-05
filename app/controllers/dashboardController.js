const { Project, SessionsProject, User } = require('../models');

module.exports = {
  async index(req, res, next) {
    try {
      const user = await User.findOne({ where: { id: req.session.user.id } });

      const projects = await Project.findAll({
        include: [SessionsProject, User],
        where: {
          UserId: req.session.user.id,
        },
      });
      return res.render('dashboard/index', { projects, user });
    } catch (error) {
      return next(error);
    }
  },
};
