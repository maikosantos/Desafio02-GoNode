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
      const ProjectId = req.params.id;

      // console.log(`ID = ${req.params.id}`);

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
};
