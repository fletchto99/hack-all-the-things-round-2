let flag = 'search harder';

let obj = {
	nk: 'a',
	eu: 'c',
	kk: 'd',
	iq: 'e',
	di: 'f',
	ty: 'g',
	qq: 'h',
	xc: 'i',
	el: 'l',
	aa: 'o',
	ij: 's',
	lj: 't',
	tk: 'w',
	c9: '{',
	k9: '-',
	op: '}'
}

let r = ['op', 'iq', 'kk', 'aa', 'eu', 'k9', 'ij', 'xc', 'qq', 'lj', 'k9', 'ij', 'xc', 'k9', 'lj', 'nk', 'qq', 'tk', 'c9', 'ty', 'nk', 'el', 'di'];

let derp = (a) => {
	flag = flag.substring(0,0);
}

let a = 32;

derp();

r.reverse();
if(0!=[]){
	for(let i=0; i<Math.abs(a-32-23); i++){
		flag += obj[r[i]];
	}
}else{
	alert('access denied');
}
derp();