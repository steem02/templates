if (window.matchMedia) {
    var mediaPhone = window.matchMedia('only screen and (max-width: 480px)');
    var img = document.getElementsByClassName('js__tastes-photo');
    var container = document.getElementsByClassName('js__slide-contain')[0];
    var sandwichIcon = document.getElementsByClassName('sandwich__icon');
    var sandwichIconTitle = document.getElementsByClassName('sandwich__icontitle');
    var sandwichIconText = document.getElementsByClassName('sandwich__icontext');
    var sandwichTimeout;
    var naviButton = document.getElementsByClassName('navi__button')[0];
    var headerNavi = document.getElementsByClassName('header__navi')[0];
    // pancakes
    var pancakesName = document.getElementsByClassName('pancakes__name')[0];
    var pancakesSubtitle = document.getElementsByClassName('pancakes__subtitle')[0];
    var pancakesText = document.getElementsByClassName('pancakes__text')[0];
    var pancakesRating = document.getElementsByClassName('pancakes__rating')[0];
    var pancakesStar = document.getElementsByClassName('pancakes__star');
    var pancakesMinutes = document.getElementsByClassName('pancakes__minutes')[0];
    var pancakesDigits = document.getElementsByClassName('pancakes__digits')[0];
    var pancakesIcon = document.getElementsByClassName('pancakes__icon');
    var pancakesDescription = document.querySelector('.pancakes__description');
    activePhone480(mediaPhone);
    mediaPhone.addListener(activePhone480);
    
    function activePhone480(media) {
    
        if (mediaPhone.matches) {
            container.firstElementChild.classList.add('js__slide');
            function SliderPhone(img, container, media) {
                this.picture = img;
                this.container = container;
                this._LENGTH = this.picture.length;
                this._COUNT = 2;
                this.media = media || false;
            };
            SliderPhone.prototype.getIndexPictures = function (num) {
                    
                    if (num < 0) {
                        num = img.length + num;
                    };
                    if (num >= img.length) {
                        num = num - img.length;
                    };
                    
                    var under = num + 2;
                    var right = under - 1;
                    var left = num - 1;
                    
                    if (under >= img.length) {
                        under = under - img.length;
                        
                        if (under == 0) {
                            right = img.length - 1;
                        } else {
                            right = 0;    
                        };
                        
                    };
                    
                    if (num == 0) {
                        left = img.length - 1;
                    };
                    return {left:left,right:right,under:under,count:num};
            };
            SliderPhone.prototype.swipeLeft = function (num) {
                var obj = this.getIndexPictures(num);
                img[obj.under].style.display = 'none';
                img[obj.left].style.display = 'none';
                img[obj.left].classList.remove('js__img_left');
                img[obj.right].classList.remove('js__img_right');
                img[obj.count].classList.add('js__img_left');
                img[obj.under].classList.add('js__img_right');
                img[obj.under].style.display = 'inline-block';
                obj.count++;
                this._COUNT = this.getIndexPictures(obj.count).count;
                return obj.count;
            };
            SliderPhone.prototype.swipeRight = function (num) {
                var obj = this.getIndexPictures(num);
                img[obj.under].style.display = 'none';
                img[obj.right].style.display = 'none';
                img[obj.left].classList.remove('js__img_left');
                img[obj.right].classList.remove('js__img_right');
                img[obj.count].classList.add('js__img_right');
                img[obj.under].classList.add('js__img_left');
                img[obj.under].style.display = 'inline-block';
                obj.count--;
                this._COUNT = this.getIndexPictures(obj.count).count;
                return obj.count;
            };
            SliderPhone.prototype.begin = function () {
                    
                if (this._LENGTH >= 3) {
                    this.picture[0].classList.add('js__img_left');
                    this.picture[2].classList.add('js__img_right');
                    if (this._LENGTH == 4) this.picture[3].style.display = 'none';
                } else {
                    return;
                };
                
            };
            SliderPhone.prototype.touchMove = function () {
                var count = this._COUNT;
                var img = this.picture;
                var container = this.container;
                var media = this.media;
                var initialPoint;
                var finalPoint;
                var swipeLeft = this.swipeLeft.bind(this);
                var swipeRight = this.swipeRight.bind(this);
                function start(event) {
                    event.stopPropagation();
                    initialPoint = event.changedTouches[0];
                };
                function end(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    finalPoint = event.changedTouches[0];
                    var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
                  
                    if (xAbs > 5) {
                        
                        if (finalPoint.pageX < initialPoint.pageX){
                            var a = swipeLeft(count);
                            count = a;
                            
                        } else {
                            var b = swipeRight(count);
                            count = b;
                        };
                         
                    };
                
                };
                this.container.addEventListener('touchstart', start, false);
                this.container.addEventListener('touchend', end, false);
                if (!document.ontouchstart || !document.ontouchend) {
                    function tap() {
                       var a = swipeLeft(count);
                       count = a;
                    };
                    this.container.addEventListener('click', tap);
                };
                if (media) {
                    media.addListener(function () {
                        container.removeEventListener('touchstart', start);
                        container.removeEventListener('touchend', end);
                        container.removeEventListener('click', tap);
                    })
                };
            };
            SliderPhone.prototype.scrollVisible = function () {
                var container = this.container;
                var swipeLeft = this.swipeLeft.bind(this);
                var media = this.media;
                var img = this.picture;
                function eventScroll(e) {
                    var winHeight = document.body.clientHeight;
                    var sliderCoord = container.getBoundingClientRect();
                    
                    // Вычисление задержки для свайпа после загрузки
                    function getTimeTransition () {
                        var reg = /\d\.?\d?/;
                        var delay = +getComputedStyle(container).transitionDelay.match(reg)[0]; 
                        var duration = +getComputedStyle(container).transitionDuration.match(reg)[0];
                        return ((delay + duration)*1000 + 100) || 500;
                    };
                    
                    if (sliderCoord.top < winHeight) {
                        container.style.opacity = '1';
                        setTimeout(function () {
                            swipeLeft(1);
                        }, getTimeTransition());
                        window.removeEventListener('scroll', eventScroll);
                    };
                };
                window.addEventListener('scroll', eventScroll);
                if (media) {
                    media.addListener(function () {
                        window.removeEventListener('scroll', eventScroll);
                    })
                };
            };
            var sld = new SliderPhone(img, container, mediaPhone);
            sld.begin();
            sld.scrollVisible();
            sld.touchMove();
            
            // pancakes        
            function setClassIcon(image) {
                for (var i = 1; i < pancakesIcon.length; i++) {
                    pancakesIcon[i].classList.add('js__pancakes__icon_none');
                };
            };
            setClassIcon(pancakesIcon);
            
            function getXmlHttp() {
                var xmlhttp;
                try {
                    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
                } catch (e) {
                    try {
                        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                    } catch (E) {
                        xmlhttp = false;
                    }
                }
                if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
                    xmlhttp = new XMLHttpRequest();
                }
                return xmlhttp;
            }
            var xmlhttp, objJson;
            xmlhttp = getXmlHttp();
            xmlhttp.open('GET', '/app/json/object.json', true);
            xmlhttp.send();
            xmlhttp.onreadystatechange = function() {
                var state = 1;
                if (xmlhttp.readyState != 4) return;
                if (xmlhttp.status != 200) {
                    alert(xmlhttp.status + ': ' + xmlhttp.statusText);
                } else {
                    objJson = JSON.parse(xmlhttp.responseText).pancakes;
                    function flightContent() {
                        pancakesName.classList.add('js__pancakes_right');
                        pancakesText.classList.add('js__pancakes_right');
                        pancakesRating.classList.add('js__pancakes_right');
                        pancakesSubtitle.classList.add('js__pancakes_left');
                        pancakesMinutes.classList.add('js__pancakes_left');
                        pancakesIcon[0].classList.add('js__pancakes_left');
                        setTimeout(function () {
                            changesContent();
                            pancakesName.classList.remove('js__pancakes_right');
                            pancakesText.classList.remove('js__pancakes_right');
                            pancakesRating.classList.remove('js__pancakes_right');
                            pancakesSubtitle.classList.remove('js__pancakes_left');
                            pancakesMinutes.classList.remove('js__pancakes_left');
                            pancakesIcon[0].classList.remove('js__pancakes_left');
                        }, 1000);
                    };
                    function changesContent () {
                        var obj = objJson[state];
                        pancakesName.innerHTML = obj.name;
                        pancakesSubtitle.innerHTML = obj.subtitle;
                        pancakesText.innerHTML = obj.text;
                        pancakesDigits.innerHTML = obj.minutes;
                        pancakesIcon[0].src = 'img/widget/'+obj.img+'.jpg';
                        for (var i = 0; i < obj.rating; i++) {
                            pancakesStar[i].classList.remove('pancakes__star_none');
                        };
                        for (var j = obj.rating; j < pancakesStar.length; j++) {
                            pancakesStar[j].classList.add('pancakes__star_none');
                        };
                        state++
                        if (state == objJson.length) state = 0;
                    };
                    var nextButton = document.createElement('div');
                    var simbol = String.fromCharCode('187');
                    nextButton.textContent = String.fromCharCode('187')+String.fromCharCode('187');
                    nextButton.id = 'next_button';
                    pancakesDescription.appendChild(nextButton);
                    nextButton.addEventListener('touchstart', change);
                    function change(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        nextButton.className = 'next_button';
                        flightContent();
                        setTimeout(function () {
                            nextButton.className = '';
                        }, 300)
                    };
                    if (media) { 
                        media.addListener(function () {
                            if (!media.matches) {
                                nextButton.removeEventListener('touchstart', change);
                                nextButton.remove();
                            };
                        });
                    };
                };
            };
            
            // sandwich
            
            function startSandwichAnimate() {
                var count = 0;
                for (var i = 1; i < sandwichIcon.length; i++) {
                    sandwichIcon[i].classList.add('js__sandwich_none');
                    sandwichIconTitle[i].classList.add('js__sandwich__title_left');
                    sandwichIconText[i].classList.add('js__sandwich__text_right');
                };
                for (var k = 0; k < sandwichIcon.length; k++) {
                    sandwichIcon[k].classList.add('sandwich__transition');
                    sandwichIconTitle[k].classList.add('sandwich__transition');
                    sandwichIconText[k].classList.add('sandwich__transition');
                };
                var thisFunc = setClassSandwich.bind(this);
                
                function setClassSandwich() {
                    sandwichIcon[count].classList.add('js__sandwich_none');
                    sandwichIconTitle[count].classList.add('js__sandwich__title_left');
                    sandwichIconText[count].classList.add('js__sandwich__text_right');
                    count++;
                    if (count == sandwichIcon.length) count = 0;
                    sandwichIcon[count].classList.remove('js__sandwich_none');
                    sandwichIconTitle[count].classList.remove('js__sandwich__title_left');
                    sandwichIconText[count].classList.remove('js__sandwich__text_right');
                    sandwichTimeout = setTimeout(thisFunc, 4000);
                };
                
                setTimeout(thisFunc, 4000);
            };
            startSandwichAnimate();
            
            // menu
            
            function Menu(outer, inner, media) {
                this.button = outer;
                this.list = inner;
                this.state = false;
                this.media = media || false;
                this.click = function () {
                    var state = this.state;
                    var list = this.list;
                    var button = this.button;
                    var media = this.media;
                    var backgroundElem = createBackground();
                    document.body.appendChild(backgroundElem);
                    setScrollNone();
                    function createBackground () {
                        var elem = document.createElement('div');
                        elem.className = 'navi__background';
                        return elem;
                    }
                    function setScrollNone() {
                        function stop(e) {
                            e.preventDefault();
                        };
                        list.addEventListener('touchmove', stop);
                        if (media) { 
                            media.addListener(function () {
                                list.removeEventListener('touchmove', stop);    
                            });
                        };
                    };
                    function getTimeTransition () {
                            var reg = /\d\.?\d?/;
                            var duration = +getComputedStyle(list).transitionDuration.match(reg)[0];
                            return duration*1000;
                        };
                    function downButtonAnimate(e) {
                        e.stopPropagation();
                        if(e.target == this) {
                            button.style.boxShadow = 'none';
                            button.style.transform = 'scale(.8)';
                        };
                        
                    };
                    function upButtonAnimate(e) {
                        e.stopPropagation();
                        if(e.target == this) {
                            button.style.boxShadow = '';
                            button.style.transform = '';
                        };
                    };
                    function hideMenu(e) {
                        backgroundElem.style.background = '';
                        setTimeout(function () {
                            backgroundElem.style.transition = '';
                            backgroundElem.style.transform = '';
                        }, 200);
                        backgroundElem.removeEventListener('touchstart', hideTouchBackground);
                        list.classList.add('js__navi_min');
                        list.classList.remove('js__navi_show');
                        setTimeout(function () {
                          list.classList.remove('js__navi_min');  
                        }, getTimeTransition());
                        state = false;
                    };
                    function showMenu(e) {
                        backgroundElem.style.transform = 'scale(1)';
                        setTimeout(function () {
                            backgroundElem.style.transition = 'all .2s cubic-bezier(0, 0, 0.5, 0.99)';
                            backgroundElem.style.background = '#000';
                        }, 200);
                        backgroundElem.addEventListener('touchstart', hideTouchBackground);
                        list.classList.add('js__navi_max');
                        list.classList.add('js__navi_show');
                        setTimeout(function () {
                          list.classList.remove('js__navi_max');  
                        }, getTimeTransition());
                        state = true;
                    };
                    function hideTouchBackground(e) {
                        e.stopPropagation();
                        e.preventDefault();
                        if (e.target == this) {
                            hideMenu();
                        };
                    };
                    function eventClick (e) {
                        e.stopPropagation();
                        if (e.target == this) {
                            if (state) {
                                hideMenu();
                            } else {
                                showMenu();
                            };
                        };
                    };
                    this.button.addEventListener('touchstart', downButtonAnimate);
                    this.button.addEventListener('touchend', upButtonAnimate);
                    this.button.addEventListener('click', eventClick);
                    if (media) { 
                        media.addListener(function () {
                            if (!media.matches) {
                                button.removeEventListener('click', eventClick);
                                button.removeEventListener('touchstart', downButtonAnimate);
                                button.removeEventListener('touchend', upButtonAnimate);
                                backgroundElem.removeEventListener('touchstart', hideTouchBackground);
                                document.body.lastElementChild.remove();
                            };
                        });
                    };
                };
                this.scroll = function () {
                    var media = this.media;
                    var button = this.button;
                    var state = true;
                    var timer;
                    window.addEventListener('scroll', hideButton);
                    function hideButton() {

                        if (state) {
                            button.style.transition = 'all .8s cubic-bezier(.54,.94,.84,1.23)';
                            button.style.transform = 'translate(10%,-10%) scale(0)';
                            button.style.opacity = '0';
                            button.style.background = '#2225FF';
                            state = false;
                        };

                        clearTimeout(timer);
                        timer = setTimeout(function () {
                            button.style.transform = '';
                            button.style.opacity = '';
                            setTimeout(function () {
                                button.style.transition = '';
                            }, 900);
                            button.style.background = '';
                            state = true;
                        }, 1000);
                    };
                    if (media) {
                        media.addListener(function () {
                            window.removeEventListener('scroll', hideButton);
                        })
                    };
                };
            };
            var headerMenu = new Menu(naviButton, headerNavi, mediaPhone);
            headerMenu.scroll();
            headerMenu.click();
           
        } else {
            container.firstElementChild.classList.remove('js__slide');
            headerNavi.className = 'header__navi';
            if (sandwichTimeout) clearTimeout(sandwichTimeout);
            for (var i = 0; i < img.length; i++) {
                img[i].classList.remove('js__img_left');
                img[i].classList.remove('js__img_right');
                img[i].style.display = 'inline-block';
            };
          
            for(var i = 0; i < sandwichIcon.length; i++) {
                sandwichIcon[i].classList.remove('js__sandwich_none');
                sandwichIconTitle[i].classList.remove('js__sandwich__title_left');
                sandwichIconText[i].classList.remove('js__sandwich__text_right');
                sandwichIcon[i].classList.remove('sandwich__transition');
                sandwichIconTitle[i].classList.remove('sandwich__transition');
                sandwichIconText[i].classList.remove('sandwich__transition');
            };
        
        };
    
    };
};
