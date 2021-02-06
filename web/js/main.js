"use strict";

document.addEventListener('DOMContentLoaded', function () {
  // polyfill flat
  if (!Array.prototype.flat) Array.prototype.flat = function () {
    return function f(arr) {
      return arr.reduce(function (a, v) {
        return Array.isArray(v) ? a.concat(f(v)) : a.concat(v);
      }, []);
    }(this);
  }; // input range

  var sliderInp = document.querySelector('.sliderInp');
  var rangeInput = document.querySelector('.block__range-wrap > input');
  var blockRangeValue = document.querySelector('.block__range-value > p >span');
  sliderInp.addEventListener('input', function (e) {
    blockRangeValue.innerHTML = e.target.value;
  });
  rangeInput.addEventListener('input', function (e) {
    blockRangeValue.innerHTML = e.target.value;
    sliderInp.value = e.target.value;
  }); // input end range
  // modal

  var modal = function modal() {
    function activeModal(btnsTarget, modalWrap, activeClass) {
      var btns = document.querySelectorAll(btnsTarget);
      var modal = document.querySelector(modalWrap);
      btns.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          modal.classList.add(activeClass.replace(/\D/, ""));
          document.body.style.overflow = 'hidden';
        });
        modal.addEventListener('click', function (e) {
          if (e.target === modal || e.target.getAttribute('data-close') == '') {
            modal.classList.remove(activeClass.replace(/\D/, ""));
            document.body.style.overflow = '';
          }
        });
        document.addEventListener('keyup', function (e) {
          if (modal.classList.contains(activeClass.replace(/\D/, "")) && e.key == 'Escape') {
            modal.classList.remove(activeClass.replace(/\D/, ""));
            document.body.style.overflow = '';
          }
        });
      });
    }

    activeModal('.modal1__target', '.popup', '.popup-active');
  };

  modal(); // end modal
  // document.getElementById("myinput").oninput = function () {
  // 	this.style.background = 'linear-gradient(to right, #305BAF 0%, #305BAF ' + this.value + '%, #E4E4E4 ' + this.value + '%, #E4E4E4 100%)'
  // };
  // tabs

  var myTabs = function myTabs() {
    var tabs = function tabs(myTargets, myContents) {
      var targets = document.querySelectorAll(myTargets);
      var contents = document.querySelectorAll(myContents);

      if (targets.length > 1 && contents.length > 1) {
        targets.forEach(function (target, i) {
          target.addEventListener('click', function (e) {
            e.preventDefault();
            targets.forEach(function (elem) {
              if (e.target == elem || e.target.parentNode == elem || e.target.parentNode.parentNode) {
                hideElems();
                showElems(i);
              }
            });
          });
        });

        function hideElems() {
          targets.forEach(function (target) {
            target.classList.remove('active');
          });
          contents.forEach(function (cont) {
            cont.classList.remove('myShow');
            cont.classList.add('myHide');
          });
        }

        function showElems() {
          var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          targets[i].classList.add('active');
          contents[i].classList.remove('myHide');
          contents[i].classList.add('myShow');
        }

        hideElems();
        showElems();
      }
    }; // tabs('.newsletter__tabs-elem', '.newsletter__content-item');


    tabs('.recipients__tabs-elem1', '.recipients__content-item1');
    tabs('.recipients__tabs-elem2', '.recipients__content-item2');
    tabs('.recipients__tabs-elem3', '.recipients__content-item3');
    tabs('.recipients__tabs-elem4', '.recipients__content-item4');
    tabs('.statistics__top-elemModal', '.statistics__content-itemModal'); // tabs('.detailedStatistics__tabs-elem', '.detailedStatistics__content-item');
  };

  myTabs(); //end tabs
  // baz

  var myBaz = function myBaz() {
    var baz = function baz(myElems, myWrapRez, myAbon, myBtn, myMess) {
      var btn = document.querySelector(myBtn);
      var elems = document.querySelectorAll(myElems);
      var wrapRez = document.querySelector(myWrapRez);
      var abon = document.querySelector(myAbon);
      var mess = document.querySelector(myMess);
      var sum = 0;
      var sumAbon = 0;
      var sumMess = 0; // wrapRez.innerHTML = '';
      // abon.innerHTML = '';
      // mess.innerHTML = '';

      if (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          wrapRez.innerHTML = sum;
          abon.innerHTML = sumAbon;
          mess.innerHTML = sumMess;
        });
      }

      if (wrapRez && mess) {
        elems.forEach(function (elem) {
          elem.addEventListener('change', function (e) {
            var targetValue = e.target.getAttribute('data-valueBaz');
            var targetAbon = e.target.getAttribute('data-valueAbon');
            var targetMess = e.target.getAttribute('data-valueMess');

            if (e.target.checked) {
              sum += +targetValue;
              sumAbon += +targetAbon;
              sumMess += +targetMess;
            } else {
              sum -= +targetValue;
              sumAbon -= +targetAbon;
              sumMess -= +targetMess;
            }
          });
        });
      }
    };

    baz('.table-calc-baz1 > tbody > tr', '.recipients__exceptions-value1 > p > span', '.recipients__exceptions-abon1', '.recipients__exceptions-btn1', '.recipients__exceptions-mess');
    baz('.table-calc-baz2 > tbody > tr', '.recipients__exceptions-value2 > p > span', '.recipients__exceptions-abon2', '.recipients__exceptions-btn2', '.recipients__exceptions-mess2');
  };

  myBaz(); // end baz
  // accordion

  var myProlapse = function myProlapse() {
    var prolapse = function prolapse(myTargets, myContents) {
      var myClose = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var targets = document.querySelectorAll(myTargets);
      var contents = document.querySelectorAll(myContents);
      var close = document.querySelector(myClose);
      targets.forEach(function (target) {
        target.addEventListener('click', function (e) {
          contents.forEach(function (cont) {
            if (target.getAttribute('data-linkValue') == cont.getAttribute('data-ulValue')) {
              if (cont.style.maxHeight) {
                cont.style.maxHeight = null;
              } else {
                cont.style.maxHeight = cont.scrollHeight + "px";
              }
            }

            if (close) {
              close.addEventListener('click', function (e) {
                cont.style.maxHeight = null;
              });
            }
          });
        });
      });
    };

    prolapse('.settings__more-target', '.settings__more-info');
    prolapse('.newsletter__left-top', '.newsletter__left-wrap');
    prolapse('.newsletter__right-top', '.newsletter__right-wrap');
  };

  myProlapse(); // end accordion
  // 

  var mySelectionInTheEkNewsletter = function mySelectionInTheEkNewsletter() {
    var selectionInTheEkNewsletter = function selectionInTheEkNewsletter(myTextArea, myGSelect, mySelectName, mySelectNumber, myInputName, myInputNumber) {
      // let selectName = document.querySelector(mySelectName);
      // let selectNumber = document.querySelector(mySelectNumber);
      // let inputName = document.querySelector(myInputName);
      // let inputNumber = document.querySelector(myInputNumber);
      var gSelect = document.querySelector(myGSelect);
      var textarea = document.querySelector(myTextArea); // let rezSelectName = 'Выберите имя';
      // let rezSelectNumber = 'Выберите номер';

      if (gSelect) {
        gSelect.addEventListener('change', function (e) {
          textarea.innerHTML = e.target.value;
        });
      } // if (selectName) {
      // 	selectName.addEventListener('change', (e) => {
      // 		rezSelectName = e.target.value;
      // 		textarea.innerHTML = `${rezSelectName} ${rezSelectNumber}`;
      // 	})
      // }
      // if (selectNumber) {
      // 	selectNumber.addEventListener('change', (e) => {
      // 		rezSelectNumber = e.target.value;
      // 		textarea.innerHTML = `${rezSelectName} ${rezSelectNumber}`;
      // 	})
      // }
      // if (inputName) {
      // 	inputName.addEventListener('input', (e) => {
      // 		rezSelectName = e.target.value;
      // 		textarea.innerHTML = `${rezSelectName} ${rezSelectNumber}`;
      // 	})
      // }
      // if (inputNumber) {
      // 	inputNumber.addEventListener('input', (e) => {
      // 		rezSelectNumber = e.target.value;
      // 		textarea.innerHTML = `${rezSelectName} ${rezSelectNumber}`;
      // 	})
      // }

    };

    selectionInTheEkNewsletter('.newsletter__form-vk-text > textarea', '.newsletter__form-selVk-el > select', '', '', '', ''); // selectionInTheEkNewsletter('.newsletter__form-vk-text > textarea', '.newsletter__form-vkTemplate-baz-name > select', '.newsletter__form-vkTemplate-baz-number > select', '.newsletter__form-vkTemplate-manually-name > input', '.newsletter__form-vkTemplate-manually-number > input');
  };

  mySelectionInTheEkNewsletter(); //
});
$(document).ready(function () {
  var $slider = $("#slider");
  var $fill = $(".bar .fill");

  function setBar() {
    $fill.css("width", $slider.val() + "%");
  }

  $slider.on("input", setBar);
  setBar();
  var ddData = [{
    text: "Viber",
    value: 1,
    selected: false,
    description: "",
    imageSrc: "web/images/content/2.svg"
  }, {
    text: "SMS",
    value: 3,
    selected: false,
    description: "",
    imageSrc: "web/images/content/1.svg"
  }, {
    text: "ВКОНТАКТЕ",
    value: 2,
    selected: false,
    description: "",
    imageSrc: "web/images/content/3.svg"
  }];
  var ddData2 = [{
    text: "Viber",
    value: 2,
    selected: false,
    description: "",
    imageSrc: "web/images/content/2.svg"
  }, {
    text: "SMS",
    value: 3,
    selected: false,
    description: "",
    imageSrc: "web/images/content/1.svg"
  }, {
    text: "ВКОНТАКТЕ",
    value: 1,
    selected: false,
    description: "",
    imageSrc: "web/images/content/3.svg"
  }];
  var ddData3 = [{
    text: "Viber",
    value: 1,
    selected: false,
    description: "",
    imageSrc: "web/images/content/2.svg"
  }, {
    text: "SMS",
    value: 3,
    selected: false,
    description: "",
    imageSrc: "web/images/content/1.svg"
  }, {
    text: "ВКОНТАКТЕ",
    value: 2,
    selected: false,
    description: "",
    imageSrc: "web/images/content/3.svg"
  }];
  $('.demoBasic').ddslick({
    data: ddData,
    defaultSelectedIndex: 3,
    width: 150,
    imagePosition: "left",
    selectText: "Select your favorite social network",
    onSelected: function onSelected(data) {
      console.log(data);
    }
  });
  $('.demoBasic2').ddslick({
    data: ddData2,
    defaultSelectedIndex: 2,
    width: 150,
    imagePosition: "left",
    selectText: "",
    onSelected: function onSelected(data) {
      console.log(data);
    }
  });
  $('.demoBasic3').ddslick({
    data: ddData3,
    defaultSelectedIndex: 1,
    width: 150,
    imagePosition: "left",
    selectText: "",
    onSelected: function onSelected(data) {
      console.log(data);
    }
  });
  $('input[type=file]').each(function () {
    var $input = $(this),
        $label = $input.next('.js-labelFile'),
        labelVal = $label.html();
    $input.hide();
    $input.on('change', function (element) {
      var fileName = '';
      if (element.target.value) fileName = element.target.value.split('\\').pop();
      fileName ? $label.addClass('has-file').find('.js-fileName').html(fileName) : $label.removeClass('has-file').html(labelVal);
    });
  });
  var slider = new Swiper('.mySlider', {
    autoHeight: true,
    slidesPerView: 4,
    spaceBetween: 10,
    loop: true,
    observer: true,
    observeParents: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      991: {
        slidesPerView: 4,
        spaceBetween: 10
      }
    } // autoplay: {
    // 	delay: 5000,
    // },

  }); // Зададим стартовую дату

  var start = new Date(),
      prevDay,
      startHours = 9; // 09:00

  start.setHours(9);
  start.setMinutes(0); // Если сегодня суббота или воскресенье - 10:00

  if ([6, 0].indexOf(start.getDay()) != -1) {
    start.setHours(10);
    startHours = 10;
  }

  $('.time-calendar').each(function (i) {
    $(this).datepicker({
      language: 'ru',
      timepicker: true,
      startDate: start,
      minHours: startHours,
      maxHours: 18,
      onSelect: function onSelect(fd, d, picker) {
        // Ничего не делаем если выделение было снято
        if (!d) return;
        var day = d.getDay(); // Обновляем состояние календаря только если была изменена дата

        if (prevDay != undefined && prevDay == day) return;
        prevDay = day; // Если выбранный день суббота или воскресенье, то устанавливаем
        // часы для выходных, в противном случае восстанавливаем начальные значения

        if (day == 6 || day == 0) {
          picker.update({
            minHours: 1,
            maxHours: 24
          });
        } else {
          picker.update({
            minHours: 9,
            maxHours: 18
          });
        }
      }
    });
  });
  $('.header__burger').click(function () {
    $('.header__burger').toggleClass('active');
    $('body').toggleClass('lock');
    $('.header__menu').toggleClass('active');
    $('.header__wrap').toggleClass('active');
    $('.wrapper').toggleClass('active');
  }); // Вот мы кликнули по меню

  $('.topmenu__item').on('click', function (e) {
    // if ($('.header__menu').contains('active')) {
    // тут меню мы скрываем у всех
    $('.submenu').slideUp();
    $('.topmenu__item').removeClass('active'); // а тут мы открываем

    if ($(this).find('.submenu').is(':visible')) {
      $(this).find('.submenu').slideUp();
    } else {
      $(this).find('.submenu').slideDown();
      $(this).addClass('active');
    } // $(this).find('.submenu').slideToggle()
    // }

  });
  var newsletterTransliterationText = document.querySelectorAll('.newsletter__transliteration-text');
  var checkTransElems = document.querySelectorAll('.checkTrans');
  checkTransElems.forEach(function (elem, i) {
    elem.addEventListener('change', function (e) {
      if (e.target.getAttribute('data-check') === newsletterTransliterationText[i].getAttribute('data-check-trans')) {
        newsletterTransliterationText[i].classList.toggle('active');
      }
    });
  }); // let myDataNumber = document.querySelectorAll('[data-number]');
  // let myTxt = document.querySelector('.txt');
  // let newsletterFormTextSymbol = document.querySelector('.newsletter__form-text-symbol > span');
  // let newsletterFormTextSms = document.querySelector('.newsletter__form-text-sms > span');
  // const numberOfMessages = (myElems, myTxt, myLengthLetters, myLengthSMS, myTransLengthLetters, myTransLengthSMS, searchElem) => {
  // 	let elems = document.querySelectorAll(myElems);
  // 	let txt = document.querySelector(myTxt);
  // 	let lengthLetters = document.querySelector(myLengthLetters);
  // 	let lengthSMS = document.querySelector(myLengthSMS);
  // 	let translengthLetters = document.querySelector(myTransLengthLetters);
  // 	let transLengthSMS = document.querySelector(myTransLengthSMS);
  // 	let i = 1;
  // 	let value = 10;
  // 	// if (lengthLetters && lengthSMS) {
  // 	// 	lengthLetters.innerHTML = txt.value.length;
  // 	// 	lengthSMS.innerHTML = (Math.floor(lengthLetters.innerHTML / 17));
  // 	// }
  // 	if (txt) {
  // 		txt.addEventListener('input', (e) => {
  // 			if (txt.value.length >= 1 && txt.value.length < value) {
  // 				lengthSMS.innerHTML = i;
  // 			}
  // 			if (txt.value.length >= value) {
  // 				lengthSMS.innerHTML = i++;
  // 				value = value + 10;
  // 			}
  // 			lengthLetters.innerHTML = e.target.value.length;
  // 			// lengthSMS.innerHTML = (Math.floor(lengthLetters.innerHTML / 17));
  // 			// translengthLetters.innerHTML = e.target.value.length;
  // 			// transLengthSMS.innerHTML = (Math.floor(lengthLetters.innerHTML / 17));
  // 		});
  // 	}
  // if (elems) {
  // 	elems.forEach(elem => {
  // 		elem.addEventListener('click', (e) => {
  // 			lengthLetters.innerHTML = txt.value.length + e.target.getAttribute(searchElem).length;
  // 			lengthSMS.innerHTML = (Math.floor(lengthLetters.innerHTML / 10));
  // 			console.log(txt.value)
  // 			console.log(document.querySelector('.txt').value)
  // 			// lengthSMS.innerHTML = i++;
  // 			// lengthSMS.innerHTML = (Math.floor(lengthLetters.innerHTML / 17));
  // 			// translengthLetters.innerHTML = txt.value.length + e.target.getAttribute(searchElem).length;
  // 			// transLengthSMS.innerHTML = (Math.floor(lengthLetters.innerHTML / 17));
  // 		});
  // 	});
  // }
  // }
  // numberOfMessages('[data-number]', '.txt', '.newsletter__form-text-symbol > span', '.newsletter__form-text-sms > span', '.newsletter__transliteration-symbol > span', '.newsletter__transliteration-sms > span', 'data-number');
  // numberOfMessages(false, '.txtTrans', '.newsletter__transliteration-symbol > span', '.newsletter__transliteration-sms > span');
  // numberOfMessages('[data-number2]', '.txt2', '.newsletter__form-text-symbol2 > span', '.newsletter__form-text-sms2 > span', '.newsletter__transliteration-symbol2 > span', '.newsletter__transliteration-sms2 > span', 'data-number2');
  // numberOfMessages(false, '.txtTrans2', '.newsletter__transliteration-symbol2 > span', '.newsletter__transliteration-sms2 > span');

  var lengthLetters = document.querySelector('.newsletter__form-text-symbol > span');
  var lengthSMS = document.querySelector('.newsletter__form-text-sms > span');
  var translengthLetters = document.querySelector('.newsletter__transliteration-symbol > span');
  var transLengthSMS = document.querySelector('.newsletter__transliteration-sms > span');
  var lengthLetters2 = document.querySelector('.newsletter__form-text-symbol2 > span');
  var lengthSMS2 = document.querySelector('.newsletter__form-text-sms2 > span');
  var translengthLetters2 = document.querySelector('.newsletter__transliteration-symbol2 > span');
  var transLengthSMS2 = document.querySelector('.newsletter__transliteration-sms2 > span');

  var countSms = function countSms(arg, sum) {
    return Math.ceil(arg / sum);
  };

  $('[data-number]').on('click', function (e) {
    e.preventDefault();
    var parentElem = $(this).closest('.newsletter__form-text');
    var txt = parentElem.find('.txt');
    var dataText = txt.attr('data-txt');
    var transElem = $("[data-txtTrans=\"".concat(dataText, "\"]"));
    txt.val(txt.val() + $(this).attr('data-number'));
    transElem.val(rus_to_latin(txt.val()));
    lengthLetters.innerHTML = txt.val().length;
    lengthSMS.innerHTML = countSms(txt.val().length, 170);
    translengthLetters.innerHTML = transElem.val().length;
    transLengthSMS.innerHTML = countSms(transElem.val().length, 160);
  });
  $('.txt').on('input', function (e) {
    var dataText = $(this).attr('data-txt');
    var txtValue = $(this).val();
    var transElem = $("[data-txtTrans=\"".concat(dataText, "\"]"));
    transElem.val(rus_to_latin(txtValue));
    lengthLetters.innerHTML = $(this).val().length;
    lengthSMS.innerHTML = countSms($(this).val().length, 170);
    translengthLetters.innerHTML = transElem.val().length;
    transLengthSMS.innerHTML = countSms(transElem.val().length, 160);
  });
  $('[data-number2]').on('click', function (e) {
    e.preventDefault();
    var parentElem2 = $(this).closest('.newsletter__form-text2');
    var txt2 = parentElem2.find('.txt2');
    var dataText2 = txt2.attr('data-txt2');
    var transElem2 = $("[data-txtTrans2=\"".concat(dataText2, "\"]"));
    txt2.val(txt2.val() + $(this).attr('data-number2'));
    transElem2.val(rus_to_latin(txt2.val()));
    lengthLetters2.innerHTML = txt2.val().length;
    lengthSMS2.innerHTML = countSms(txt2.val().length, 170);
    translengthLetters2.innerHTML = transElem2.val().length;
    transLengthSMS2.innerHTML = countSms(transElem2.val().length, 160);
  });
  $('.txt2').on('input', function (e) {
    var dataText2 = $(this).attr('data-txt2');
    var txtValue2 = $(this).val();
    var transElem2 = $("[data-txtTrans2=\"".concat(dataText2, "\"]"));
    transElem2.val(rus_to_latin(txtValue2));
    lengthLetters2.innerHTML = $(this).val().length;
    lengthSMS2.innerHTML = countSms($(this).val().length, 170);
    translengthLetters2.innerHTML = transElem2.val().length;
    transLengthSMS2.innerHTML = countSms(transElem2.val().length, 160);
  });
});

function rus_to_latin(str) {
  var ru = {
    'а': 'a',
    'б': 'b',
    'в': 'v',
    'г': 'g',
    'д': 'd',
    'е': 'e',
    'ё': 'e',
    'ж': 'j',
    'з': 'z',
    'и': 'i',
    'к': 'k',
    'л': 'l',
    'м': 'm',
    'н': 'n',
    'о': 'o',
    'п': 'p',
    'р': 'r',
    'с': 's',
    'т': 't',
    'у': 'u',
    'ф': 'f',
    'х': 'h',
    'ц': 'c',
    'ч': 'ch',
    'ш': 'sh',
    'щ': 'shch',
    'ы': 'y',
    'э': 'e',
    'ю': 'u',
    'я': 'ya'
  },
      n_str = [];
  str = str.replace(/[ъь]+/g, '').replace(/й/g, 'i');

  for (var i = 0; i < str.length; ++i) {
    n_str.push(ru[str[i]] || ru[str[i].toLowerCase()] == undefined && str[i] || ru[str[i].toLowerCase()].toUpperCase());
  }

  return n_str.join('');
}

var numbersInputs = document.querySelectorAll('.numbers');
var maskOptions = {
  mask: Number,
  min: -10000,
  max: 10000,
  maxLength: 2,
  thousandsSeparator: ' '
};
numbersInputs.forEach(function (el) {
  var mask = IMask(el, maskOptions);
});
var numbersPhone = document.querySelectorAll('.numbersPhone');
var maskOptionsPhone = {
  mask: '+{7}(000)000-00-00'
};
numbersPhone.forEach(function (el) {
  var mask = IMask(el, maskOptionsPhone);
});