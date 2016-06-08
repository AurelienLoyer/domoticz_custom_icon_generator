// https://github.com/alexk111/ngImgCrop

// http://jsfiddle.net/alexk111/rw6q9/

// http://codepen.io/michaeljcalkins/pen/prhtG

angular.module('app', ['ngImgCrop'])

  .controller('Ctrl', function($scope) {

    $scope.iconName = ''
    $scope.radiusValue = 0;
    $scope.myImageOn='';
    $scope.myImageOff='';
    $scope.myCroppedImageOn='';
    $scope.myCroppedImageOff='';

    vm.radiusChange = radiusChange;

    function radiusChange(){
      if(!vm.activeRadius){
        radiusValue = 0;
      }
    }


    var handleFileSelectOn = function(evt) {
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          console.log(evt);
          $scope.myImageOn = evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };

    var handleFileSelectOff = function(evt) {
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          console.log(evt);
          $scope.myImageOff = evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };

    angular.element(document.querySelector('#fileInputOn')).on('change',handleFileSelectOn);
    angular.element(document.querySelector('#fileInputOff')).on('change',handleFileSelectOff);

  });
