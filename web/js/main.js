"use strict";

document.addEventListener('DOMContentLoaded', function () {
  // polyfill flat
  if (!Array.prototype.flat) Array.prototype.flat = function () {
    return function f(arr) {
      return arr.reduce(function (a, v) {
        return Array.isArray(v) ? a.concat(f(v)) : a.concat(v);
      }, []);
    }(this);
  }; // Валидиция

  var validateForms = function validateForms(selector, rules) {
    if (selector && rules) {
      new window.JustValidate(selector, {
        rules: rules,
        messages: {
          name: {
            minLength: 'My custom message about only minLength rule'
          },
          email: 'E-mail не указан или указан неправильно!',
          tel: 'Телефон не указан или указан неправильно',
          tel2: 'Телефон не указан или указан неправильно'
        },
        submitHandler: function submitHandler(form) {}
      });
    }
  };

  var settingsForm = document.querySelector('.settings__form');

  if (settingsForm) {
    validateForms('.settings__form', {
      email: {
        required: true,
        email: true
      },
      tel: {
        required: true
      },
      tel2: {
        required: true
      }
    });
  } // end валидации
  // Обрезаю кол-во симолов


  var myCharacterCropping = function myCharacterCropping() {
    var characterCropping = function characterCropping(myElems) {
      var elems = document.querySelectorAll(myElems);
      var arr = [];
      elems.forEach(function (elem, i) {
        arr[i] = elem.innerHTML;

        if (elem.innerHTML.length >= 160) {
          elem.innerHTML = elem.innerHTML.substring(0, 160);
          var sp = document.createElement('span');
          sp.innerHTML = '...';
          sp.classList.add('spClass');
          elem.append(sp);
        }

        elem.addEventListener('click', function (e) {
          if (elem.getAttribute('data-cropTarget') == i) {
            elem.innerHTML = arr[i];
          }
        });
      });
    };

    characterCropping('.g-table-cropTarget');
  };

  myCharacterCropping(); // end обрезки символов
  //modal
  // let modal = () => {
  // 	function activeModal(btnsTarget, modalWrap, activeClass) {
  // 		let btns = document.querySelectorAll(btnsTarget);
  // 		let modal = document.querySelector(modalWrap);
  // 		if (btns) {
  // 			btns.forEach(btn => {
  // 				btn.addEventListener('click', (e) => {
  // 					e.preventDefault();
  // 					modal.classList.add(activeClass.replace(/\D/, ""));
  // 					document.body.style.overflow = 'hidden';
  // 					// modal.innerHTML = '<iframe src="myModalElem1.html"></iframe>';
  // 				});
  // 				if (modal) {
  // 					modal.addEventListener('click', (e) => {
  // 						if (e.target === modal || e.target.getAttribute('data-close') == '') {
  // 							modal.classList.remove(activeClass.replace(/\D/, ""));
  // 							document.body.style.overflow = '';
  // 						}
  // 					});
  // 				}
  // 				document.addEventListener('keyup', (e) => {
  // 					if (modal.classList.contains(activeClass.replace(/\D/, "")) && e.key == 'Escape') {
  // 						modal.classList.remove(activeClass.replace(/\D/, ""));
  // 						document.body.style.overflow = '';
  // 					}
  // 				});
  // 			});
  // 		}
  // 	}
  // 	// activeModal('.modal1__target', '.popup', '.popup-active');
  // 	activeModal('.databaseManagement__modalTarget', '.popup2', '.popup-active');
  // 	activeModal('.databaseManagement__bazes-modalTarget', '.popup3', '.popup-active');
  // 	activeModal('.listSubNewBase__numberModalTarget', '.popup4', '.popup-active');
  // 	activeModal('.listSubNewBase__xlsModalTarget', '.popup5', '.popup-active');
  // 	activeModal('.listSubNewBase__xlsModalTarget2', '.popup6', '.popup-active');
  // 	activeModal('.listSubNewBase__settings-link', '.popup7', '.popup-active');
  // 	activeModal('.registerOfSenderNames__btnModalTarget', '.popup8', '.popup-active');
  // 	activeModal('.listSubNewBase__numberModalTarget2', '.popup9', '.popup-active');
  // 	activeModal('.attachDocumentTargetModal', '.popup10', '.popup-active');
  // 	activeModal('.templates__TargetModal', '.popup11', '.popup-active');
  // 	activeModal('.templates__TargetModalVk', '.popup13', '.popup-active');
  // 	activeModal('.inboxSettings__targetModal', '.popup12', '.popup-active');
  // 	activeModal('.issuedInvoices-modalTarget', '.popup14', '.popup-active');
  // 	activeModal('.phone-bodyText', '.popup14', '.popup-active');
  // 	activeModal('.g-card7__btn-el', '.popup4', '.popup-active');
  // 	activeModal('.popu4__targetIconTable ', '.popup4', '.popup-active');
  // }
  // modal();
  // end modal
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
  // baz - рассчет стоимости в таблицах

  var myBaz = function myBaz() {
    var baz = function baz(myElems, myWrapRez, myAbon, myBtn, myMess) {
      var btn = document.querySelector(myBtn);
      var elems = document.querySelectorAll(myElems);
      var wrapRez = document.querySelector(myWrapRez);
      var abon = document.querySelector(myAbon);
      var mess = document.querySelector(myMess);
      var sum = 0;
      var sumAbon = 0;
      var sumMess = 0;

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
    }; // prolapse('.settings__more-target', '.settings__more-info');


    prolapse('.newsletter__left-top', '.newsletter__left-wrap');
    prolapse('.newsletter__right-top', '.newsletter__right-wrap');
  };

  myProlapse(); // end accordion
  // Выбор шаблона ВК на странице ВК рассылка

  var mySelectionInTheEkNewsletter = function mySelectionInTheEkNewsletter() {
    var selectionInTheEkNewsletter = function selectionInTheEkNewsletter(myTextArea, myGSelect, mySelectName, mySelectNumber, myInputName, myInputNumber) {
      var gSelect = document.querySelector(myGSelect);
      var textarea = document.querySelector(myTextArea);

      if (gSelect) {
        gSelect.addEventListener('change', function (e) {
          textarea.innerHTML = e.target.value;
        });
      }
    };

    selectionInTheEkNewsletter('.newsletter__form-vk-text > textarea', '.newsletter__form-selVk-el > select', '', '', '', '');
  };

  mySelectionInTheEkNewsletter(); //
  // Показать блок с применением флекса

  var myShowFlexBlock = function myShowFlexBlock() {
    var showFlexBlock = function showFlexBlock(myTarget, myWrap) {
      var target = document.querySelector(myTarget);
      var wraps = document.querySelector(myWrap);
      var i = 0;

      if (target) {
        target.addEventListener('click', function (e) {
          i++;

          if (i < 4) {
            wraps.innerHTML += "\n\t\t\t\t\t\t<div class=\"block__search-wrap-hide\">\n\t\t\t\t\t\t\t<input type=\"text\" class=\"g-input\" name=\"search".concat(i + 1, "\">\n\t\t\t\t\t\t\t<div class=\"mySelect__elem\">\n\t\t\t\t\t\t\t\t<div class=\"mySelect__style\">\n\t\t\t\t\t\t\t\t\t<select class=\"g-input\" type=\"text\" name=\"search__location").concat(i + 1, "\">\n\t\t\t\t\t\t\t\t\t\t<option>\u0412\u043E \u0432\u0441\u0435\u0445 \u043F\u043E\u043B\u044F\u0445</option>\n\t\t\t\t\t\t\t\t\t\t<option>\u041D\u043E\u043C\u0435\u0440</option>\n\t\t\t\t\t\t\t\t\t\t<option>\u0424\u0430\u043C\u0438\u043B\u0438\u044F</option>\n\t\t\t\t\t\t\t\t\t\t<option>\u0418\u043C\u044F</option>\n\t\t\t\t\t\t\t\t\t\t<option>\u041E\u0442\u0432\u0435\u0441\u0442\u0432\u043E</option>\n\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t<svg class=\"svg-sprite-icon\" width=\"9\" height=\"9\" viewBox=\"0 0 9 9\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t\t\t\t<g clip-path=\"url(#clip0)\">\n\t\t\t\t\t\t\t\t\t\t<path d=\"M8.94265 2.4881C9.0177 2.41041 9.01554 2.28657 8.93785 2.21152C8.86204 2.13832 8.74187 2.13832 8.66608 2.21152L4.50099 6.37622L0.336291 2.21113C0.261236 2.13344 0.137422 2.13129 0.0597076 2.20633C-0.0179882 2.28138 -0.020133 2.4052 0.054903 2.48291C0.0564804 2.48454 0.0580759 2.48614 0.0597076 2.48772L4.3629 6.7909C4.43927 6.86726 4.56309 6.86726 4.63948 6.7909L8.94265 2.4881Z\" fill=\"#fff\"/>\n\t\t\t\t\t\t\t\t\t\t<path d=\"M0.0021963 2.34964C0.00199413 2.24161 0.089427 2.15389 0.197453 2.15369C0.249531 2.15359 0.2995 2.17428 0.336286 2.21116L4.50099 6.37624L8.66567 2.21116C8.74215 2.13467 8.86615 2.13467 8.94264 2.21116C9.01912 2.28764 9.01912 2.41164 8.94264 2.48812L4.63945 6.79131C4.56308 6.86767 4.43926 6.86767 4.36287 6.79131L0.0597019 2.48812C0.0228987 2.45145 0.0021963 2.40161 0.0021963 2.34964Z\" fill=\"white\"/>\n\t\t\t\t\t\t\t\t\t\t</g>\n\t\t\t\t\t\t\t\t\t\t<defs>\n\t\t\t\t\t\t\t\t\t\t<clipPath id=\"clip0\">\n\t\t\t\t\t\t\t\t\t\t<rect width=\"9\" height=\"9\" fill=\"white\" transform=\"translate(9) rotate(90)\"/>\n\t\t\t\t\t\t\t\t\t\t</clipPath>\n\t\t\t\t\t\t\t\t\t\t</defs>\n\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t");
          }
        });
      }
    };

    showFlexBlock('.block__info', '.block__search');
  };

  myShowFlexBlock(); // end Показать блок с применением флекса
  // Массовый cheked inp

  var myMassChekedElems = function myMassChekedElems() {
    var massChekedElems = function massChekedElems(myTarget, myElems) {
      var target = document.querySelector(myTarget);
      var elems = document.querySelectorAll(myElems);

      if (target) {
        target.addEventListener('click', function (e) {
          if (e.target.checked == true) {
            elems.forEach(function (el) {
              el.checked = true;
            });
          } else {
            elems.forEach(function (el) {
              el.checked = false;
            });
          }
        });
      }
    };

    massChekedElems('.statistics__target-myInp', '.statistics__checked-myInp');
    massChekedElems('.statistics__target-myInp2', '.statistics__checked-myInp2');
    massChekedElems('.statistics__target-myInp3', '.statistics__checked-myInp3');
    massChekedElems('.statistics__target-myInp4', '.statistics__checked-myInp4');
    massChekedElems('.statistics__target-myInp5', '.statistics__checked-myInp5');
    massChekedElems('.statistics__target-myInp6', '.statistics__checked-myInp6');
    massChekedElems('.statistics__target-myInp7', '.statistics__checked-myInp7');
    massChekedElems('.statistics__target-myInp8', '.statistics__checked-myInp8');
    massChekedElems('.statistics__target-myInp9', '.statistics__checked-myInp9');
    massChekedElems('.statistics__target-myInp10', '.statistics__checked-myInp10');
  };

  myMassChekedElems(); // end Массовый cheked inp
  // Фиксирую блок "Выбор получателей сообщения" 

  var rightFull = document.querySelector('.newsletter__form-right-full');
  window.addEventListener('scroll', function (e) {
    if (rightFull) {
      if (window.pageYOffset > 500 && screen.width >= 991) {
        rightFull.classList.add('fixed-full');
      } else {
        rightFull.classList.remove('fixed-full');
      }
    }
  }); // end Фиксирую блок "Выбор получателей сообщения" 
  // Фиксация шапки

  var headerMenu = document.querySelector('.header__menu');
  var myHeader = document.querySelector('.header');
  window.addEventListener('scroll', function (e) {
    if (window.pageYOffset > 100 && screen.width >= 991) {
      headerMenu.classList.add('fixedMenu');
    } else {
      headerMenu.classList.remove('fixedMenu');
    }

    if (window.pageYOffset > 100 && screen.width < 991) {
      myHeader.classList.add('fixedMenu');
    } else {
      myHeader.classList.remove('fixedMenu');
    }
  });
}); // end Фиксации шапки

var tableBig15 = document.querySelector('.g-table-big15 > table > tbody');
var gCard9 = document.querySelector('.g-card9 > .g-card__row');
var myObj = {
  arr1: [0, 100, 100, 0, 100, 100],
  arr2: [2000, 2000, 1000, 2000, 2000, 1000],
  arr3: [0, 400, 100, 0, 400, 100],
  arr4: [0, 0, 300, 0, 0, 300],
  arrLab: ['30.09.2020', '31.09.2020', '31.09.2020', '30.09.2020', '31.09.2020', '31.09.2020']
};
var wrapArrObj = [{
  date: '30.09.2020',
  type: 'СМС',
  sentby: 2000,
  delivered: 2000,
  deliveredPercent: '100%',
  noStatusReceived: 0,
  noStatusReceivedPercent: '0%',
  undelivered: 0,
  undeliveredPercent: '0%',
  overdue: 0,
  overduePercent: '0%',
  writtenOff: '120.00'
}, {
  date: '31.09.2020',
  type: 'СМС',
  sentby: 2500,
  delivered: 2000,
  deliveredPercent: '75%',
  noStatusReceived: 400,
  noStatusReceivedPercent: '20%',
  undelivered: 100,
  undeliveredPercent: '5%',
  overdue: 0,
  overduePercent: '0%',
  writtenOff: '150.00'
}, {
  date: '31.09.2020',
  type: 'СМС',
  sentby: 1500,
  delivered: 1000,
  deliveredPercent: '75%',
  noStatusReceived: 100,
  noStatusReceivedPercent: '5%',
  undelivered: 100,
  undeliveredPercent: '5%',
  overdue: 300,
  overduePercent: '15%',
  writtenOff: '350.00'
}, {
  date: '30.09.2020',
  type: 'СМС',
  sentby: 2000,
  delivered: 2000,
  deliveredPercent: '100%',
  noStatusReceived: 0,
  noStatusReceivedPercent: '0%',
  undelivered: 0,
  undeliveredPercent: '0%',
  overdue: 0,
  overduePercent: '0%',
  writtenOff: '120.00'
}, {
  date: '31.09.2020',
  type: 'СМС',
  sentby: 2500,
  delivered: 2000,
  deliveredPercent: '75%',
  noStatusReceived: 400,
  noStatusReceivedPercent: '20%',
  undelivered: 100,
  undeliveredPercent: '5%',
  overdue: 0,
  overduePercent: '0%',
  writtenOff: '150.00'
}, {
  date: '31.09.2020',
  type: 'СМС',
  sentby: 1500,
  delivered: 1000,
  deliveredPercent: '75%',
  noStatusReceived: 100,
  noStatusReceivedPercent: '5%',
  undelivered: 100,
  undeliveredPercent: '5%',
  overdue: 300,
  overduePercent: '15%',
  writtenOff: '350.00'
}];
wrapArrObj.forEach(function (elem) {
  unlObj(elem);
});

function unlObj(obj) {
  if (obj && tableBig15) {
    tableBig15.innerHTML += "\n\t\t<tr class=\"tableBig15__tr\">\n\t\t\t<td>".concat(obj.date, "</td>\n\t\t\t<td>").concat(obj.sentby, "</td>\n\t\t\t<td>").concat(obj.delivered, "/").concat(obj.deliveredPercent, "</td>\n\t\t\t<td>").concat(obj.noStatusReceived, "/").concat(obj.noStatusReceivedPercent, "</td>\n\t\t\t<td>").concat(obj.undelivered, "/").concat(obj.undeliveredPercent, "</td>\n\t\t\t<td>").concat(obj.overdue, "/").concat(obj.overduePercent, "</td>\n\t\t\t<td>").concat(obj.writtenOff, "</td>\n\t\t</tr>\n\t");
    gCard9.innerHTML += "\n\t\t<div class=\"g-card__column\">\n\t\t\t<div class=\"g-card__item\">\n\t\t\t\t<div class=\"g-card4__date g-card4-elem\">\n\t\t\t\t\t<div class=\"g-card4__date-value\">\n\t\t\t\t\t\t<p>".concat(obj.date, "</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"g-card4__date-dates\">\n\t\t\t\t\t\t<p>").concat(obj.type, "</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"g-card4__status g-card4-elem\">\n\t\t\t\t\t<div class=\"g-card4__status-stat\">\n\t\t\t\t\t\t<p>\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"g-card4__info-value\">\n\t\t\t\t\t\t<p>").concat(obj.sentby, "</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"g-card4__status g-card4-elem g-card9__delivered bg\">\n\t\t\t\t\t<div class=\"g-card4__status-stat\">\n\t\t\t\t\t\t<p>\u0414\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043E</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"g-card4__info-value\">\n\t\t\t\t\t\t<p>").concat(obj.delivered, "/").concat(obj.deliveredPercent, "</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"g-card4__status g-card4-elem g-card9__notReceived\">\n\t\t\t\t\t<div class=\"g-card4__status-stat\">\n\t\t\t\t\t\t<p>\u041D\u0435 \u043F\u043E\u043B\u0443\u0447\u0435\u043D \u0441\u0442\u0430\u0442\u0443\u0441</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"g-card4__info-value\">\n\t\t\t\t\t\t<p>").concat(obj.noStatusReceived, "/").concat(obj.noStatusReceivedPercent, "</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"g-card4__status g-card4-elem g-card9__undelivered bg\">\n\t\t\t\t\t<div class=\"g-card4__status-stat\">\n\t\t\t\t\t\t<p>\u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043E</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"g-card4__info-value\">\n\t\t\t\t\t\t<p>").concat(obj.undelivered, "/").concat(obj.undeliveredPercent, "</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"g-card4__status g-card4-elem g-card9__overdue\">\n\t\t\t\t\t<div class=\"g-card4__status-stat\">\n\t\t\t\t\t\t<p>\u041F\u0440\u043E\u0441\u0440\u043E\u0447\u0435\u043D\u043E</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"g-card4__info-value\">\n\t\t\t\t\t\t<p>").concat(obj.overdue, "/").concat(obj.overduePercent, "</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"g-card4__status g-card4-elem bg\">\n\t\t\t\t\t<div class=\"g-card4__info-name\">\n\t\t\t\t\t\t<p>\u0421\u043F\u0438\u0441\u0430\u043D\u043E</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"g-card4__status-value\">\n\t\t\t\t\t\t<p class=\"rub rubBold\">").concat(obj.writtenOff, " </p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t");
  }
}

var tableBig15__tr = document.querySelectorAll('.tableBig15__tr');
tableBig15__tr.forEach(function (el, i) {
  if (i % 2 != 0) {
    el.classList.add('bg');
  }
}); //
// [
// 	{
// 		label: 'Категория',
// 		backgroundColor: 'red',
// 		data: [
// 		]
// 	}
// ]

$(document).ready(function () {
  $('.gettingIt__form').submit(function (e) {
    e.preventDefault();
    var localStor = JSON.parse(localStorage.getItem('myKey'));
    console.log(localStor);

    if (localStor) {
      for (var i = 0; i < localStor.length; i++) {
        $(this).append($('<input type="hidden" name="set_phone[' + i + ']" value="' + localStor[i] + '">'));
      }
    }

    var $form = $(this);
    $.ajax({
      type: "POST",
      url: 'web/server.php',
      data: $form.serialize(),
      success: function success(data) {
        console.log(data);
      },
      error: function error(_error) {
        console.log('Ошибка');
      }
    });
  });
  var myArrNumber = []; // console.log(myArrNumber)

  function iframeModals(myNameModal, myTargetModal, myNamePage, myClassFrame, footrest) {
    var layer = $(footrest),
        modal = $(myNameModal),
        modalContent = "<iframe class=\"".concat(myClassFrame, "\" src=\"").concat(myNamePage, "\"></iframe>");

    if (myTargetModal) {
      $(myTargetModal).click(function (e) {
        e.preventDefault();
        var myArrNumber = [];
        localStorage.setItem('myKey', JSON.stringify(myArrNumber));
        layer.show();
        document.body.style.overflow = 'hidden';
        modal.show().animate({}, function () {
          $(this).html(modalContent);

          document.querySelector('.' + "".concat(myClassFrame)).onload = function () {
            var iframe = document.querySelector('.' + "".concat(myClassFrame));
            var iframeWindow = iframe.contentWindow;
            var iframeContent = iframeWindow.$('.popup__close');
            var myHeader = iframeWindow.$('.header');
            myHeader.hide();
            var header__showLBlock = iframeWindow.$('.header__showLBlock');
            header__showLBlock.hide();
            iframeContent.click(function () {
              modal.fadeOut('slow', function () {
                $(this).html('');
                layer.fadeOut('fast');
                document.body.style.overflow = '';
              });
            }); // let content = iframeWindow.$('.content');
            // content.addClass('backgroundBlackout');

            var popup__contentIf2 = iframeWindow.$('.cl');
            console.log(popup__contentIf2);
            popup__contentIf2.click(function (event) {
              modal.fadeOut('slow', function () {
                $(this).html('');
                layer.fadeOut('fast');
                document.body.style.overflow = '';
              });
            });
            iframeWindow.$('.statistics__checked-myInp').click(function (event) {
              if ($(this).prop('checked')) {
                console.log($(this).val());
                myArrNumber.push($(this).val());
                localStorage.setItem('myKey', JSON.stringify(myArrNumber));
              } else {
                var ind = $.inArray($(this).val(), myArrNumber);
                myArrNumber.splice(ind, 1);
                localStorage.setItem('myKey', JSON.stringify(myArrNumber));
              }
            });
            iframeWindow.$('.statistics__target-myInp').click(function (event) {
              if ($(this).prop('checked')) {
                myArrNumber = []; // console.log('Чекнул все')

                iframeWindow.$('.statistics__checked-myInp').each(function (i, el) {
                  myArrNumber.push($(this).val());
                  localStorage.setItem('myKey', JSON.stringify(myArrNumber));
                });
              } else {
                // console.log('Отчекнул все')
                myArrNumber = [];
                localStorage.setItem('myKey', JSON.stringify(myArrNumber));
              }
            }); // console.log(tr)
          };
        });
      });
    }

    if (layer) {
      layer.click(function () {
        modal.fadeOut('slow', function () {
          $(this).html('');
          layer.fadeOut('fast');
          document.body.style.overflow = '';
        });
      });
    } // console.log(layer)


    document.addEventListener('keyup', function (e) {
      if (e.key == 'Escape') {
        modal.fadeOut('slow', function () {
          $(this).html('');
          layer.fadeOut('fast');
          document.body.style.overflow = '';
        });
        console.log(myArrNumber);
      }
    });
  }

  iframeModals('.myModal1', '.modal1__target', 'myModalElem1.html', 'frame1', '.layer1');
  iframeModals('.myModal2', '.databaseManagement__modalTarget', 'myModalElem2.html', 'frame2', '.layer2');
  iframeModals('.myModal3', '.databaseManagement__bazes-modalTarget', 'myModalElem3.html', 'frame3', '.layer3');
  iframeModals('.myModal4', '.listSubNewBase__numberModalTarget', 'myModalElem4.html', 'frame4', '.layer4');
  iframeModals('.myModal4', '.popu4__targetIconTable', 'myModalElem4.html', 'frame4', '.layer4');
  iframeModals('.myModal4', '.g-card7__btn-el', 'myModalElem4.html', 'frame4', '.layer4');
  iframeModals('.myModal5', '.listSubNewBase__xlsModalTarget', 'myModalElem5.html', 'frame5', '.layer5');
  iframeModals('.myModal6', '.listSubNewBase__xlsModalTarget2', 'myModalElem6.html', 'frame6', '.layer6');
  iframeModals('.myModal7', '.listSubNewBase__settings-link', 'myModalElem7.html', 'frame7', '.layer7');
  iframeModals('.myModal8', '.registerOfSenderNames__btnModalTarget', 'myModalElem8.html', 'frame8', '.layer8');
  iframeModals('.myModal9', '.listSubNewBase__numberModalTarget2', 'myModalElem9.html', 'frame9', '.layer9');
  iframeModals('.myModal10', '.attachDocumentTargetModal', 'myModalElem10.html', 'frame10', '.layer10');
  iframeModals('.myModal11', '.templates__TargetModal', 'myModalElem11.html', 'frame11', '.layer11');
  iframeModals('.myModal13', '.templates__TargetModalVk', 'myModalElem13.html', 'frame13', '.layer13');
  iframeModals('.myModal14', '.issuedInvoices-modalTarget', 'myModalElem14.html', 'frame14', '.layer14');
  iframeModals('.myModal14', '.phone-bodyText', 'myModalElem14.html', 'frame14', '.layer14');
  iframeModals('.myModal12', '.inboxSettings__targetModal', 'myModalElem12.html', 'frame12', '.layer12');
  var ctx = document.getElementById("myChart");

  if (ctx) {
    ctx.getContext('2d');
  }

  if (ctx) {
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: myObj.arrLab,
        datasets: [{
          label: 'Недоставленные',
          backgroundColor: "#305BAF",
          data: myObj.arr1
        }, {
          label: 'Доставленные',
          backgroundColor: "#29A6CE",
          data: myObj.arr2
        }, {
          label: 'В процессе доставки',
          backgroundColor: "#D1D35C",
          data: myObj.arr3
        }, {
          label: 'Просрочено',
          backgroundColor: "#EC744E",
          data: myObj.arr4
        }]
      },
      options: {
        tooltips: {
          displayColors: true,
          callbacks: {
            mode: 'x'
          }
        },
        scales: {
          xAxes: [{
            stacked: true,
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true
            },
            type: 'linear'
          }]
        },
        responsive: true,
        maintainAspectRatio: false,
        // legend: { position: 'bottom' },
        legend: {
          display: false
        }
      }
    });
    document.getElementById('legend').innerHTML = myChart.generateLegend();
  }

  var $range = $(".js-range-slider");
  var $input = $(".block__range-wrap > input");
  var instance;
  var min = 0;
  var max = 2000;
  $range.ionRangeSlider({
    skin: "round",
    type: "single",
    min: min,
    max: max,
    from: 500,
    onStart: function onStart(data) {
      $input.prop("value", data.from);
    },
    onChange: function onChange(data) {
      $input.prop("value", data.from);
    }
  });
  instance = $range.data("ionRangeSlider");
  $input.on("input", function () {
    var val = $(this).prop("value"); // validate

    if (val < min) {
      val = min;
    } else if (val > max) {
      val = max;
    }

    instance.update({
      from: val
    });
  });
  var ddData = [{
    text: "Выберите тип",
    value: 0,
    selected: false,
    description: "",
    imageSrc: ""
  }, {
    text: "Viber",
    value: 1,
    selected: false,
    description: "",
    imageSrc: "web/images/content/2.svg"
  }, {
    text: "SMS",
    value: 2,
    selected: false,
    description: "",
    imageSrc: "web/images/content/1.svg"
  }, {
    text: "ВКОНТАКТЕ",
    value: 3,
    selected: false,
    description: "",
    imageSrc: "web/images/content/3.svg"
  }];
  $('.demo-basic').each(function () {
    $(this).ddslick({
      data: ddData,
      defaultSelectedIndex: 0,
      width: 150,
      imagePosition: "left",
      onSelected: function onSelected(data) {
        // Возвращаем в дефолт
        $('.dd-options').children('li').css({
          'display': 'flex'
        });
        $('.dd-options').each(function () {
          var li = $(this).children('li');
          selectChange().forEach(function (elem) {
            return elem !== '0' ? li[elem].style.display = 'none' : false;
          });
        });
      }
    });
  });

  function selectChange() {
    var arr = [];
    $('.dd-selected-value').each(function () {
      arr.push($(this).val());
    });
    return arr;
  }

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
  });
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
    var flag = true;
    txt.val(txt.val() + $(this).attr('data-number'));
    transElem.val(rus_to_latin(txt.val()));
    var str = txt.val();

    if (/^([а-яА-ЯёЁ\w\s,.?!:; ]*)$/.test(str)) {
      // console.log('В поле только кириллица')
      flag = false; // lengthSMS.innerHTML = countSms($(this).val().length, 70)
      // if ($(this).val().length > 70) {
      // 	lengthSMS.innerHTML = Math.ceil($(this).val().length / 67);
      // }
    }

    if (/^([a-zA-Z\w\s,.?!:; ]*)$/.test(str)) {
      // console.log('В поле только латиница')
      flag = true; // lengthSMS.innerHTML = countSms($(this).val().length, 160)
      // if ($(this).val().length > 160) {
      // 	lengthSMS.innerHTML = Math.ceil($(this).val().length / 153);
      // }
    }

    if (/^([\%&#@])*$/.test(str)) console.log('В поле недопустимые символы'); //если нужно запретить ввод определёных символов

    this.value = str.replace(/[\%&@]/g, '');
    lengthLetters.innerHTML = txt.val().length;

    if (flag) {
      lengthSMS.innerHTML = countSms(txt.val().length, 160);

      if ($(this).val().length > 160) {
        lengthSMS.innerHTML = countSms(txt.val().length, 153);
      }
    } else {
      lengthSMS.innerHTML = countSms(txt.val().length, 70);

      if ($(this).val().length > 70) {
        lengthSMS.innerHTML = countSms(txt.val().length, 67);
      }
    }

    translengthLetters.innerHTML = transElem.val().length;
    transLengthSMS.innerHTML = countSms(transElem.val().length, 160);
  });
  $('.txt').on('input', function (e) {
    var dataText = $(this).attr('data-txt');
    var txtValue = $(this).val();
    var transElem = $("[data-txtTrans=\"".concat(dataText, "\"]"));
    transElem.val(rus_to_latin(txtValue));
    var str = this.value; // console.log(str)

    if (/^([а-яА-ЯёЁ\w\s,.?!:; ]*)$/.test(str)) {
      console.log(str); // console.log('В поле только кириллица')

      lengthSMS.innerHTML = countSms($(this).val().length, 70);

      if ($(this).val().length > 70) {
        lengthSMS.innerHTML = Math.ceil($(this).val().length / 67);
      }
    }

    if (/^([a-zA-Z\w\s,.?!:; ]*)$/.test(str)) {
      // console.log('В поле только латиница')
      lengthSMS.innerHTML = countSms($(this).val().length, 160);

      if ($(this).val().length > 160) {
        lengthSMS.innerHTML = Math.ceil($(this).val().length / 153);
      }
    }

    if (/^([\%&#@])*$/.test(str)) console.log('В поле недопустимые символы'); //если нужно запретить ввод определёных символов

    this.value = str.replace(/[\%&#@]/g, ''); //если нужно запретить ввод определёных символов

    lengthLetters.innerHTML = transElem.val().length; // lengthSMS.innerHTML = countSms($(this).val().length, 70)

    translengthLetters.innerHTML = transElem.val().length;
    transLengthSMS.innerHTML = countSms(transElem.val().length, 160);
  });
  $('[data-number2]').on('click', function (e) {
    e.preventDefault();
    var parentElem2 = $(this).closest('.newsletter__form-text2');
    var txt2 = parentElem2.find('.txt2');
    var dataText2 = txt2.attr('data-txt2');
    var transElem2 = $("[data-txtTrans2=\"".concat(dataText2, "\"]"));
    var flag = true;
    txt2.val(txt2.val() + $(this).attr('data-number2'));
    transElem2.val(rus_to_latin(txt2.val()));
    var str = txt2.val();

    if (/^([а-яА-ЯёЁ\w\s,.?!:; ]*)$/.test(str)) {
      // console.log('В поле только кириллица')
      flag = false; // lengthSMS.innerHTML = countSms($(this).val().length, 70)
      // if ($(this).val().length > 70) {
      // 	lengthSMS.innerHTML = Math.ceil($(this).val().length / 67);
      // }
    }

    if (/^([a-zA-Z\w\s,.?!:; ]*)$/.test(str)) {
      // console.log('В поле только латиница')
      flag = true; // lengthSMS.innerHTML = countSms($(this).val().length, 160)
      // if ($(this).val().length > 160) {
      // 	lengthSMS.innerHTML = Math.ceil($(this).val().length / 153);
      // }
    }

    if (/^([\%&@])*$/.test(str)) console.log('В поле недопустимые символы'); //если нужно запретить ввод определёных символов

    this.value = str.replace(/[\%&@]/g, '');
    lengthLetters2.innerHTML = txt2.val().length;

    if (flag) {
      lengthSMS2.innerHTML = countSms(txt2.val().length, 160);

      if ($(this).val().length > 160) {
        lengthSMS2.innerHTML = countSms(txt2.val().length, 153);
      }
    } else {
      lengthSMS2.innerHTML = countSms(txt2.val().length, 70);

      if ($(this).val().length > 70) {
        lengthSMS2.innerHTML = countSms(txt2.val().length, 67);
      }
    }

    translengthLetters2.innerHTML = transElem2.val().length;
    transLengthSMS2.innerHTML = countSms(transElem2.val().length, 160);
  });
  $('.txt2').on('input', function (e) {
    var dataText2 = $(this).attr('data-txt2');
    var txtValue2 = $(this).val();
    var transElem2 = $("[data-txtTrans2=\"".concat(dataText2, "\"]"));
    transElem2.val(rus_to_latin(txtValue2));
    var str = this.value;

    if (/^([а-яА-ЯёЁ\w\s,.?!:; ]*)$/.test(str)) {
      // console.log('В поле только кириллица')
      lengthSMS2.innerHTML = countSms($(this).val().length, 70);

      if ($(this).val().length > 70) {
        lengthSMS2.innerHTML = Math.ceil($(this).val().length / 67);
      }
    }

    if (/^([a-zA-Z\w\s,.?!:; ]*)$/.test(str)) {
      // console.log('В поле только латиница')
      lengthSMS2.innerHTML = countSms($(this).val().length, 160);

      if ($(this).val().length > 160) {
        lengthSMS2.innerHTML = Math.ceil($(this).val().length / 153);
      }
    }

    if (/^([\%&@])*$/.test(str)) {
      // console.log('В поле недопустимые символы')
      this.value = str.replace(/[\%&@]/g, '');
    } //если нужно запретить ввод определёных символов


    lengthLetters2.innerHTML = $(this).val().length; // lengthSMS2.innerHTML = countSms($(this).val().length, 170)

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