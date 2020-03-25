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
				line(0, 0, 0, -100).fillStroke(null, '#000')
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