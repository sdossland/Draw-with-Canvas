/**
 * Created by sophia on 3/9/17.
 */
document.addEventListener("DOMContentLoaded", function () {

  const canvas = document.querySelector('.board');
  const context = canvas.getContext('2d'); //returns a drawing context on a canvas

  let drawing = false; //initial value, that changes to true upon 'mousedown'
  //defines starting coordinates
  let startX = 0;
  let startY = 0;

  //line specifics
  let lineWidth = 30; //initial width
  let lineWidthDescending = true; //
  let hue = 0; //variable color to be applied
  context.lineJoin = 'round'; //sets the style for when two lines meet
  context.lineCap = 'round'; //sets the style for the start and end caps of a line

  function lineWidthControl() {
    if (lineWidthDescending) {
      if (lineWidth > 5) {
        lineWidth -= 0.2;
      } else {
        lineWidthDescending = !lineWidthDescending;
      }
    } else if (!lineWidthDescending) {
      if (lineWidth < 30) {
        lineWidth += 0.2;
      } else {
        lineWidthDescending = !lineWidthDescending;
      }
    }
  }

  function draw(e) {
    if (!drawing) { //kills the function if not drawing
      return;
    }
    context.beginPath();
    context.moveTo(startX, startY); //sets a start position but does NOT create a line
    context.lineTo(e.offsetX, e.offsetY); //creates a line from last specified pt to this pt, but does NOT draw line
    context.stroke(); //draws the line
    context.strokeStyle = `hsl(${hue}, 100%, 50%)`; //sets the color of the strokes
    context.lineWidth = `${lineWidth}`; //sets the width of the strokes

    //keeps resetting the start coordinates to allow for a long, curvy line
    startX = e.offsetX;
    startY = e.offsetY;

    lineWidthControl(); //change the line width with each new set of coordinates

    hue++; //increases the hue with every new coordinate to achieve full spectrum
    //once full spectrum is reached (aka 360), reset to 0 to start spectrum over
    if (hue == 360) {
      hue = 0;
    }

  }



  //on click initiate drawing and capture start coordinates
  canvas.addEventListener('mousedown', (e) => {
      drawing = true;
      startX = e.offsetX;
      startY = e.offsetY;
  });
  //draws line while moving mouse
  canvas.addEventListener('mousemove', draw);
  //stop drawing upon release
  canvas.addEventListener('mouseup', function() {
    return drawing = false;
  });
  //stop drawing when cursor leaves canvas
  canvas.addEventListener('mouseout', function() {
    return drawing = false;
  });

});