# SVG.js

[view sample](https://codepen.io/mafumafuultu/project/editor/AVbNQR)

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>svgjs</title>
<script src="svg.js"></script>
<script>
onload().then(() => {
	vg(document.body).$(
		svg(400, 400).zoom([0,0], 1).attrs({background: "orange",}).$(
			circle(0, 0, 200).fillStroke('white', '#ff0000'),
			group().$(
				line(0,0, 0,-200).stroke('black').$(
					animateTransform('time_sec', 60000, 'indefinite', 'transform').rotate().values(0, [0, 0], 360, [0, 0]).close()
				),
			),
			group().$(
				line(0,0, 0,-200).stroke('orange').attrs({'stroke-width': 5}).$(
					animateTransform('time_min', 3600000, 'indefinite', 'transform').rotate().values(0, [0, 0], 360, [0, 0]).close()
				),
			),
			group().$(
				line(0,0, 0,-150).stroke('blue').attrs({'stroke-width': 6}).$(
					animateTransform('time_hour', 43200000, 'indefinite', 'transform').rotate().values(0, [0, 0], 360, [0, 0]).close()
				),
			),
		),
		vg(_tag('div')).$(
			vg(_tag('p')).txt('foo')
		)
	);
});
</script>
</head>
<body>
</body>
</html>
```

## Basic
### none
`none === undefined`

### onload()
This Promise is resolved by setting the `document.readyState` to "complete"


### _tag('tagname')
`_tag('div')` is like `document.createElement('div')`.

### _svgTag('svgtagname')
`_svgTag('rect')` is like `document.createElementNS('http://www.w3.org/2000/svg', 'rect')`.

### vg(element, propertyObject)
The `vg` function wraps an HTMLElement or SVGElement and pseudo-extends the prototype. It is also possible to extend it by specifying a property object as the second argument.

```js
_tag('div') == document.createElement('div')
```

#### vg.id('id')
#### vg.cls('classname', force? )
#### vg.addCls(['classNameA', 'classNameB'])
#### vg.rmCls(['classNameA', 'classNameB'])
#### vg.data({datakey : 'value'})
#### vg.attrs({property : value})
#### vg.zoom([x, y] )
#### vg.$(...child)
#### vg.$$(...nodes)
#### vg.txt('txt')
#### vg.f(vg = el => {})
#### vg.peak()
#### vg.app('name', ...value)
#### vg.fill('color')
#### vg.stroke('color')
#### vg.fillStroke('fill', 'stroke')




### svg(width, height, viewBox)

This SVG is an SVG element with a width of 200px and a height of 200px, with the center positioned at (100px, 100px) and displayed twice the size.

```html
<svg version="1.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200" viewBox="50 50 100 100">
</svg>
```

If you write in svg.js, it looks like this

```js
svg(200, 200).zoom([100, 100], 2)
```


### circle(cx, cy, r) => vg

### ellipse(cx, cy, rx, ry) => vg

### line(x1, y1, x2, y2) => vg

### rect(x, y, width, height) => vg

### text(x, y, text) => vg

### polyline([x1,y1], [x2,y2] [,[x, y]...])
### polygon([x1,y1], [x2,y2] [,[x, y]...])
### defs()
### group()
### use(id, attr)
### marker

### path

```js
var pathObj = path().start(0, 0).move(10, 10).x(20).y(10)

pathObj.toPath();
// "m 0 0 , 10 10 h 20 v 10 Z"

pathObj.close();
// <path d="m 0 0 , 10 10 h 20 v 10 Z">
```


## animate

### animate(id, ms, repeat, target)

### animatePath(id, ms, repeat, path)

### animateTransform(id, ms, repeat, target)


## Matrix

### MATRIX.mix([4x4 matrix], [4x4 matrix])

## Time

```js
TIME(1000).ms(1000)._();  // '2000ms'
TIME(1000).ms(-1000)._(); // '0ms'
```

```js
TIME(1000).s(1).s(1).s(1).s(1)._('s'); // '4s'
```
### TIME(ms)

### TIME().d(day)
### TIME().h(hour)
### TIME().m(minute)
### TIME().s(second)
### TIME().m(milli second)
### TIME()._('format')
format : 'd', 'h', 'm', 's', 'ms'
