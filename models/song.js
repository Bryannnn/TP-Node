module.exports = (sequelize, Sequelize) => { //Vérifier avec song.validator pour le type de données
  const Song = sequelize.define("song", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    genre: {
      type: Sequelize.STRING,
      validate: {
        max: 80
      }
    },
    titre: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        max: 80
      }
    },
    duree: {
      type: Sequelize.INTEGER,
      validate: {
        min: 0,
      }
    },
    auteur: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        max: 100
      }
    },
  });

  return Song;
};
