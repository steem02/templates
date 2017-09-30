var mediaPhone = window.matchMedia('only screen and (max-width: 480px)');
var img = document.getElementsByClassName('js__tastes-photo');
var container = document.getElementsByClassName('js__slide-contain')[0];
var eventSliderTouchStart, eventSliderTouchEnd, eventSliderScroll;
activePhone480(mediaPhone);
mediaPhone.addListener(activePhone480);

function activePhone480(media) {

    if (mediaPhone.matches) {
        container.firstElementChild.classList.add('js__slide');
        function SliderPhone(img, container) {
            this.picture = img;
            this.container = container;
            this._LENGTH = this.picture.length;
            this._COUNT = 2;
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
            obj.count++
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
            return obj.count;
        };
        SliderPhone.prototype.begin = function () {
                
            if (this._LENGTH >= 3) {
                this.picture[0].classList.add('js__img_left');
                this.picture[2].classList.add('js__img_right');
                if (this._LENGTH = 4) this.picture[3].style.display = 'none';
            } else {
                return;
            };
        
        };
        SliderPhone.prototype.touchMove = function () {
            var count = this._COUNT;
            var img = this.picture;
            var initialPoint;
            var finalPoint;
            var swipeLeft = this.swipeLeft.bind(this);
            var swipeRight = this.swipeRight.bind(this);
            eventSliderTouchStart = function(event) {
                event.preventDefault();
                event.stopPropagation();
                initialPoint = event.changedTouches[0];
            };
            eventSliderTouchEnd = function(event) {
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
            this.container.addEventListener('touchstart',eventSliderTouchStart, false);
            this.container.addEventListener('touchend',eventSliderTouchEnd, false);
            if (!document.ontouchstart || !document.ontouchend) {
                this.container.onclick = function () {
                    this.swipeLeft(this.count);
                };
            };
        };
        SliderPhone.prototype.scrollVisible = function () {
            var container = this.container;
            var swipeLeft = this.swipeLeft.bind(this);
            var img = this.picture;

            eventSliderScroll = function (e) {
                var winHeight = document.body.clientHeight;
                var sliderCoord = container.getBoundingClientRect();
                
                // Вычисление задержки для свайпа после загрузки
                function getTimeTransition () {

                    var pause = delay + duration;
                };
                

                if (sliderCoord.top < winHeight) {
                    container.style.opacity = '1';
                    setTimeout(function () {
                        swipeLeft(1);
                    }, 500);
                    window.removeEventListener('scroll', eventSliderScroll);
                };
            };
            window.addEventListener('scroll', eventSliderScroll);
        };
        var sld = new SliderPhone(img, container);
        sld.begin();
        sld.touchMove();
        sld.scrollVisible();
    } else {
        container.removeEventListener('touchstart', eventSliderTouchStart);
        container.removeEventListener('touchend', eventSliderTouchEnd);
        window.removeEventListener('scroll', eventSliderScroll);
        container.onclick = '';
        container.firstElementChild.classList.remove('js__slide');
        for (var i = 0; i < img.length; i++) {
            img[i].classList.remove('js__img_left');
            img[i].classList.remove('js__img_right');
            img[i].style.display = 'inline-block';
        }
    }

};
