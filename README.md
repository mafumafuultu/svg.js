# SVG.js


```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>svgjs</title>
	<script src="svg.js"></script>
	<script>
	const load = () => {
		vg(document.body).$(
			svg(200, 200).zoom([0, 0], 2).attrs({background:'orange'}).$(
				defs().$(
					rect(0, 0, 20, 20).fillStroke('orange','blue').attrs({id: 'foo'})
				),
				use('#foo').attrs({x:  0, y:  0}),
				use('#foo').attrs({x: -20, y: -40}),
				line(0, 0, 0, -100).fillStroke(none, '#000')
			)
		);
	};

	document.addEventListener("DOMContentLoaded", load);
	</script>
</head>
<body>
	
</body>
</html>
```


## sample

### svg(width, height, viewBox)
### circle(cx, cy, r)
### ellipse(cx, cy, rx, ry)
### line(x1, y1, x2, y2)
### rect(x, y, width, height)
### text(x, y, text)
### polyline([x1,y1], [x2,y2] [,[x, y]...])
### polygon([x1,y1], [x2,y2] [,[x, y]...])
### defs()
### group()
### use(id, attr)
### marker

### path

```js
path().start(0, 0).move(10, 10).x(20).y(10).toPath();
// "m 0 0 , 10 10 h 20 v 10 Z"
```

### animate(id, ms, repeat, target)
### animatePath(id, ms, repeat, path)
### animateTransform(id, ms, repeat, target)