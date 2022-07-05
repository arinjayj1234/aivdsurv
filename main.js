video = '';

function preload(){
  video = createVideo('video.mp4');
  video.hide();
}

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw(){
    image(video, 0, 0, 480, 380);

    if (status != ''){
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById('status').innerHTML = 'Object Detected';
            document.getElementById('noo').innerHTML = 'Objects Detected: ' + objects.length;

            fill('#2596be');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + ' ' + percent + '%', objects[i].x + 15, objects[i].y + 15);
            nofill();
            stroke('#2596be');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResult(error, results){
    if (error){
        console.log(error);
    }

    console.log(results);
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = 'Detecting Object...';
}

function modelLoaded(){
    console.log('--------------m--o-----d-------e--l------------------------------------------------------------loaded');
    status = true;

    video.loop();
    video.speed(1);
    video.volume(1);
}