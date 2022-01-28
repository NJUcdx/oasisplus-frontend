const api = require("./handler");
const Mock = require("mockjs");

const reqInterceptor = (app, url, type, ret) => {
  if (type === "get") _get(app, url, ret);
  else if (type === "post") _post(app, url, ret);
};

const _get = (app, url, ret) => {
  app.get(url, (req, resp) => {
    resp.json(Mock.mock(ret));
  });
};

const _post = (app, url, ret) => {
  app.post(url, (req, resp) => {
    resp.json(Mock.mock(ret));
  });
};

module.exports = app => {
  Object.values(api).forEach(value => {
    reqInterceptor(app, ...value);
  });
};
