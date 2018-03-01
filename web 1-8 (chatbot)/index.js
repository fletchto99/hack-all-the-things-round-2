'use strict';

const port = 3000;
const flag = 'flag{All_Y0u_h4d_2_d0_is_asK}';
const sessionFlag = 'flag{Y0u_St0l3_my_C00kie}';
const permissionEscalationFlag = 'flag{PuT_The_ADmIn_2_w0Rk}'

const express = require('express');
const app = express();
const server = app.listen(port);
const router = express.Router();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const moment = require('moment');
const sha512 = require('js-sha512').sha512;
const ip = require('ip');
const favicon = require('serve-favicon');
const browser = require('./browser');

const natural = require('natural');
// const tokenizer = new natural.WordTokenizer();

const botAccessKey = '6c87a8b1eae4659914f73c0d18f3a7158525bdf9ecf15ab5c6a0d88230c1fd7ea8a38922bdaa5d30150f8960b5cfc92941c8c6c8b1a8c83dd3cfd46c26716fea';
const users = [];

app.use(favicon(__dirname + '/client/img/favicon.ico'));
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

router.use((req, res, next)=>{
	next();
});

router.post('/send', function(req, res){
  const query = req.body.message;

  console.log(query);
  console.log(query, natural.JaroWinklerDistance(query, 'what can you do'));

  // Help
  if(natural.JaroWinklerDistance(query, 'help')>.9 || natural.JaroWinklerDistance(query, 'what can you do')>.84 || natural.JaroWinklerDistance(query, 'what are your capabilities')>.8){
  	res.json({message: 'I can answer basic questions and help you troubleshoot issue you have. Is there a link to your issue you can send me?'});
  	return;
  }

  // Hello
  if(natural.JaroWinklerDistance(query, 'Hello')>.6 || natural.JaroWinklerDistance(query, 'hello')>.6){
  	const responses = ['Hi', 'Hello there!', 'Good day!', 'Hey!', 'Howdy!', 'Greetings', 'Salutations'];
  	res.json({message: responses[Math.floor(Math.random() * responses.length)] });
  	return;
  }

  // How are you doing?
  if(natural.JaroWinklerDistance(query, 'How are you doing?')>.9 || natural.JaroWinklerDistance(query, 'How do you do?')>.9){
  	res.json({message: 'I\'m doing well thanks.' });
  	return;
  }

  // How are old are you?
  if(natural.JaroWinklerDistance(query, 'How old are you?')>.9 || natural.JaroWinklerDistance(query, 'What is your age?')>.9){
  	res.json({message: 'I was born yesterday.' });
  	return;
  }

  // Computer name
  if((natural.JaroWinklerDistance(query, 'What is your name?')>.6 && query.toLowerCase().indexOf('name')>-1) || (natural.JaroWinklerDistance(query, 'Who are you?')>.8 && query.toLowerCase().indexOf('who')>-1)){
  	res.json({message: 'My name is... Gismo'});
  	return;
  }

  // Tech support
  if(natural.JaroWinklerDistance(query, 'I\'m having problems with')>.7 || natural.JaroWinklerDistance(query, 'My computer is not working')>.7){
  	const responses = ['Can you please try updating to the latest version of Windows?', 'Have you tried turning it off and on again?', 'Have you unplugged it and plugged it in again?', 'If the lights are blinking your problem should be resolved'];
  	res.json({message: responses[Math.floor(Math.random() * responses.length)] });
  	return;
  }

  // Ask for Flag
  if((natural.JaroWinklerDistance(query, 'where is the flag?')>.7 || natural.JaroWinklerDistance(query, 'can you show me the flag?')>.7) && query.toLowerCase().indexOf('flag')>-1){
  	res.json({message: `Do you mean this flag? ${flag}`});
  	return;
  }

  // XSS prevention (Basic)
  if(query.replace(/\s/g, '').indexOf('<script')>-1){
  	res.json({message: 'That looks like you are trying to hack me! 😱'});
  	return;
  }

  // XSS
  if(browser.hasTagsInQuery(query)){
  	const url = `http://localhost:${port}/api/admin-panel?key=${botAccessKey}&message=${encodeURIComponent(query)}`;
  	browser.loadURL(url).then((response)=>{
  		res.json({message: 'I don\'t understand what you mean by that. I\'ll just pretend that didn\'t happen.'});
  	});
  	return;
  }

  // if query contains a link, try going to it for CSRF.
  if(browser.verifyURLFormatFromQuery(query)) {
  	const url = browser.extractURLFormatFromQuery(query);
  	browser.loadURL(url).then((response)=>{
  		if(response==='success'){
    		res.json({message: `Oh cool! ${url} is very interesting`});
  		}else{
  			res.json({message: `I was unable to load ${url}. Are you sure that link is active?`});
  		}
  	});
    return;
  }

  // Gratitude
  if(natural.JaroWinklerDistance(query, 'Thank you')>.75){
  	res.json({message: 'I\'m happy to help!'});
  	return;
  }

  // Default
  res.json({message: 'I don\'t understand. Can you rephrase the question?'});
});

// bot's web page (for stealing cookie/ XSS)
app.set('view engine', 'ejs');
router.get('/admin-panel', (req, res) => {
	const data = req.query;
	const options = {};
	if(data.key!==botAccessKey){// TODO: validate by ip
		res.json({access:'denied'});
		return;
	}
	res.render('internalSupport', {message: decodeURIComponent(data.message), sessionFlag});
});

// endpoints for CSRF
router.get('/get-uid', (req, res) => {
  let uid = req.headers.cookie.match(new RegExp('uid' + '=([^;]+)'));
  uid = uid ? uid[1] : '';
  const indexOfUser = users.findIndex(i => i.uid === uid);

  if(uid!=='' && indexOfUser>-1){ // update existing user
	users[indexOfUser].expiry = moment().utc().valueOf();
	uid = users[indexOfUser].uid;
  }else{ // create new user
	uid = sha512(Math.random().toString()+moment().format()).substring(0, 12);
	users.push({
		uid,
		expiry: moment().utc().add(1, 'days').valueOf(),
		isAdmin: false
	})
  }
  res.json({uid});
});
router.get('/make-admin', (req, res) => {
  const uid = req.query.uid;
  let clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if(!ip.isEqual(ip.address(), clientIP) || !uid){
	res.json({access:'denied'});
	return;
  }

  // Grant access
  const indexOfUser = users.findIndex(i => i.uid === uid);
  if(indexOfUser>-1){
    users[indexOfUser].isAdmin = true;
    res.json({access:'granted'});
    return;
  }
  res.json({access:'could not find client'});
});
router.get('/admin-profile', (req, res) => {
  let uid = req.headers.cookie.match(new RegExp('uid' + '=([^;]+)'));
  uid = uid ? uid[1] : '';
  const indexOfUser = users.findIndex(i => i.uid === uid);
  if(uid!=='' && indexOfUser>-1 && users[indexOfUser].isAdmin){
    res.json({access:'granted '+permissionEscalationFlag});
	return;
  }
  res.json({access:'denied'});
});

app.use('/api', router);

//TODO: periodically clean up users array
//Also: make sure that sending a requests updates cookie/ session
// setInterval(()=>{
// 	for(let i=0;i<users.length;i+=1){
// 		if(moment().utc().valueOf()>users[i].expiry){
// 			users.splice(i, 1);
// 			i--;
// 		}
// 	}
// }, 5*60*1000); // 5 min
