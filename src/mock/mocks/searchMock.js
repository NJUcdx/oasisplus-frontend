const Random = require("mockjs").Random;

const searchInfoVO = {
  content: {
    total: Random.natural(1, 1000),
    "info|8": [
      {
        "abst|1": /[A-Z]([a-z]{5,8} ){0,100}\./,
        docId: Random.natural(1, 1000),
        keywords: "@name,@name",
        publication:
          "2016 31st IEEE/ACM International Conference on Automated Software Engineering (ASE)",
        year: /201[6-9]/,
        title: /[A-Z]([a-z]{5,8} ){5,15}/,
        "authors|3": [
          {
            institution: /[A-Z]([a-z]{5,8} ){0,100}\./,
            name: "@name",
            id: Random.natural(1, 1000),
            db: "ACM"
          }
        ],
        db: "ACM",
        citations: Random.natural(100, 1000)
      }
    ]
  },
  message: "ok",
  sucess: true
};

module.exports = {
  comsearch: ["/search/author", "get", searchInfoVO],
  author_search: ["/search/institution", "get", searchInfoVO]
};
