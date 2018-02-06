/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(3);
__webpack_require__(4);
__webpack_require__(5);
__webpack_require__(6);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    "use strict";

    angular.module('app').controller('ApodCtrl', ['ApodService', apodController]);

    function apodController(apodService) {

        var vm = this;
        vm.loading = false;
        vm.picture = {};
        vm.click = clickHandler;
        apodService.getPhoto().then(successfulResponse, errorResponse);

        function clickHandler() {
            vm.loading = true;
            apodService.getPhoto(vm.date).then(successfulResponse, errorResponse);
        }

        function successfulResponse(res) {
            vm.picture.title = res.data.title;
            vm.picture.hdurl = res.data.hdurl;
            vm.picture.explanation = res.data.explanation;
            vm.loading = false;
        }
        function errorResponse(error) {
            vm.loading = false;
            vm.error = true;
            console.log(error);
        }
    }
})();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
                "use strict";

                angular.module('app').factory('ApodService', ['$http', apodService]);

                function apodService($http) {

                                function getPhoto(dateString) {

                                                var day = moment(dateString).format("DD");
                                                var month = moment(dateString).format("MM");
                                                var year = moment(dateString).format("YYYY");
                                                var date = year + '-' + month + '-' + day;

                                                var key = "&api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";
                                                var url = "https://api.nasa.gov/planetary/apod?date=" + date;

                                                return $http.get(url + key);
                                }

                                return {
                                                getPhoto: getPhoto
                                };
                }
})();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    "use strict";

    angular.module('app').controller('ImagesCtrl', ['$http', '$uibModal', imagesController]);

    function imagesController($http, $uibModal) {

        var url = "https://images-api.nasa.gov/search?q=";
        var vm = this;

        vm.noImages = false;
        vm.loading = false;

        vm.openModal = function (image) {
            $uibModal.open({
                templateUrl: 'src/views/imagesModal.html',
                controller: function controller($scope, $uibModalInstance) {
                    var modalVm = this;

                    modalVm.image = image;
                    modalVm.close = function () {
                        $uibModalInstance.close();
                    };
                },
                controllerAs: 'modalCtrl'
            });
        };

        vm.search = function () {
            vm.loading = true;
            $http.get(url + vm.query).then(successfulResponse, errorResponse);

            function successfulResponse(res) {

                var results = res.data.collection.items;
                vm.images = mapImages(results);
                console.log(vm.images);

                vm.noImages = false;
                vm.loading = false;

                vm.currentPage = 0;
                vm.pageSize = 10;

                vm.numberOfPages = function () {
                    return Math.ceil(vm.images.length / vm.pageSize);
                };
            }

            function errorResponse(error) {
                vm.noImages = true;
                console.log(error);
            }

            function mapImages(results) {
                return _.map(results, function (image) {
                    return {
                        link: image.links[0].href,
                        type: image.data[0].media_type,
                        title: image.data[0].title,
                        description: image.data[0].description
                    };
                });
            }
        };
    }
})();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    "use strict";

    angular.module('app').controller('OrbitalCtrl', ['OrbitalService', orbitalController]);

    function orbitalController(orbitalService) {

        var vm = this;
        vm.orbital = {};

        orbitalService.retrieveOrbitalData().then(successfulResponse);

        var day = moment().format("DD");
        var month = moment().format("MM");
        var year = moment().format("YYYY");
        var date = year + '-' + month + '-' + day;

        function successfulResponse(res) {
            var response = res.data["near_earth_objects"][date];
            vm.data = mapOrbitals(response);
            vm.count = res.data["element_count"];
        }

        function mapOrbitals(res) {
            return _.map(res, function (orbital) {
                return {
                    name: orbital.name,
                    magnitude: orbital.absolute_magnitude_h,
                    diameterMin: orbital.estimated_diameter.kilometers.estimated_diameter_min,
                    diameterMax: orbital.estimated_diameter.kilometers.estimated_diameter_max,
                    hazardous: orbital.is_potentially_hazardous_asteroid,
                    orbitingBody: orbital.close_approach_data[0].orbiting_body,
                    approachDate: orbital.close_approach_data[0].close_approach_date,
                    distance: orbital.close_approach_data[0].miss_distance.kilometers
                };
            });
        }
    }
})();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    "use strict";

    angular.module('app').factory('OrbitalService', ['$http', orbitalService]);

    function orbitalService($http) {
        var vm = this;
        vm.noData = false;
        vm.retrieveOrbitalData = retrieveOrbitalData;

        function retrieveOrbitalData(dateString) {

            var day = moment(dateString).format("DD");
            var month = moment(dateString).format("MM");
            var year = moment(dateString).format("YYYY");
            var date = year + '-' + month + '-' + day;

            var key = "&api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";
            var url = "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + date;

            return $http.get(url + key);
        }

        return {
            retrieveOrbitalData: retrieveOrbitalData
        };
    }
})();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    "use strict";

    angular.module('app').controller('RoverCtrl', ['$http', '$stateParams', roverController]);

    function roverController($http, $stateParams) {

        var key = "api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";
        var url = "https://api.nasa.gov/mars-photos/api/v1/rovers/";

        var vm = this;

        vm.noImages = false;

        vm.name = $stateParams.rover;
        vm.retrieveRoverData = retrieveRoverData;
        vm.retrieveLatestDate = retrieveLatestData;

        function retrieveLatestData() {
            function getDate() {
                var day = moment().format("DD");
                var month = moment().format("MM");
                var year = moment().format("YYYY");
                var currentDate = year + '-' + month + '-' + day;
                return date;
            }
            var queryParams = "/photos?earth_date=" + date;
        }

        function retrieveRoverData() {

            var queryParams = "/photos?sol=";
            var query = void 0;

            switch (vm.name) {
                case "spirit":
                    query = Math.floor(Math.random() * 2208) + 1;
                    break;
                case "curiosity":
                    query = Math.floor(Math.random() * 1746) + 1;
                    break;
                case "opportunity":
                    query = Math.floor(Math.random() * 4648) + 1;
                    break;
            }

            $http.get(url + vm.name + queryParams + query + "&" + key).then(function (result) {
                var response = result.data.photos;
                vm.noImages = false;

                vm.data = mapRoverPhotos(response);
                vm.martianSol = response[0].sol;
                vm.earthDate = response[0].earth_date;
                vm.totalPhotos = response[0].rover.total_photos;
                vm.landingDate = response[0].rover.landing_date;
                vm.launchDate = response[0].rover.launch_date;
                vm.status = response[0].rover.status;
            }).catch(function (error) {
                vm.noImages = true;
            });
        }

        function mapRoverPhotos(photos) {
            return _.map(photos, function (photo) {
                return {
                    name: photo.camera.full_name,
                    abbreviation: photo.camera.name,
                    img: photo.img_src
                };
            });
        }
    }
})();

/***/ })
/******/ ]);