"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({Comment}) {
            this.hasMany(Comment, {foreignKey: "id", onDelete: "CASCADE"});
        }
        toJSON(){
            return {...this.get(), id: undefined};
        }
    }
    Post.init(
        {
            slug: {
                type:DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate:{
                    notEmpty:true,
                }
            },
            title: {
                type:DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type:DataTypes.STRING,
                allowNull: false,
            },
            body: {
                type:DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Post",
            tableName: "posts",
        }
    );
    return Post;
};
