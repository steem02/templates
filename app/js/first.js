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
            this.count = 1;
            this.initialPoint = null;
            this.finalPoint = null;
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
            count = obj.count;
            this.count++;
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
            count = obj.count;
            this.count--;
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
        SliderPhone.prototype.eventSliderTouchStart = function (event) {
            event.preventDefault();
            event.stopPropagation();
            this.initialPoint = event.changedTouches[0];
        };
        SliderPhone.prototype.eventSliderTouchEnd = function (event) {
            event.preventDefault();
            event.stopPropagation();
            this.finalPoint = event.changedTouches[0];
            var xAbs = Math.abs(this.initialPoint.pageX - this.finalPoint.pageX);
          
            if (xAbs > 5) {
                
                if (this.finalPoint.pageX < this.initialPoint.pageX){
                    this.swipeLeft(this.count);
                    
                } else {
                    this.swipeRight(this.count);
                };
                 
            };
        };
        SliderPhone.prototype.touchMove = function () {
            var count = 1;
            var img = this.picture;
            var self = this;
            // function swipeLeft(num) {
                
            // };
            // function swipeRight(num) {
                
            // };
            //Move
            var initialPoint;
            var finalPoint;
            // eventSliderTouchStart = function(event) {
            //     event.preventDefault();
            //     event.stopPropagation();
            //     this.initialPoint = event.changedTouches[0];
            // };
            // eventSliderTouchEnd = function(event) {
            //     event.preventDefault();
            //     event.stopPropagation();
            //     this.finalPoint=event.changedTouches[0];
            //     var xAbs = Math.abs(this.initialPoint.pageX - this.finalPoint.pageX);
              
            //     if (xAbs > 5) {
                    
            //         if (this.finalPoint.pageX < this.initialPoint.pageX){
            //             this.swipeLeft(count);
                        
            //         } else {
            //             this.swipeRight(count);
            //         };
                     
            //     };
            
            // };
            this.container.addEventListener('touchstart',this.eventSliderTouchStart, false);
            this.container.addEventListener('touchend',this.eventSliderTouchEnd, false);
            if (!document.ontouchstart || !document.ontouchend) {
                this.container.onclick = function () {
                    this.swipeLeft(this.count);
                };
            };
        };
        SliderPhone.prototype.scrollVisible = function () {
            var container = this.container;
            eventSliderScroll = function (e) {
                var winHeight = document.body.clientHeight;
                var sliderCoord = container.getBoundingClientRect();
                if (sliderCoord.top < winHeight) {
                    container.style.opacity = '1';
                    
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
