prediction = ""

Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});

cam = document.getElementById("cam")

Webcam.attach("cam")

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src=" ' +data_uri+ '"/> ';
    });
    
    console.log('ml5 version:' , ml5.version);

    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/pgwSg9UeF/model.json' , modelLoaded);
    
}

function modelLoaded() 
{
    console.log('Model Loaded!!');
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if (error) {
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "Bad job")
        {
            document.getElementById("update_text").innerHTML = "👎";
        }
        if(results[1].label == "Good job")
        {
            document.getElementById("update_text").innerHTML = "👍";
        }
        if(results[2].label == "Nice")
        {
            document.getElementById("update_text").innerHTML = "👌";
        }
        if(results[3].label == "Swag")
        {
            document.getElementById("update_text").innerHTML = "🤟";
        }
        if(results[4].label == "Victory")
        {
            document.getElementById("update_text").innerHTML = "✌";
        }
    }
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data = "The prediction is " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}