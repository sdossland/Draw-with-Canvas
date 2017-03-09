/**
 * Created by sophia on 3/9/17.
 */
document.addEventListener("DOMContentLoaded", function () {

  const canvas = document.querySelector('.board');
  const context = canvas.getContext('2d'); //returns a drawing context on a canvas
  context.strokeStyle = '#00522c'; //sets the color of the strokes
  context.lineJoin = 'round'; //sets the style for when two lines meet
  context.lineCap = 'round'; //sets the style for the start and end caps of a line

  let drawing = false; //initial value, that changes to true upon 'mousedown'
  let lastX = 0;
  let lastY = 0;

  function draw(e) {
    if (!drawing) { //kills the function if not drawing
      return;
    }
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(e.offsetX, e.offsetY);
  }


  canvas.addEventListener('mousemove', draw);
  //on click initiate drawing
  canvas.addEventListener('mousedown', function() {
    return drawing = true;
  });
  //stop drawing upon release
  canvas.addEventListener('mouseup', function() {
    return drawing = false;
  });
  //stop drawing when cursor leaves canvas
  canvas.addEventListener('mouseout', function() {
    return drawing = false;
  });


});