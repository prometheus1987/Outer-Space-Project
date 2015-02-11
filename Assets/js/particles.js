$(document).ready(function() {
  $('#particles').particleground({
    dotColor: 'rgba(255, 000, 255, 0.5)',
    lineColor: 'rgba(255, 000, 255, 0.5)',
    particleRadius: 7,
    lineWidth: 1,
    directionX: 'center',
    directionY: 'center',
    curvedLines: true,
    parallax: true,
    parallaxMultiplier: 5,
    proximity: 200
  });
  $('.intro').css({
    'margin-top': -($('.intro').height() / 2)
  });
});