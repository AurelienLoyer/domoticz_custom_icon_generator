angular
  .module('app', ['ngImgCrop','ngAnimate', 'toastr','pascalprecht.translate'])
  .config(function(toastrConfig) {
    angular.extend(toastrConfig, {
      autoDismiss: false,
      containerId: 'toast-container',
      maxOpened: 3,
      newestOnTop: true,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,
      preventOpenDuplicates: true,
      target: 'body'
    });
  })
  .config(['$translateProvider', function ($translateProvider) {
    addTranslateConfig($translateProvider);
  }])
  .controller('generatorController', generatorController);

function generatorController($scope,toastr,$translate,$location){

    var vm = this;

    vm.iconName = '';
    vm.radiusValue = 0;
    vm.borderColor = '#7a81ff';
    vm.border = '';
    vm.myImageOn = '';
    vm.myImageOff = '';
    vm.myCroppedImageOn = '';
    vm.myCroppedImageOff = '';
    vm.currentUrl = $location.absUrl();
    vm.local = false;

    vm.radiusChange = radiusChange;
    vm.borderChange = borderChange;
    vm.zip = zip;
    vm.changeLanguage = changeLanguage;

    if(vm.currentUrl.indexOf('localhost') > -1){
      vm.local = true;
    }

    let preferedLang = localStorage.getItem('preferedLang');
    if(preferedLang) {
      $translate.use(preferedLang);
    }

    function changeLanguage(key){
      console.log(key);
      $translate.use(key);
      localStorage.setItem('preferedLang', key)
    }

    function radiusChange() {
      if (!vm.activeRadius) {
          vm.radiusValue = 0;
      }
    }

    function borderChange() {
      if (vm.activeBorder) {
          vm.border = "border:solid "+vm.borderSize+"px "+vm.borderColor+";";
      }else{
          vm.border = "";
      }
    }

    var handleFileSelectOn = function(evt) {
        var file = evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function(evt) {
            $scope.$apply(function($scope) {
                console.log(evt);
                vm.myImageOn = evt.target.result;
            });
        };
        reader.readAsDataURL(file);
    };

    var handleFileSelectOff = function(evt) {
        var file = evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function(evt) {
            $scope.$apply(function($scope) {
                console.log(evt);
                vm.myImageOff = evt.target.result;
            });
        };
        reader.readAsDataURL(file);
    };

    angular.element(document.querySelector('#fileInputOn')).on('change', handleFileSelectOn);
    angular.element(document.querySelector('#fileInputOff')).on('change', handleFileSelectOff);

    function zip(){

      if(!vm.myImageOn){ toastr.error('Image manquante pour le bouton On', 'Erreur'); }
      if(!vm.myImageOff){ toastr.error('Image manquante pour le bouton Off', 'Erreur'); }
      if(!vm.iconName){ toastr.error('Nom du bouton manquant', 'Erreur'); }
      if(!vm.myImageOff || !vm.myImageOn || !vm.iconName){ return; }

      _gaq.push(['_trackEvent', 'zip', vm.iconName]);

      var w = 48;
      var h = 48;

      var canvasOn = document.createElement('canvas');
      canvasOn.width = w*2;
      canvasOn.height = h*2;
      canvasOn.style.width = w + 'px';
      canvasOn.style.height = h + 'px';
      var contextOn = canvasOn.getContext('2d');
      contextOn.scale(2,2);

      var canvasOff = document.createElement('canvas');
      canvasOff.width = w*2;
      canvasOff.height = h*2;
      canvasOff.style.width = w + 'px';
      canvasOff.style.height = h + 'px';
      var contextOff = canvasOff.getContext('2d');
      contextOff.scale(2,2);

      html2canvas(angular.element(document.querySelector('#imageOnU')), {
        canvas: canvasOn,
        onrendered: function(canvas) {
          $scope.$apply(function($scope) {
            angular.element(document.querySelector('#zonetest')).append(canvas);
            var imageOn = canvas.toDataURL("image/png");
            html2canvas(angular.element(document.querySelector('#imageOffU')), {
              canvas: canvasOff,
              onrendered: function(canvas) {
                $scope.$apply(function($scope) {
                  angular.element(document.querySelector('#zonetest')).append(canvas);
                  var imageOff = canvas.toDataURL("image/png");

                  var zip = new JSZip();
                  zip.file("icons.txt", vm.iconName+";Button "+vm.iconName+";Icon "+vm.iconName+" generate via "+vm.currentUrl);

                  var savableOn = new Image();
                  var savableOff = new Image();
                  savableOn.src = imageOn;
                  savableOff.src = imageOff;
                  var preview = toDataUrl('../img/bouton.png');

                  zip.file(vm.iconName+"48_On.png", savableOn.src.substr(savableOn.src.indexOf(',')+1), {base64: true});
                  zip.file(vm.iconName+"48_Off.png", savableOff.src.substr(savableOff.src.indexOf(',')+1), {base64: true});
                  zip.file(vm.iconName+'.png',preview, {base64: true});

                  vm.loader = true;
                  zip.generateAsync({type:"blob"}).then(function(content) {
                      vm.loader = false;
                      saveAs(content, "domoticz_custom_icon_"+vm.iconName+".zip");
                  });

                })
              }
            })
          })
        }
      })

    }
}

function toDataUrl(url, callback, outputFormat){
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var dataURL;
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        //callback(dataURL);
        canvas = null;
    };
    img.src = url;
}

/* ANALYTICS INTEGRATION */

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-79225266-1']);
_gaq.push(['_trackPageview']);
(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
