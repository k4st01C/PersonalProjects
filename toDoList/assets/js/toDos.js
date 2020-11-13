const appendToDo = function () {
  $('ul').append(
    `<li><span><i class="far fa-trash-alt"></i></span>${$('input').val()}</li>`,
  );
};

$('h1 > span').on('click', function(){
  $('input').fadeToggle()
});

$('input[type="text"]').keypress(function (e) {
  if (e.which === 13) appendToDo();
});

$('ul').on('click','li  > span', function (e) {
  $(this).parent().remove();
  e.stopPropagation();
});

$('ul').on('click','li', function () {
  $(this).toggleClass('done');
});
