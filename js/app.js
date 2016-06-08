// https://github.com/alexk111/ngImgCrop

// http://jsfiddle.net/alexk111/rw6q9/

// http://codepen.io/michaeljcalkins/pen/prhtG


angular.module('app', ['ngImgCrop'])

  .controller('Ctrl', function($scope) {

    $scope.myImage='';
    $scope.myCroppedImage='';

    var handleFileSelect=function(evt) {
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.myImage=evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };

    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

  });
