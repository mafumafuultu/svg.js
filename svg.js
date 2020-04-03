/*
 * svg.js
 * @version: 0.0.2
 * @author: mafumafuultu
 * @url: https://github.com/mafumafuultu/svg.js
 * @licece: MIT
 */
const none = undefined;

const F = {
	mod : (o, f = o => {}) => (f(o), o),
	lift: (o, f = v => {}) => () => f(o),
	vmod: (k, f = (o, k, v) => {}) => (v, o) => (f(o, k, v), o)
};

const omap = (o, k, v) => (o[k] = v, o);
const __renderMap = (o, k, v) => (o.render[k] = v, o);

const __shapeRender = t => ({
	auto() {return this._set('auto', t);},
	optimizeSpeed() {return this._set('optimizeSpeed', t)},
	crispEdges() {return this._set('crispEdges', t);},
	geometricPrecision() {return this._set('geometricPrecision', t);},
	_set : F.vmod('shape-rendering', __renderMap)
});
const __textRender = t => ({
	auto() {return this._set('auto', t);},
	optimizeSpeed() {return this._set('optimizeSpeed', t)},
	optimizeLegibility() {return this._set('optimizeLegibility', t);},
	geometricPrecision() {return this._set('geometricPrecision', t);},
	_set : F.vmod('text-rendering', __renderMap)
});
const __imageRender = t => ({
	auto() {return this._set('auto', t);},
	optimizeSpeed() {return this._set('optimizeSpeed', t)},
	optimizeLegibility() {return this._set('optimizeLegibility', t);},
	_set : F.vmod('image-rendering', __renderMap)(v, o)
});
const __imageRender_css4 = () => ({
	get auto() {return {'image-rendering': 'auto'}},
	get smooth() {return {'image-rendering': 'smooth'}},
	get highQualiry() {return {'image-rendering': 'high-quality'}},
	get crispEdges() {return {'image-rendering': 'crisp-edges'}},
	get pixelated() {return {'image-rendering': 'pixelated'}},
});

/**
 * create rendering options
 */
const renderGen = () => ({
	render: {
		'shape-rendering': 'auto',
		'text-rendering':'auto',
		'image-rendering' : 'auto'
	},
	Shape () {return __shapeRender(this);},
	Text ()   {return __textRender(this);},
	Image ()  {return __imageRender(this);},
	get _ ()  {return this.render;}
});

const __BASE_PROTO__ = {
	// '@': el,
	'@parse' : {
		value (arr) {return arr.filter(v => null != v).map(v => '@' in v ? v['@'] : v)}
	},
	_ : {
		value () {return this['@'];},
	},
	has: {
		value (prop) {return prop in this["@"];}
	},
	type: {
		value(t, is) {
			return typeof t === is;
		}
	},
	of : {
		value (v, t) {return v instanceof t;}
	},
	id : {
		value(id) {
			if (this.has('id') && this.type(id, 'String')) {
				this['@'].id = id;
			}
			return this;
		}
	},
	cls : {
		value(v, force = true) {
			if (this.has('classList') && this.type(v, 'String')) {
				this['@'].classList.toggle(v, force);
			}
			return this;
		}
	},
	addCls : {
		value(a) {
			if (this.has('classList') && this.of(a, Array)) {
				a.reduce((cl, v) => (cl.toggle(v, true), cl), this['@'].classList)
			}
			return this;
		}
	},
	rmCls : {
		value(a) {
			if (this.has('classList') && this.of(a, Array)) {
				a.reduce((cl, v) => (cl.toggle(v, false), cl), this['@'].classList)
			}
			return this;
		}
	},
	data : {
		value(o) {
			if (this.has('dataset') && this.type(k, 'String')) {
				v == null
					? delete this['@'].dataset[k]
					: this['@'].dataset[k] = v;
			}
			return this;
		}
	},
	attrs: {
		value(o) {
			if (this.has('setAttribute')) {
				if (o == null) {
					let atr = (ob, k) => (ob[k] = this['@'].getAttribute(k), ob);
					return this['@'].getAttributeNames().reduce(atr.bind(this) ,{});
				}
				return Object.entries(o).reduce((t, [k, v]) => (t['@'].setAttribute(k, v), t), this);
			}
			return this;
		},
	},
	remAttr: {
		value(a) {
			if (this.has('removeAttribute')) {
				if (a.length) {
					return a.reduce((t, k) => (t['@'].removeAttribute(k), t), this);
				}
			}
			return this;
		}
	},
	zoom: {
		value(center=[0,0], x) {
			if (this.has('viewBox')) {
				let {width, height} = this.attrs();
				let w = width/x, h = height/x;
				this.attrs({viewBox: `${center[0] - w/2} ${center[1] - h/2} ${w} ${h}`})
			}
			return this;
		}
	},
	$: {
		value(...child) {
			if (this.has('innerHTML')) {
				return this['@'].innerHTML += this['@parse'](child).reduce((t, v) => 'outerHTML' in v ? t + v.outerHTML : t + v, ''), this;
			}
			return this;
		},
	},
	$$:{
		value(...child) {
			if (this.has('appendChild')) {
				return this['@parse'](child).reduce((t, v) => (t['@'].appendChild(v), t) ,this);
			}
			return this;
		}
	},
	txt: {
		value(txt = '') {
			if (this.has('textContent')) {
				this['@'].textContent = txt;
			}
			return this;
		}
	},
	inner: {
		value(s) {
			if (this.has('innerHTML')) {
				this['@'].innerHTML = s;
			}
			return this;
		}
	},
	f: {
		value(f = el => {}) {
			try {
				f(this['@'])
			} catch (e) {
				console.error(e);
			}
			return this;
		}
	},
	peak: {value() {return console.log(this['@']), this;}},
	app: {
		value(name, ...v) {
			if (this.has(name) && this.type(name, 'function')) {
				this['@'][name].apply(this['@'], ...v);
			}
			return this;
		}
	},
	fill: {
		value(color = 'transparent') {
			if (this.has('setAttribute')) {
				this['@'].setAttribute('fill', color);
			}
			return this;
		}
	},
	stroke: {
		value(color = 'transparent') {
			if (this.has('setAttribute')) {
				this['@'].setAttribute('stroke', color);
			}
			return this;
		}
	},
	fillStroke : {
		value(fill = 'transparent', stroke = 'transparent') {
			if (this.has('setAttribute')) {
				this['@'].setAttribute('fill', fill);
				this['@'].setAttribute('stroke', stroke);
			}
			return this;
		}
	},
	on : {
		value (ev, f, opt = true) {
			if (this.has('addEventListener')) {
				this['@'].addEventListener(ev, f, opt);
			}
			return this;
		}
	},
	off : {
		value (ev, f, opt= true) {
			if (this.has('removeEventListener')) {
				this.type(f, 'function')
					? this['@'].removeEventListener(ev, f, opt)
					: this['@'].removeEventListener(ev);
			}
			return this;
		}
	}
};

/**
 * Element wrapper
 * @param {*} el element
 * @param {*} custom prototype
 */
const vg = function(el, custom = '') {
	return Object.create(
		{ '@': el },
		custom instanceof Object
			? Object.assign({}, __BASE_PROTO__, custom)
			: __BASE_PROTO__);
};

const _tag = tag => document.createElement(tag);
const _svgTag = tag => document.createElementNS('http://www.w3.org/2000/svg', tag);
const joinPos = ([x, y]) => `${x},${y}`;
const points = (...p) => p.map(joinPos).join(' ');

const aniRotate = v => ({
	values(fromR=0, fromXY=[0, 0], toR=360, toXY=[0, 0]) {
		v.op.from = `${fromR} ${fromXY.join(',')}`;
		v.op.to = `${toR} ${toXY.join(',')}`;
		return v;
	}
});
const aniPosValues = v => ({values(...p) {return v.op.values = p.map(joinPos).join('; ') ,v}});
const aniValues = v => ({values(...p) {return v.op.values = p.join('; '), v}});

const svg = (width=400, height=300, viewBox = `0 0 ${width} ${height}`) => vg(_svgTag('svg')).attrs({version:1.2,xmlns :"http://www.w3.org/2000/svg", 'xmlns:xlink': 'http://www.w3.org/1999/xlink',width, height, viewBox});
const circle = (cx=0, cy=0, r=0) => vg(_svgTag('circle')).attrs({cx, cy, r});
const ellipse = (cx=0, cy=0, rx=0, ry=0) => vg(_svgTag('ellipse')).attrs({cx, cy, rx, ry});
const line = (x1=0,y1=0,x2=0,y2=0) => vg(_svgTag('line')).attrs({x1,y1,x2,y2});
const rect = (x=0, y=0, width=0, height=0) => vg(_svgTag('rect')).attrs({x, y, width, height});
const text = (x=0, y=0, txt = '') => vg(_svgTag('text')).attrs({x, y}).txt(txt);
const polygon = (...p) => vg(_svgTag('polygon')).attrs({points: points(...p)});
const polyline = (...p) => vg(_svgTag('polyline')).attrs({points: points(...p)});

const defs = () => vg(_svgTag('defs'));
const group = () => vg(_svgTag('g'));
const use = (id, attr={}) => vg(_svgTag('use')).attrs({'xlink:href': id, ...attr});
const marker = (markerWidth, markerHeight) => vg(_svgTag('marker')).attrs({markerWidth, markerHeight});

/**
 * ```js
 * path(0, 0).line(10, 10).down(20).right(20).close({id: 'sample'})
 * // <path id="sample" d="M0 0 L 10 10 V 20 H 20 Z">
 * ```
 * @param {*} x
 * @param {*} y
 */
const path = () => ({
	before: '',
	d : [],
	__ (s, abs = false)	{return n = abs ? s.toUpperCase() : s, this.before === n ? `, ` : (this.before = n , `${n} `);},
	_stack (v, abs, mk) {return this.d.push(`${this.__(mk, abs)}${v}`), this;},

	start (x, y, abs) {return this.d.length = 0, this.move(x, y, abs);},
	move(x, y, abs) {return this._stack(`${x} ${y}`, abs, 'm');},
	line(x, y, abs) {return this._stack(`${x} ${y}`, abs, 'l');},
	x(x, abs) {return this._stack(`${x}`, abs, 'h');},
	y(y, abs) {return this._stack(`${y}`, abs, 'v');},
	bezier3d(xy=[0,0], han1=[0,0], han2=[0,0], abs) {return this._stack(`${han1}, ${han2}, ${xy}`, abs, 'c');},
	bezier3dS(xy=[0,0], han2=[0,0], abs) {return this._stack(`${han2}, ${xy}`, abs, 's');},
	bezier2d(xy=[0,0], han=[0,0], abs) {return this._stack(`${han}, ${xy}`, abs, 'q');},
	bezier2dS (xy=[0,0], abs) {return 'qQTt'.includes(this.before) ? this.stack(`${xy}`, abs, 't') : this;},
	arc(xy=[0,0], rotate, lef, sf, posd=[0,0], abs) {return this.stack(`${xy} ${rotate} ${laf} ${sf} ${posd}`, abs, 'a');},
	close(attr={}, close=true) {return vg(_svgTag('path')).attrs({...attr, d: this.d.join(' ') + (close ? ' Z' : '')});},
	toPath(close=true) {return this.d.join(' ') + (close ? ' Z' : '');}
});

const TIME = (ms = 0) => ({
	t: ms,
	d (t = 0) {return this.t += t * 86400000, this;},
	h (t = 0) {return this.t += t * 3600000, this;},
	m (t = 0) {return this.t += t * 60000, this;},
	s (t = 0) {return this.t += t * 1000, this;},
	ms(t = 0) {return this.t += t, this;},
	_(unit = 'ms') {
		switch(unit) {
			case 'd' : return `${this.t / 86400000}d`;
			case 'h' : return `${this.t / 3600000}h`;
			case 'm' : return `${this.t / 60000}m`;
			case 's' : return `${this.t / 1000}s`;
			case 'ms':
			default: return `${this.t}ms`;
		}
	}
});

/**
 *
 * @param {*} ms
 * @param {*} repeat
 * @param {*} target property
 */
const animate = (id, ms = 1000, repeat='indefinite', target) => ({
	op : {id: id, dur: `${ms}ms`, repeatCount: repeat, attributeName: target, attributeType:"XML",},
	timeFunc: [],
	values (...val) {return delete this.op.keyTimes, this.op.values = val.join(';'), this;},
	timeLine (timetable = {'0' : 0, '1': 1}) {return Object.assign(this.op, {values: Object.values(timetable).join(';'), keyTimes : Object.keys(timetable).join(';')}), this;},
	// value, auto, auto-reverse
	rotate (r = '0') {return this.op.rotate = r, this;},
	ease() {return this.op.calcMode = 'ease', this;},
	discrete() {return this.op.calcMode = 'ease', this;},
	spline(...splines) {return Object.assign(this.op, {calcMode : 'spline', keySplines: splines.join(';')}), this;},
	paced () {return this.op.calcMode = 'paced', this;},
	timing (target, begin, val) {return this.timeFunc.push(['set', {attributeType:'XML',attributeName:target,begin: begin, to: val}]), this;},
	additive(v = 'sum') {
		switch(v) {
			case 'sum':
			case 'replace':
				this.op.additive = v;
			default:
		}
		return this;
	},
	accumulate() {
		return this;
	},
	close() {return vg(_svgTag('animate')).attrs(this.op).$(this.timeFunc.map((tag, opt) => vg(_svgTag(tag)).attrs(opt)))}
});

/**
 * ```js
 * rect(10, 20, 30, 40).append( animatePath(2000, 10).link('#spline_path').close() );
 * ```
 *
 * ```js
 * <rect x="10" y="20" width="30" height="40">
 *	 <animateMotion dur="2000ms" repeatCount="10">
 *     <mpath xlink:href="#spline_path" />
 *   </animateMotion>
 * </rect>
 * ```
 *
 * @param {*} ms
 * @param {*} repeat
 * @param {*} path
 */
const animatePath = (id, ms = 1000, repeat = 'indefinite', path) => ({
	lk: '',
	op: {id: id, dur: `${ms}ms`, repeatCount: repeat, path: path},
	timeLine (timetable = {'0': 0, '1' : 1}) {
		return Object.assign(this.op, {
			keyPoints: Object.values(timetable).join(';'),
			keyTimes: Object.keys(timetable).join(';'),
		}), this;
	},
	path(paths) {return this.lk = '', this.op.path = paths, this;},
	ease() {return this.op.calcMode = 'ease', this;},
	discrete() {return this.op.calcMode = 'ease', this;},
	/**
	 * ```js
	 * animatePath.spline( spline( [0, 0], [1, 1] ), spline( [0, 0], [1, 1] )).close();
	 * ```
	 * spline([0, 0], [1, 2]),
	 * @param  {...any} splines
	 */
	spline(...splines) {
		return Object.assign(this.op, {
			calcMode: 'spline',
			keySplines: splines.join(';'),
		}), this;
	},
	paced () {return this.op.calcMode = 'paced', this;},
	additive(v = 'sum') {
		switch(v) {
			case 'sum':
			case 'replace':
				this.op.additive = v;
			default:
		}
		return this;
	},
	accumulate() {
		return this;
	},
	link (id) {return delete this.op.path, this.lk = id, this;},
	close () {return vg(_svgTag('animateMotion')).attrs(this.op).$(this.lk === '' ? undefined : vg(_svgTag('mpath').attr({'xlink:href': this.lk})));}
});

const animateTransform = (id, ms = 1000, repeat = 'indefinite', target) => ({
	op : {id: id, dur: `${ms}ms`, repeatCount: repeat, attributeName: target, attributeType:"XML",},
	__values() {
		delete this.op.from;
		delete this.op.to;
		return this;
	},
	rotate () {
		delete this.op.values;
		return this.op.type='rotate', aniRotate(this);
	},
	translate () {
		return this.op.type='translate', aniPosValues(this);
	},
	skewX () {
		return this.op.type='skewX', aniValues(this);
	},
	skewY () {
		return this.op.type='skewY', aniValues(this);
	},
	scale () {
		return this.op.type='scale', aniValues(this);
	},
	from (f) {return this.op.from = f, this;},
	to (t) {return this.op.to = t, this;},
	begin (t) {return this.op.begin = t, this;},

	additive(v = 'sum') {
		switch(v) {
			case 'sum':
			case 'replace':
				this.op.additive = v;
				break;
			default:
				delete this.op.additive;
		}
		return this;
	},
	accumulate(v = 'sum') {
		switch (v) {
			case 'sum':
				this.op.accumulate = v;
				break;
			default:
				delete this.op.accumulate;
		}
		return this;
	},
	close() {return vg(_svgTag('animateTransform')).attrs(this.op);}
});

function* mat(a){
	yield* a;
}
const matrix4x4Cell = (a, b) => {
	let i = 4, v = 0;
	while(i--) v += a.next().value * b.next().value;
	return v;
};
const _4x4_ = (a, b) => (l, r) => matrix4x4Cell(mat(MATRIX.X[l].map(v => a[v])), mat(MATRIX.Y[r].map(v => b[v])));
const MATRIX = {
	X: [
		[0,1,2,3],
		[4,5,6,7],
		[8,9,10,11],
		[12,13,14,15]
	],
	Y: [
		[0,4,8,12],
		[1,5,9,13],
		[2,6,10,14],
		[3,7,11,15]
	],
	__mix (a, b) {
		let arr = [];
		f = _4x4_(a, b);
		let i = 0;
		while(i < 4) {
			let j = 0;
			while(j < 4) {
				arr.push(f(j++, i));
			}
			i++;
		}
		return arr;
	},
	is: (x, y) => v => v.length === x * y,
	mix(...matrix) {
		return 1 < matrix.length && matrix.every(this.is(4,4))
			? matrix.reduce(this.__mix)
			: [];
	},
};

const onload = () => document.readyState !== 'complete'
	? new Promise(r => document.addEventListener('readystatechange', () => {
		switch (document.readyState) {
			case 'complete': r();break;
			default:
		}
	}))
	: Promise.resolve();
