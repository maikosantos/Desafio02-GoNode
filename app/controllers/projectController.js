const { Project, SessionsProject } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      const project = await Project.create({
        ...req.body,
        UserId: req.session.user.id,
      });

      req.flash('success', 'Projeto criado com sucesso');

      return res.redirect(`/app/categories/${project.id}`);
    } catch (error) {
      return next(error);
    }
  },

  async show(req, res, next) {
    try {
      const projects = await Project.findAll({
        include: [SessionsProject],
        where: {
          UserId: req.session.user.id,
        },
      });

      const sessions = await SessionsProject.findAll({
        where: { ProjectId: req.params.id },
      });

      return res.render('projects/show', {
        projects,
        sessions,
        activeProject: req.params.id,
      });
    } catch (error) {
      return next(error);
    }
  },
};
