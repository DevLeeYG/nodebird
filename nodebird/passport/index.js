const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const User = require("../models/user");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  }); /*
     serializeUser는 로그인시 실행되며, req.session객체에 어떤 데이터를 저장할지 정하는 메서드 입니다
     매개변수로 user를 받고나서, done함수에 두번째 인수로 user.id를 넘기고있다.(사용자정보)
    done함수의 첫번째인수는 에러발생시 사용하는것 두번째인수는 저장하고싶은 데이터(user.id)
    */
  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
  /*deserialize는 매 요청시 실행 passport.session이 이 메서드를 호출
   serializeuser의 done의 두번째 인수로 넣엇던 데이터가 deserialiseUser의 매개변수가된다
   여기서는 사용자의 아이디입니다. serializeUser에서 세션에 저장했던 아이디를받아
   데이터베이스에서 사용자 정보를 조회합니다(findone)  조회한아이디를 req.user에 저장합니다
   */
  local();
  kakao();
  /*
즉 serializeuseR는 사용자 정보 객체를 세션에 아이디로 저장한것이고 deserializeuser는
세션에 저장한 아이디를 통해 사용자 정보 객체를 불러오는것
*/
};

/*
1.라우터를 통해 요청이들어옴
2.라우터에서 passport.authenticate메서드 호출
3.로그인전략 수행
4.로그인 성공시 사용자 정보객체와 함게 req.login호출
5.req.login 메서드가 passport.serializeuser호출
6.req.session에 사용자 아이디만 저장
7.로그인완료
 */
