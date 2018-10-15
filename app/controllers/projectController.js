const { Project, SessionsProject } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      await Project.create({
        ...req.body,
        UserId: req.session.user.id,
      });

      req.flash('success', 'Projeto criado com sucesso');

      return res.redirect('/app/dashboard/');
    } catch (error) {
      return next(error);
    }
  },

  async show(req, res, next) {
    try {
      const ProjectId = req.params.id;

      const projects = await Project.findAll({
        where: {
          id: ProjectId,
        },
      });

      const sessions = await SessionsProject.findAll({
        where: { ProjectId },
      });

      return res.render('projects/show', {
        projects,
        sessions,
        activeProject: ProjectId,
      });
    } catch (error) {
      return next(error);
    }
  },

  async destroy(req, res, next) {
    try {
      await Project.destroy({
        where: {
          id: req.params.id,
        },
      });

      return res.redirect('/app/dashboard');
    } catch (err) {
      return next(err);
    }
  },
};
