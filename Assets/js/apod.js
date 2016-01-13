// api call
var url = "https://api.nasa.gov/planetary/apod?api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";

$.ajax({
    url: url,
    success: handleResult
});
function handleResult(result){
    if("copyright" in result) {
        $("#copyright").text("Image Credits: " + result.copyright);
    }
    else {
        $("#copyright").text("Image Credits: " + "Public Domain");
    }

    if(result.media_type == "video") {
        $("#apod_img_id").css("display", "none");
        $("#apod_vid_id").attr("src", result.url);
    }
    else {
        $("#apod_vid_id").css("display", "none");
        $("#apod_img_id").attr("src", result.url);
    }
    $("#reqObject").text(url);
    $("#returnObject").text(JSON.stringify(result, null, 4));
    $("#apod_explaination").text(result.explanation);
    $("#apod_title").text(result.title);
}