module.exports = (sequelize, DataTypes) => {
  const SessionsProject = sequelize.define('SessionsProject', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
  });

  SessionsProject.associate = (models) => {
    SessionsProject.belongsTo(models.Project);
  };

  return SessionsProject;
};
