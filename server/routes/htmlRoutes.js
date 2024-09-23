const path = require('path');

module.exports = (app) => {
  console.log(path.join(__dirname, '../client/dist/index.html')); // Log the path

  app.get('/', (req, res) =>
    res.sendFile(path.resolve('client/dist/index.html'))

  );
};
