/*
 * svg.js
 * @version: 0.0.1
 * @author: mafumafuultu
 * @url: https://github.com/mafumafuultu/svg.js
 * @licece: MIT
 */

const lift = (v, f) => f(v);
const __renderSet = k => (o, v) => (o.render[k] = v, o);

const ___shapeRender = t => ({
	auto()               {return this._set('auto')(t);},
	crispEdges()         {return this._set('crispEdges')(t);},
	geometricPrecision() {return this._set('geometricPrecision')(t);},
	inherit()            {return this._set('inherit')(t);},
	_set: v => o  => __renderSet('shape-rendering')(o, v)
});
const ___colorRender = t => ({
	auto()            {return this._set('auto')(t);},
	optimizeSpeed()   {return this._set('optimizeSpeed')(t);},
	optimizeQuality() {return this._set('optimizeQuality')(t);},
	inherit()         {return this._set('inherit')(t);},
	_set: v => o  => __renderSet('color-renderring')(o, v),
});
const ___textRender = t => ({
	auto()                      {return this._set('auto')(t);},
	optimizeSpeed()             {return this._set('optimizeSpeed')(t);},
	optimizeLegibility()        {return this._set('optimizeLegibility')(t);},
	inhgeometricPrecisionerit() {return this._set('geometricPrecision')(t);},
	inherit()                   {return this._set('inherit')(t);},
	_set: v => o  => __renderSet('text-renderring')(o, v),
});
const ___imageRender = t => ({
	auto()             {return this._set('auto')(t);},
	optimizeSpeed()    {return this._set('optimizeSpeed')(t);},
	optimizeQuality()  {return this._set('optimizeQuality')(t);},
	inherit()          {return this._set('geometricPrecision')(t);},
	crispEdges()       {return this._set('crisp-edges')(t);},
	pixelated()        {return this._set('pixelated')(t);},
	mozCrispEdges()    {return this._set('-moz-crisp-edges')(t);},
	_set: v => o  => __renderSet('image-renderring')(o, v),
});
const renderGen = () => ({
	render: {'shape-rendering': 'auto', 'color-rendering':'auto', 'text-rendering':'auto', 'image-rendering' : 'auto'},
	Shape () {return lift(this, ___shapeRender);},
	Color() {return lift(this, ___colorRender);},
	Text() {return lift(this, ___textRender);},
	Image() {return lift(this, ___imageRender);},
	get _() {return this.render;}
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
	$: {
		value(...child) {
			if (this.has('innerHTML')) {
				return this['@'].innerHTML += this['@parse'](child).reduce((t, v) => t + v.outerHTML ,''), this;
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
	inner: {
		value(s) {
			if (this.has('innerHTML')) {
				this['@'].innerHTML = s;
			}
			return this;
		}
	},
	fillStroke : {
		value(fill, stroke) {
			if (this.has('setAttribute')) {
				fill == null
					? this['@'].removeAttribute('fill')
					: this['@'].setAttribute('fill', fill);
				stroke == null
					? this['@'].removeAttribute('stroke')
					: this['@'].setAttribute('stroke', stroke);
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
	peak: {value() {return console.log(this['@']), this;}},
	app: {
		value(name, ...v) {
			if (this.has(name) && this.type(name, 'function')) {
				this['@'][name].apply(this['@'], ...v);
			}
			return this;
		}
	}
};

const vg = function(el, custom = '') {
	return Object.create(
		{ '@': el },
		custom instanceof Object
			? Object.assign({}, __BASE_PROTO__, custom)
			: __BASE_PROTO__);
};

const _tag = tag => document.createElement(tag);
const _svgTag = tag => document.createElementNS("http://www.w3.org/2000/svg", tag);
const pos = (x, y) => ({x, y, toString() {return `${this.x} ${this.y}`;}});
const points = (...p) => p.map(([x,y]) => `${x},${y}`).join(' ');

const svg = (width=400, height=300, viewBox = `0 0 ${width} ${height}`) => vg(_svgTag('svg')).attrs({version:1.2,xmlns :"http://www.w3.org/2000/svg", 'xmlns:xlink': 'http://www.w3.org/1999/xlink',width, height, viewBox});
const circle = (cx=0, cy=0, r=0) => vg(_svgTag('circle')).attrs({cx, cy, r});
const ellipse = (cx=0, cy=0, rx=0, ry=0) => vg(_svgTag('ellipse')).attrs({cx, cy, rx, ry});
const line = (x1=0,y1=0,x2=0,y2=0) => vg(_svgTag('line')).attrs({x1,y1,x2,y2});
const rect = (x=0, y=0, width=0, height=0) => vg(_svgTag('rect')).attrs({x, y, width, height});
const text = (x=0, y=0, txt = '') => vg(_svgTag('text')).attrs({x, y, textContent: txt});
const polygon = (...p) => vg(_svgTag('polygon')).attrs({points: points(...p)});
const polyline = (...p) => vg(_svgTag('polyline')).attrs({points: points(...p)});

const defs = () => vg(_svgTag('defs'));
const group = () => vg(_svgTag('g'));
const use = (id, attr={}) => vg(_svgTag('use')).attrs({'xlink:href': id, ...attr});


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
	bezier3d(xy=pos(0,0), han1=pos(0,0), han2=pos(0,0), abs) {return this._stack(`${han1}, ${han2}, ${xy}`, abs, 'c');},
	bezier3dS(xy=pos(0,0), han2=pos(0,0), abs) {return this._stack(`${han2}, ${xy}`, abs, 's');},
	bezier2d(xy=pos(0,0), han=pos(0,0), abs) {return this._stack(`${han}, ${xy}`, abs, 'q');},
	bezier2dS (xy=pos(0,0), abs) {return 'qQTt'.includes(this.before) ? this.stack(`${xy}`, abs, 't') : this;},
	arc(xy=pos(0,0), rotate, lef, sf, posd=pos(0,0), abs) {return this.stack(`${xy} ${rotate} ${laf} ${sf} ${posd}`, abs, 'a');},
	close(attr={}, close=true) {return vg(_svgTag('path')).attrs({...attr, d: this.d.join(' ') + (close ? ' Z' : '')});},
	toPath(close=true) {return this.d.join(' ') + (close ? ' Z' : '');}
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
	 * animatePath.spline( spline( pos(0, 0), pos(1, 1) ), spline( pos(0, 0), pos(1, 1) )).close();
	 * ```
	 * spline(pos(0, 0), pos(1,2)),
	 * @param  {...any} splines
	 */
	spline(...splines) {
		return Object.assign(this.op, {
			calcMode: 'spline',
			keySplines: splines.join(';'),
		}), this;
	},
	paced () {return this.op.calcMode = 'paced', this;},
	link (id) {return delete this.op.path, this.lk = id, this;},
	close () {return vg(_svgTag('animateMotion')).attrs(this.op).$(this.lk === '' ? undefined : vg(_svgTag('mpath').attr({'xlink:href': this.lk})));}
});

// const animateTransform = (id, ms = 1000, repeat = 'indefinite', target) => ({
// 	op : {id: id, dur: `${ms}ms`, repeatCount: repeat, attributeName: target, attributeType:"XML",},
// 	rotate (r = '0') {return this.op.type='rotate', this;},
// 	translate (r = '0') {return this.op.type='translate', this;},
// 	skewX (r = '0') {return this.op.type='skewX', this;},
// 	skewY (r = '0') {return this.op.type='skewY', this;},
// 	scale (r = '0') {return this.op.type='scale', this;},
// 	from (f) {return this.op.from = f, this;},
// 	to (t) {return this.op.to = t, this;},
// 	close() {return vg(_svgTag('animateTransform')).attrs(this.op);}
// });
