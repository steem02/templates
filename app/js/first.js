var mediaPhone = window.matchMedia('only screen and (max-width: 480px)');
var img = document.getElementsByClassName('js__tastes-photo');
var container = document.getElementsByClassName('js__slide-contain')[0];

mediaPhone.addListener(activePhone);

function activePhone() {
    console.log('dsfdf');    
    if (mediaPhone.matches) {
        
        function SliderPhone(img, container) {
            this.picture = img;
            this.container = container;
            this._AMOUNT = this.picture.length;
            function begin() {
                
                if (this._AMOUNT >= 3) {
                    this.picture[0].classList.add('js__img_left');
                    this.picture[2].classList.add('js__img_right');
                    if (this._AMOUNT = 4) this.picture[3].style = '-1';
                } else {
                    return;
                };
            
            };
            begin();
        };
        SliderPhone.prototype.touchMove = function () {
            function swipeLeft(num) {
                img[num-1].style.zIndex = '-1';
                img[num-1].classList.remove('js__img_left');
                img[num].classList.add('js__img_left');
                img[num+1].classList.remove('js__img_right');
                img[num+2].classList.add('js__img_right');
                setTimeout(function () {
                    num.style.zIndex = '0';
                }, 500);
            };
            function swipeRight(num) {
                img[num+1].style.zIndex = '-1';
                img[num+1].classList.remove('js__img_right');
                img[num].classList.add('js__img_right');
                img[num-1].classList.remove('js__img_left');
                img[num-2].classList.add('js__img_left');
                setTimeout(function () {
                    num.style.zIndex = '0';
                }, 500);
            };
            swipeLeft(3);
        };
        var sld = new SliderPhone(img, container);
    };

};
