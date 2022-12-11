'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Post}) {
      this.belongsTo(Post, {foreignKey: "postId"});
    }
    toJSON(){
      return {...this.get(), postId:undefined};
    }
  }
  Comment.init({
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments'
  });
  return Comment;
};