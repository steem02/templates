var mediaPhone = window.matchMedia('only screen and (max-width: 480px)');
var img = document.getElementsByClassName('js__tastes-photo');
var container = document.getElementsByClassName('js__slide-contain')[0];
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
            var count = this.count;
            var img = this.picture;
            if (count < 0) {
                count = img.length - count;
                this.count = count;
            };
            if (count >= img.length) {
                count = count - img.length;
                this.count = count;
            };
            function swipeLeft(num) {
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
                              
              
                
                // img[under].style.display = 'none';
                // img[left].style.display = 'none';
                img[left].classList.remove('js__img_left');
                img[right].classList.remove('js__img_right');
                img[num].classList.add('js__img_left');
                img[under].classList.add('js__img_right');
                img[under].style.display = 'inline-block';
                count++;
            };
            function swipeRight(num) {
                img[num+1].style.zIndex = '-1';
                img[num+1].classList.remove('js__img_right');
                img[num].classList.add('js__img_right');
                img[num-1].classList.remove('js__img_left');
                img[num-2].classList.add('js__img_left');
                setTimeout(function () {
                    img[num-2].style.zIndex = '999';
                }, 400);
                count--;
            };
            
            swipeLeft(this.count);
            this.count = count;
        };
        var sld = new SliderPhone(img, container);
        sld.begin();
        container.onclick = function() {sld.touchMove()};
    } else {
        container.onclick = '';
        container.firstElementChild.classList.remove('js__slide');
        for (var i = 0; i < img.length; i++) {
            img[i].classList.remove('js__img_left');
            img[i].classList.remove('js__img_right');
            img[i].style.zIndex = '';
            img[i].style.display = 'inline-block';
        }
    }

};
