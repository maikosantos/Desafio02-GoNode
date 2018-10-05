module.exports = (sequelize, DataTypes) => {
  const SessionProject = sequelize.define('SessionProject', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
  });

  SessionProject.associate = (models) => {
    SessionProject.belongsTo(models.Project);
  };

  return SessionProject;
};
