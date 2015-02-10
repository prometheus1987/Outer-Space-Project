$(document).ready(function() {
  $('#particles').particleground({
    dotColor: '#c0392b',
    lineColor: '#c0392b',
    particleRadius: 7,
    lineWidth: 1,
    proximity: 130
  });
  $('.intro').css({
    'margin-top': -($('.intro').height() / 2)
  });
});