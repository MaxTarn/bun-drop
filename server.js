const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Add custom routes
server.get('/menu/types', (req, res) => {
  const data = require('./db.json').menu.types;
  res.json(data);
});

server.get('/menu/data', (req, res) => {
  const data = require('./db.json').menu.data;
  res.json(data);
});

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Use default router
server.use(router);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
