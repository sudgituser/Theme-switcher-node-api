module.exports = (sequelize, Sequelize) => {
    const Theme = sequelize.define("theme", {
      theme_id: {
        type: Sequelize.INTEGER,
        unique:true,
        primaryKey:true
      },
      theme_name: {
        type: Sequelize.STRING
      }
    });
    return Theme;
  };