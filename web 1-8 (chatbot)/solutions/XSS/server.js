'use strict';

const port = 3001;
const express = require('express');
const app = express();
const server = app.listen(port);
const router = express.Router();

router.use((req, res, next)=>{
	next();
});

router.get('/logger', (req, res) => {
  console.log(req.query);
	res.json({thank:'you'});
});

app.use('/api', router);
