const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        nick: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        provider: {
          type: Sequelize.STRING(10),
          allowNull: false,
          defaultValue: "local",
        },
        snsId: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.User, {
      foreignKey: "followingId",
      as: "Followers",
      through: "Follow",
    });
    db.User.belongsToMany(db.User, {
      foreignKey: "followerId",
      as: "Followings",
      through: "Follow",
    });
  }
};
/* 
    user 와 팔로우는 n:m의 관계를 가지고있는데 
    팔로잉은 팔로우 아이디를 가르키고있고 팔로우는 팔로이응ㄹ 가리크고있는것
*/

/*
사용자 정보를 저장하는 모델입니다. 이메일, 닉네임, 비밀번호를 저장, sns로그인을 했을경우에는
provider와 snsId를 저장한다. provider가 local이면 로컬 로그인을 한것이고, kakao면 카카오
로그인을 한것 기본적으로로컬 로그인이라 가정해서 defaultvalue를 local로 주었습니다

테이블 옵션으로 timestamp와 paranoid가 true로 주어져서 createAt과,updatedAt,deletedAt
칼럼도 생성된다

allowNull은 notNull옵션과 동일 

*/
