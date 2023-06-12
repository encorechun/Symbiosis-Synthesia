let song, fft, fr, playing, a, b;
let layer;

function preload() {
  song = loadSound("PlantWave_Dry.mp3");
  playing = false;
  song.onended(() => {
    playing = false;
    document.getElementById("audio").innerText = "Play";
    a = 0;
  });
  fr = 60;
}

function setup() {
  createCanvas(500, 500);
  layer = createGraphics(width, height);
  colorMode(HSB);
  background(0);
  fft = new p5.FFT(0, 256);
  a = 360 / (song.duration() * fr);
  b = a;
  frameRate(fr);
}

function draw() {
  background(0);
  layer.noFill();
  layer.colorMode(HSB);
  let spectrumA = fft.analyze();
  let spectrumB = spectrumA.reverse();
  spectrumB.splice(0, 40);
  push();
  translate(250, 250);
  noFill();
  beginShape();
  for (let i = 0; i < spectrumB.length; i++) {
    let amp = spectrumB[i];
    let x = map(amp, 0, 256, -2, 2);
    let y = map(i, 0, spectrumB.length, 30, 215);
    let hue = map(i, 0, spectrumB.length, 0, 255);
    stroke(hue, 255, 255);
    vertex(x, y);
  }
  endShape();
  pop();
  push();
  translate(width / 2, height / 2);
  rotate(radians(a));
    layer.push();
  layer.translate(width / 2, height / 2);
  layer.rotate(radians(-a));
  for (let i = 0; i < spectrumB.length; i++) {
    let hue = map(i, 0, spectrumB.length, 0, 255);
    let saturation = map(spectrumB[i], 0, 256, 100, 255);
    let brightness = map(spectrumB[i], 0, 256, 255, 100);
    layer.strokeWeight(0.018 * spectrumB[i]);
    layer.stroke(hue, saturation, brightness, 50);
    layer.line(0, i, 0, i);
  }
  layer.pop();
  image(layer, -width / 2, -height / 2);
  pop();
  if (playing) {
    a += b;
  }
}

function toggleAudio() {
  if (!playing) {
    song.play();
    console.log("playing");
    document.getElementById("audio").innerText = "Pause";
  } else {
    song.pause();
    console.log("paused");
    document.getElementById("audio").innerText = "Play";
  }
  playing = !playing;
}


  