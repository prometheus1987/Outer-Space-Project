// explore controller
CosmosApp.controller('ExploreController', function($scope, $http) {

    // load particles JSON
    particlesJS.load('particles-js', 'assets/particles.json', function() {
        console.log('callback - particles.js config loaded');
    });

    // api call for nasa apod
    var url = "https://api.nasa.gov/planetary/apod?";
    var key = "api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";

    $.ajax({
        url: url + key,
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
        $("#explaination").text(result.explanation);
        $("#title").text(result.title);
    }
});

CosmosApp.controller('MarsController', function($scope, $http) {

    // mars rover camera
    var baseUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/Curiosity/photos?earth_date=2016-10-19";
    var key = "&api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";
    $.ajax({
        url: baseUrl + key,
        success: handleResult
    });
    function handleResult(result) {
        console.log(result.photos);
        $("#img").attr("src", result.photos[0].img_src);
        $("#camera_full_name").text(result.photos[0].camera.full_name)
        $("#earth_date").text(result.photos[0].earth_date);
        $("#rover_name").text(result.photos[0].rover.name);
    }
});
// art controller
CosmosApp.controller('artController', function($scope) {
    $scope.message = 'Original Artwork';
    $scope.slides = [
        {image: 'assets/images/Om.jpg', description: 'Om'},
        {image: 'assets/images/atalanta.jpg', description: 'Atalanta'},
        {image: 'assets/images/founders.jpg', description: 'Founders'}
    ];

    $scope.currentIndex = 0;
    $scope.setCurrentSlideIndex = function (index) {
        $scope.currentIndex = index;
    };

    $scope.isCurrentSlideIndex = function (index) {
        return $scope.currentIndex === index;
    };

    $scope.prevSlide = function () {
        $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
    };

    $scope.nextSlide = function () {
        $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
    };
});