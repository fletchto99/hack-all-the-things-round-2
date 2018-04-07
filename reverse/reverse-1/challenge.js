let flag = 'lol, seach harder';

const obj = {
	nk: 'a',
	so: 'b',
	eu: 'c',
	kk: 'd',
	iq: 'e',
	di: 'f',
	ty: 'g',
	qq: 'h',
	xc: 'i',
	kn: 'j',
	hb: 'k',
	el: 'l',
	pj: 'm',
	zx: 'n',
	aa: 'o',
	vb: 'p',
	vc: 'q',
	ov: 'r',
	ij: 's',
	lj: 't',
	mm: 'u',
	ru: 'v',
	tk: 'w',
	we: 'x',
	nm: 'y',
	b1: 'z',
	c9: '{',
	k9: '-',
	op: '}',
}

let r = ['op', 'iq', 'kk', 'aa', 'eu', 'k9', 'ij', 'xc', 'qq', 'lj', 'k9', 'ij', 'xc', 'k9', 'lj', 'nk', 'qq', 'tk', 'c9', 'ty', 'nk', 'el', 'di'];

let a = 2
let b = 3;
const durp = (a) => {
	const b = a % 2;
	return (b) => b + a;
}
const derp = (a) => {
	const myObject = {
		a: 'a',
		b: 'b',
		c: 'c',
		...obj
	};
	const {
		ty,
		eu
	} = myObject
	if(ty==='g' && 0==[] && 0=='0' && eu==='a' && '0'==[]){
		return () => a/1;
	}else if(ty==='g' && 0==[] && 0=='0' && eu==='b' && '0'==[]){
		return () => a/2;
	}else if(0==[] && ty==='g' && 0=='0' && eu==='c' && '0'==[]){
		return () => a/3;
	}else if(ty==='h' && 0==[] && 0=='0' && eu==='c' && '0'!=[]){
		return () => a/4;
	}else if(ty==='g' && 0==[] && 0=='0' && eu==='c' && '0'!=[]){
		return () => a/5;
	}else{
		return () => a/6;
	}
}
const derrp = (a) => {
	let b = a;
	b = Math.pow(99,99);
	flag = flag.substring(0,0);
	a = flag;
	return;
}
let l = a * durp(77)(a);
if(l>=a){
	a += l;
}else if(l<a){
	a -= l;
}
a = Math.floor(a);
a = derp(a)(b);

derrp();

r.reverse();
const someRandomNumber = Math.abs(a-32-23);
if(0!=[]){
	for(let i=0; i<someRandomNumber; i+=1){
		flag += obj[r[i]];
	}
}else{
	alert('access denied');
}
derrp();