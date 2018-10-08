const { Project, SessionsProject, User } = require('../models');

module.exports = {
  async index(req, res, next) {
    try {
      const projects = await Project.findAll({
        include: [SessionsProject, User],
        where: {
          UserId: req.session.user.id,
        },
      });
      return res.render('dashboard/index', { projects });
    } catch (error) {
      return next(error);
    }
  },
};
