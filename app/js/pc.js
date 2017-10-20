(function() {
	var pancakesSlideLeft = document.getElementsByClassName('pancakes__slider-before')[0];
	var pancakesSlideRight = document.getElementsByClassName('pancakes__slider-after')[0];
	var pancakesWidget = document.getElementsByClassName('pancakes__widget')[0];
	var breakfastSwitch = document.getElementsByClassName('breakfast__switch');
	var book = document.getElementsByClassName('js__book');
	if (window.matchMedia) {
	var media = window.matchMedia('only screen and (min-width: 481px)');
	setPagesScript(media);
	media.addListener(setPagesScript);
	
	function setPagesScript(m) {

		if (media.matches) {
			//pancakes
			var objJson;
			var xmlHttp = getXmlHttp();
		 	function getXmlHttp() {
        var xmlhttp;
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                xmlhttp = false;
            };
        };
        if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
            xmlhttp = new XMLHttpRequest();
        };
        return xmlhttp;
      };
			xmlHttp.open('GET', 'json/object.json', true);
			xmlHttp.send(null);
			xmlHttp.onreadystatechange = function () {
				var state = 1;
        if (xmlHttp.readyState != 4) return;
        if (xmlHttp.status != 200) {
            console.log(xmlHttp.status + ': ' + xmlHttp.statusText);
        } else {
        		objJson = JSON.parse(xmlHttp.responseText).pancakes;
						pancakesSlideLeft.addEventListener('click', switchLeft);
						pancakesSlideRight.addEventListener('click', switchRight);
						function switchLeft(e) {
							var obj = objJson[state];
							e.preventDefault();
							hideContent();
							changeSlide();
							setTimeout(function () {
								pancakesName.innerHTML = obj.name;
	              pancakesSubtitle.innerHTML = obj.subtitle;
	              pancakesText.innerHTML = obj.text;
	              pancakesDigits.innerHTML = obj.minutes;
	              pancakesWidget.style.backgroundImage = 'url(../img/widget/'+obj.img+'.jpg)';
	              for (var i = 0; i < obj.rating; i++) {
                	pancakesStar[i].classList.remove('pancakes__star_none');
              	};
              	for (var j = obj.rating; j < pancakesStar.length; j++) {
                	pancakesStar[j].classList.add('pancakes__star_none');
              	};
              	changeSlide();
	              showContent();
	            }, 500);

              if (state == 0) {
              	setTimeout(function () {
              		state = objJson.length - 1;
              	}, 600);
              } else {
								setTimeout(function () {
              		state--;
              	}, 600);
							};
						};
						function switchRight(e) {
							var obj = objJson[state];
							e.preventDefault();
							hideContent();
							setTimeout(function () {
								pancakesName.innerHTML = obj.name;
	              pancakesSubtitle.innerHTML = obj.subtitle;
	              pancakesText.innerHTML = obj.text;
	              pancakesDigits.innerHTML = obj.minutes;
	              pancakesWidget.style.backgroundImage = 'url(../img/widget/'+obj.img+'.jpg)';
	              for (var i = 0; i < obj.rating; i++) {
                	pancakesStar[i].classList.remove('pancakes__star_none');
              	};
              	for (var j = obj.rating; j < pancakesStar.length; j++) {
                	pancakesStar[j].classList.add('pancakes__star_none');
              	};
              	changeSlide();
	              showContent();
	             }, 500);
            
              if (state == (objJson.length - 1)) {
              	setTimeout(function () {
              		state = 0;
              	}, 600);
              } else {
              	setTimeout(function () {
              		state++;
              	}, 600);
							};
						};
						function hideContent() {
							pancakesName.classList.add('pancakes-hide-content');
              pancakesSubtitle.classList.add('pancakes-hide-content');
              pancakesText.classList.add('pancakes-hide-content');
              pancakesDigits.classList.add('pancakes-hide-content');
              for (var i = 0; i < pancakesIcon.length; i++) {
	              pancakesIcon[i].classList.add('pancakes-hide-content');
              };
						};
						function showContent() {
							pancakesName.classList.remove('pancakes-hide-content');
              pancakesSubtitle.classList.remove('pancakes-hide-content');
              pancakesText.classList.remove('pancakes-hide-content');
              pancakesDigits.classList.remove('pancakes-hide-content');
              for (var i = 0; i < pancakesIcon.length; i++) {
	              pancakesIcon[i].classList.remove('pancakes-hide-content');
              };
						};
						function changeSlide() {
							var stateTwo = state + 1;
							var stateThree = state + 2;
		      		pancakesIcon[0].src = 'img/widget/'+objJson[state].img+'.jpg';
		      		if (stateTwo == objJson.length) {
		      			stateTwo = 0;
		      			stateThree = 1;
		      		} else if (stateTwo == (objJson.length - 1)) {
		      			stateThree = 0;
		      		};
		      		pancakesIcon[1].src = 'img/widget/'+objJson[stateTwo].img+'.jpg';
		      		pancakesIcon[2].src = 'img/widget/'+objJson[stateThree].img+'.jpg';
		        };
		        media.addListener(function () {
		        	if (!media.matches){
		        		pancakesSlideLeft.removeEventListener('click', switchLeft);
								pancakesSlideRight.removeEventListener('click', switchRight);
		        	}
		        });
		    };
			};
      //breakfast book
      for (var i = 0; i < breakfastSwitch.length; i++) {
      	breakfastSwitch[i].addEventListener('click', changeBook);
      };
      function changeBook(e) {
      	e.preventDefault();
      	e.stopPropagation();
      	var data = this.getAttribute('data');
      	for (var i = 0; i < book.length; i++) {
      		book[i].className = 'js__book';
      	};
      	var switchData = +data;
      	switch (switchData) {
      		case 0: 
      			book[0].classList.add('book__one');
      			book[1].classList.add('book__two');
      			book[2].classList.add('book__three');
      			break;
      		case 1:
      			book[1].classList.add('book__one');
      			book[2].classList.add('book__two');
      			book[0].classList.add('book__three');
      			break;
      		case 2:
      			book[2].classList.add('book__one');
      			book[0].classList.add('book__two');
      			book[1].classList.add('book__three');
      			break;
      	};
      };
      media.addListener(function () {
        if (!media.matches){
          for (var i = 0; i < breakfastSwitch.length; i++) {
            breakfastSwitch[i].removeEventListener('click', changeBook);
          };
        }
      });

		};

	};


} else {
	alert('У вас устаревший браузер');
}
})();
