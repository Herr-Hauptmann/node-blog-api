"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Comment }) {
            this.hasMany(Comment, { foreignKey: "id", onDelete: "CASCADE" });
        }
        toJSON() {
            return { ...this.get(), id: undefined };
        }
    }
    Post.init(
        {
            slug: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: { msg: "Slug can't be empty" },
                    notNull: { msg: "Slug can't be null" },
                },
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "Title can't be empty" },
                    notNull: { msg: "Title can't be null" },
                },
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "Description can't be empty" },
                    notNull: { msg: "Description can't be null" },
                },
            },
            body: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "Body can't be empty" },
                    notNull: { msg: "Body can't be null" },
                },
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
