window.addEventListener('load', function () {
     //ANCHOR Carousel Stages
     var carouselStages = new Glider(document.querySelector('.glider-stages'), {
          slidesToShow: 4,
          slidesToScroll: 2,
          draggable: true,
          dots: '.dots-stages',
          arrows: {
               prev: '.glider-prev-stages',
               next: '.glider-next-stages'
          }
     });


     document.getElementById('confimar-stages').addEventListener('click', function () {
          var selecionados = $('.btn-select-stage.selected');

          var remover = $('#stages-selecionados').find('.remover');
          remover.each(function (i, stage){
               carouselStages.removeItem(0);
          });

          selecionados.each(function (i, stage) {
               var ele = document.getElementById('add').cloneNode(true);

               ele.querySelector('div').textContent = $(stage).find('.stage-name').html();
               $(ele).find('.stage').attr('src',$(stage).find('.stage').attr('src'));
               $(ele).removeClass('d-none');



               carouselStages.addItem(ele);
          });
     });



     //ANCHOR Carousel Colors
     new Glider(document.querySelector('.glider-colors'), {
          // Mobile-first defaults
          slidesToShow: 1,
          slidesToScroll: 1,
          draggable: true,
          dots: '.dots-colors',
          arrows: {
               prev: '.glider-prev-colors',
               next: '.glider-next-colors'
          },
          responsive: [
               {
                    // screens greater than >= 775px
                    breakpoint: 775,
                    settings: {
                         // Set to `auto` and provide item width to adjust to viewport
                         slidesToShow: 'auto',
                         slidesToScroll: 'auto',
                         itemWidth: 150,
                         duration: 0.25
                    }
               }
          ]
     });

     //ANCHOR Modal Characters

     var i = 1;
     var char = "";
     var charQtd = 81

     while (i <= charQtd) {
          var div;
          var num = '0';
          if (i > 9)
               num = '';
          char += `
          <div class="card-view p-1 m-1 col-auto" style="width: 60px; height: 60px;">
               <button type="button" class="rounded-circle btn p-0 btn-character"
                    style="background-color: #FF0100; width: 50px; height: 50px; border:2px solid #3c3c3c"
                    data-bs-dismiss="modal">
                         <img src="Svgs/char/ic_char_${num + i}.svg" height="100%">
               </button>
          </div>`;

          if (i % 6 == 0) {
               div = '<div class="row">' + char + '</div>';
               $('#glider-char').append($(div));
               char = '';
          }
          else if (i == charQtd) {
               div = '<div class="row">' + char + '</div>';
               $('#glider-char').append($(div));
               char = '';
          }

          i++;
     }

     var modalChar = document.getElementById('modalChar')
     modalChar.addEventListener('shown.bs.modal', function (event) {
          // Button that triggered the modal
          var button = event.relatedTarget
          // Extract info from data-bs-* attributes
          var player = button.getAttribute('data-bs-player')

          //ANCHOR Carousel Characters
          new Glider(document.querySelector('.glider-char'), {
               // Mobile-first defaults
               slidesToShow: 'auto',
               slidesToScroll: 'auto',
               itemWidth: 150,
               draggable: true,
               dots: '.dots-char',
               arrows: {
                    prev: '.glider-prev-char',
                    next: '.glider-next-char'
               }
          });

          var btns = $('.btn-character');
          btns.each(function (i, btn) {
               $(btn).attr('onclick', 'selecionarChar(this, \'' + player + '\')')
          });
     })

     var modalStage = document.getElementById('modalStage')
     modalStage.addEventListener('shown.bs.modal', function () {

          //ANCHOR Carousel Select Stages
          new Glider(document.querySelector('.glider-select-stage'), {
               slidesToShow: 4,
               slidesToScroll: 2,
               draggable: true,
               dots: '.dots-select-stage',
               arrows: {
                    prev: '.glider-prev-select-stage',
                    next: '.glider-next-select-stage'
               }
          });
     })
     modalStage.addEventListener('hidden.bs.modal', function (event) {
          var btns = $('.btn-select-stage')
          btns.each(function (i, btn) {
               $(btn).css('background-color', '#EFEFEF').css('color', '#292929')
               $(btn).find('.stage').css('filter', 'invert(10%) sepia(0%) saturate(0%) hue-rotate(230deg) brightness(94%) contrast(83%)')
               $(btn).find('.stage-selected').addClass('d-none').removeClass('d-inline')
               $(btn).removeClass('selected')
          });
     })
})

function selecionarChar(button, player) {
     $('#' + player).attr('src', $(button).children('img').attr('src'));
}

function selecionarCor(button) {
     $('.selected-color').removeClass('d-block').addClass('d-none');
     $(button).find('.selected-color').removeClass('d-none').addClass('d-block');

     $('#selected-color').css('background-color', $(button).css('background-color'));
}

function selecionarStage(button) {
     $(button).toggleClass('selected')
     if ($(button).hasClass('selected')) {
          $(button).css('background-color', '#292929').css('color', '#EFEFEF')
          $(button).find('.stage').css('filter', 'invert(98%) sepia(2%) saturate(1205%) hue-rotate(187deg) brightness(117%) contrast(87%)')
          $(button).find('.stage-selected').toggleClass('d-none d-inline')
     }
     else {
          $(button).css('background-color', '#EFEFEF').css('color', '#292929')
          $(button).find('.stage').css('filter', 'invert(10%) sepia(0%) saturate(0%) hue-rotate(230deg) brightness(94%) contrast(83%)')
          $(button).find('.stage-selected').toggleClass('d-none d-inline')
     }
}

//ANCHOR Auto Height in TextArea
jQuery.fn.extend({
     autoHeight: function () {
          function autoHeight_(element) {
               return jQuery(element).css({
                    'height': 'auto',
                    'overflow-y': 'hidden'
               }).height(element.scrollHeight);
          }
          return this.each(function () {
               autoHeight_(this).on('input', function () {
                    autoHeight_(this);
               });
          });
     }
});
$('#anotacao').autoHeight();

//ANCHOR Automatic Date
var options = {
     weekday: 'long',
     day: 'numeric',
     month: 'numeric',
     year: 'numeric',
     hour: 'numeric',
     minute: 'numeric'
}
document.getElementById('date').innerHTML = new Intl.DateTimeFormat('pt-BR', options).format(new Date);