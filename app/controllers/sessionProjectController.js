const { SessionsProject, Project } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      const ProjectId = req.params.projectId;

      await SessionsProject.create({
        ...req.body,
        content: '...',
        ProjectId,
      });

      req.flash('success', 'Sessão criada com sucesso');

      return req.session.save(() => {
        res.redirect(`/app/projects/${ProjectId}`);
      });
    } catch (error) {
      return next(error);
    }
  },

  async show(req, res, next) {
    try {
      const { projectId, id } = req.params;

      const projects = await Project.findAll({
        where: {
          id: projectId,
        },
      });

      const sessions = await SessionsProject.findAll({
        where: { ProjectId: projectId },
      });

      const session = await SessionsProject.findById(id);

      // console.log(session);

      res.render('projects/show', {
        activeProject: projectId,
        projects,
        sessions,
        currentSession: session,
      });
    } catch (error) {
      return next(error);
    }
  },

  async edit(req, res, next) {
    try {
      const { projectId, id } = req.params;

      const sessions = await SessionsProject.findAll({
        include: [Project],
        where: {
          ProjectId: projectId,
        },
      });

      const project = await Project.findById(projectId);
      const session = await SessionsProject.findById(id);

      return res.render('sessions/edit', {
        activeProject: projectId,
        sessions,
        project,
        currentSession: session,
      });
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { projectId, id } = req.params;
      const session = await SessionsProject.findById(id);

      await session.update(req.body);

      req.flash('sucess', 'Seção atualizada com sucesso');

      return res.redirect(`/app/projects/${projectId}/sessionsProject/${id}`);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      const { projectId, id } = req.params;

      await SessionsProject.destroy({
        where: {
          id,
        },
      });

      return res.redirect(`/app/projects/${projectId}`);
    } catch (err) {
      return next(err);
    }
  },
};
