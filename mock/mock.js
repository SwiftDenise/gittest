module.exports = {
  rules: [
    {
      pattern: /\/api\/getLivelist\.php\?rtype=origin$/,
      respondwith: './home.json'
    },
    {
      pattern: /\/api\/getLivelist\.php\?rtype=more$/,
      respondwith: './home.json'
    },
    {
      pattern: /\/api\/getLivelist\.php\?rtype=refresh$/,
      respondwith: './home.json'
    }

  ]
};
