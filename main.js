function setup(){
canvas = createCanvas(380,380)
canvas.center()

}


video = "";
status = "";
objects = [];

function preload(){
    video = createVideo("video.mp4")
    video.hide()
}

function draw(){

    image(video, 0 , 0, 380,380)
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (let i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected"
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected : "+ objects.length;
            

            fill("teal")
            percent = floor(objects[i].confidence + 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("teal")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

    }
}

function gotResult(error, results){
    if (error) {
        console.log(error)
    } else {
        console.log(results)
        objects = results;
    }
}

function start(){

objectDetector = ml5.objectDetector("cocossd", modalLoaded)
document.getElementById("status").innerHTML = "Status : Detecting Objects"

}

function modalLoaded(){
    console.log("!x! Modal has loaded !x!")
    status = true;

    video.loop();
    video.speed(1);
    video.volume(0)
}

