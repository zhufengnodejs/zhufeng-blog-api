'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.post('/user/signup', controller.user.signup);
  router.post('/user/signin', controller.user.signin);
  router.get('/user/signout',app.jwt,controller.user.signout);
  
  router.resources('article','/api/articles',app.jwt,controller.articles);

  router.get('/api/articles/pv/:id',controller.articles.updatePv);
  router.post('/api/articles/comment/:id',app.jwt, controller.articles.comment);
  
  router.resources('category','/api/categories',app.jwt,controller.categories);
};
