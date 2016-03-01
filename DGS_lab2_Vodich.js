//DGS_lab2_vodich
/*variant 4.
 Start number = 0.04; 
 value of r [0.55, 1.4, 2.6, 3.15, 3.9];
 interval for Fegenbauma Tree [65;90] */
(function () {
 	var START_NUMBER_POPULATION = 0.04,
		coefficientsOfReproduction = [0.55, 1.4, 2.6, 3.15, 3.9],
		r = coefficientsOfReproduction[4],
		NUMBER_OF_GENERATION = 50,
		intervalForFegenbaumaTree = {
			first: 65,
			last: 90
		};


 	function func_x (x_i, r) {
 		return r * x_i * (1 - x_i);
 	};

 	function getMassiveOfPopulationChanges(START_NUMBER_POPULATION, r, NUMBER_OF_GENERATION) {
 		var x = new Array(NUMBER_OF_GENERATION),
 			i;
 		x[0] = START_NUMBER_POPULATION;
 		for(i = 1; i < NUMBER_OF_GENERATION; i += 1) {
 			x[i] = func_x(x[i-1], r);
 		};
 		return x;
 	};

 	function drawGraphicForMassive (x) {
 		var example = document.getElementById("example1"),
			    ctx = example.getContext('2d');
        example.width  = 1300;
        example.height = 500;
        ctx.fillStyle = "#CECEFF";
        ctx.fillRect(0, 0, 1300, 500)
        ctx.fillStyle = "#121211";
        ctx.fillRect( 100, 400, 1000, 2);
        ctx.fillRect( 100, 400, 2, -300);
 		for (var i = 0; i < x.length; i += 1) {
 			console.log("  ", i, x[i]);
 			ctx.fillRect(100 + i*20-3, 400 - x[i]*300-3, 6, 6);
 			ctx.lineTo(100 + i*20, 400 - x[i]*300);
 		};
 		ctx.stroke(); // *
 	};

 	function getStationaryValue() {
 		if ((1 < r) && (r <= 2)) {
 			return (r - 1) / r + " численность популяции быстро выйдет за стационарное значение ";
 		} else {
			 if ((2 < r) && (r <= 3)) {
			 	return (r - 1) / r + " численность популяции придёт к стационарному значению, но вначале будет колебаться ";
			 } else {
			 	if ((3 < r) && (r <= 1 + Math.sqrt(6))) {
			 		return (r - 1) / r + " численность популяции будет бесконечно колебаться между 2 значениями";
			 	} else {
			 		if ((3.45 < r) && (r <= 3.54)) {
			 			return (r - 1) / r + " численность популяции будет бесконечно колебаться между 4 значениями";
			 		} else {
			 			return (r - 1) / r + " длина интервала для колебания уменьшается с увилечением коэффициента размножения. Больше 3.57 наблюдается хаотичность.";
			 		};
			 	};
			 };
		};
 	};

 	function drawPointMassive(x, r, ctx) {
 		
 		for (var i = intervalForFegenbaumaTree.first - 1; i < intervalForFegenbaumaTree.last; i += 1) {
 			console.log("  ", x[i], r);
 			ctx.fillRect(100 + ((r-2)/2)*850-1, 400 - x[i]*300-1, 2, 2);
 		};
 	};

 	function createFegenbaumaTree() {
 		var x = [],
 			i;
 			var example = document.getElementById("example2"),
			    ctx = example.getContext('2d');
        example.width  = 1300;
        example.height = 500;
        ctx.fillStyle = "#CECEFF";
        ctx.fillRect(0, 0, 1300, 500)
        ctx.fillStyle = "#121211";
        ctx.fillRect( 100, 400, 1000, 2);
        ctx.fillRect( 100, 400, 2, -300);
 		for (i = 2; i <= 4; i += 0.01) {
 			x = getMassiveOfPopulationChanges(START_NUMBER_POPULATION, i, intervalForFegenbaumaTree.last);
 			drawPointMassive(x, i, ctx);
 		};
 	};

 	console.log(getMassiveOfPopulationChanges(START_NUMBER_POPULATION, r, NUMBER_OF_GENERATION));
 	drawGraphicForMassive(getMassiveOfPopulationChanges(START_NUMBER_POPULATION, r, NUMBER_OF_GENERATION));
 	console.log(getStationaryValue());
 	createFegenbaumaTree();

})();