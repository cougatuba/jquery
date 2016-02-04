  $(document).ready(function() {
  
var score = 0;
var round = 0;
var roundScore = 5;

  function getRandomRange(min, max){
  var range = max-min;
  var rando = (Math.random() * (max - min + 1));
    return Math.floor((Math.random()* (max - min + 1)) + parseInt(min));
  }
  
  function randMov(rand){
	var movUrl = "http://api.themoviedb.org/3/discover/movie?api_key=b9e26d321028ee0904b8e8602d575485&year="+rand;
	$.getJSON(movUrl,function(data) {
		var maxTitles = data.results.length-1;
		var randomMovie = getRandomRange(0, maxTitles);
		console.log("Test" + randomMovie);
		document.getElementById("movID").innerHTML=data.results[randomMovie].id;
	})
	return;
  }
  
    function getBackdrop(){
		var movUrl = "http://api.themoviedb.org/3/movie/" +$("#movID").text() +"?api_key=b9e26d321028ee0904b8e8602d575485";
		$.getJSON(movUrl,function(data) {
		document.getElementById("backdrop").src="http://image.tmdb.org/t/p/w500" + data.backdrop_path;
		})
	}
	
	function getCast(){
		var movUrl = "http://api.themoviedb.org/3/movie/" +$("#movID").text() +"/credits?api_key=b9e26d321028ee0904b8e8602d575485";
		var castALL;
		var charALL;
		castALL = "<ul>";
		charALL = "<ul>";
		
		$.getJSON(movUrl,function(data) {
		var casts = [];
		var chars = [];
		
			for (i=0; i<3; i++){
			console.log(data);
				casts[i] = " " + data.cast[i].name;
				console.log(data.cast[i].name);
				chars[i] = " " + data.cast[i].character;
			}
			document.getElementById("movCAST").innerHTML=casts;
			document.getElementById("movCHAR").innerHTML=chars;
		})
	}
	
	function getSyn(){
		var movUrl = "http://api.themoviedb.org/3/movie/" +$("#movID").text() +"?api_key=b9e26d321028ee0904b8e8602d575485";
		$.getJSON(movUrl,function(data) {
		console.log(data.overview);
		document.getElementById("movSYN").innerHTML=data.overview;
		document.getElementById("movTIT").innerHTML=data.title;
		})
	}

  $("#yearSub").click(function(){
	var yearLo = document.getElementById('yearLo').value;
	var yearHi = document.getElementById('yearHi').value;
	var year = getRandomRange(yearLo, yearHi);
	
   $("#instructions").css('display','none');
   $("#movCAST").css('visibility','hidden'); 
   $("#movCHAR").css('visibility','hidden');  
   $("#movSYN").css('visibility','hidden');
	console.log("YEAR: " + year);
	var id = randMov(year);
	getBackdrop();
	getCast();
	getSyn();
	$("#score").css('visibility','visible');
	$("#years").css('visibility','hidden');
	$("#endGame").css('display','none');
	round = 0;
	score = 0;
  });
  
  $("#guessButt").click(function(){
	if(round==5){
			$("#endGame").css('display','inline');
			$("#years").css('visibility','visible');
	} else if ($("#movieTitle").val() == $("#movTIT").text()){
		var yearLo = document.getElementById('yearLo').value;
		var yearHi = document.getElementById('yearHi').value;
		var year = getRandomRange(yearLo, yearHi);
   $("#movCAST").css('visibility','hidden'); 
   $("#movCHAR").css('visibility','hidden');  
   $("#movSYN").css('visibility','hidden');
		console.log("YEAR: " + year);
		var id = randMov(year);
		getBackdrop();
		getCast();
		getSyn();
		round +=1;
		score += roundScore;
	$("#round").html("Round: " + round + "/5");
	$("#points").html("Points: " + score);
	roundScore=5;
	}
  }); 
  
 $("#hints3").click(function(){
   console.log("touch3");
   $("#movCAST").css('visibility','visible');
   roundScore--;
	})
  
  $("#hints2").click(function(){
   console.log("touch3");
   $("#movCHAR").css('visibility','visible');
   roundScore--;
	})
	
  $("#hints1").click(function(){
   console.log("touch3");
   $("#movSYN").css('visibility','visible');
   roundScore--;
	})
  
  $("#skip").click(function(){
   if(round==5){
			$("#endGame").css('display','inline');
			$("#years").css('visibility','visible');
	$("#skipAnswer").html("The answer was : " + $("#movTIT").text());
	} else {
	var yearLo = document.getElementById('yearLo').value;
		var yearHi = document.getElementById('yearHi').value;
		var year = getRandomRange(yearLo, yearHi);
   $("#movCAST").css('visibility','hidden'); 
   $("#movCHAR").css('visibility','hidden');  
   $("#movSYN").css('visibility','hidden');
		console.log("YEAR: " + year);
		var id = randMov(year);
		getBackdrop();
		getCast();
		getSyn();
		round +=1;
		console.log(round);
	$("#round").html("Round: " + round + "/5");
	$("#skipAnswer").html("The answer was : " + $("#movTIT").text());
	}
	})
  
  
  });
