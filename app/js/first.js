var mediaPhone = window.matchMedia('only screen and (max-width: 480px)');
var img = document.getElementsByClassName('js__tastes-photo');
var container = document.getElementsByClassName('js__slide-contain')[0];
activePhone480(mediaPhone);
mediaPhone.addListener(activePhone480);

function activePhone480(media) {

    if (mediaPhone.matches) {
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
                if (this._LENGTH = 4) this.picture[3].style.zIndex = '-999';
            } else {
                return;
            };
        
        };
        SliderPhone.prototype.touchMove = function () {
            var count = this.count;
            var img = this.picture;
          
            function swipeLeft(num) {
                img[num+2].style.display = 'none';
                img[num-1].style.display = 'none';
                img[num].classList.add('js__img_transition');
                img[num+1].classList.add('js__img_transition');
                
                img[num-1].classList.remove('js__img_left');
                img[num+1].classList.remove('js__img_right');
                img[num].classList.add('js__img_left');
                img[num+2].classList.add('js__img_right');
                img[num+2].style.display = 'inline-block';
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
            
            swipeLeft(count);
        };
        var sld = new SliderPhone(img, container);
        sld.begin();
        container.onclick = function() {sld.touchMove()};
    } else {
        container.onclick = '';
        for (var i = 0; i < img.length; i++) {
            img[i].style.transform = '';
            img[i].style.zIndex = '';
            img[i].style.display = 'inline-block';
        }
    }

};
