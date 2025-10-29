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


      gtag('event', 'zip', {
        'icon_name': vm.iconName,
      });

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

                  // savable images
                  var savableOn = new Image();
                  var savableOff = new Image();
                  savableOn.src = imageOn;
                  savableOff.src = imageOff;

                  // The preview (16x16) must be created async; use toDataUrl callback to get it
					createPreviewFromDataUrl(imageOn, 16, 16, function(previewDataUrl) {
					  var zip = new JSZip();
					  zip.file("icons.txt", vm.iconName+";Button "+vm.iconName+";Icon "+vm.iconName+" generate via "+vm.currentUrl);

					  zip.file(vm.iconName+"48_On.png", savableOn.src.substr(savableOn.src.indexOf(',')+1), {base64: true});
					  zip.file(vm.iconName+"48_Off.png", savableOff.src.substr(savableOff.src.indexOf(',')+1), {base64: true});

					  if (previewDataUrl) {
						zip.file(vm.iconName + '.png', previewDataUrl.substr(previewDataUrl.indexOf(',')+1), {base64: true});
					  }

					  vm.loader = true;
					  zip.generateAsync({type:"blob"}).then(function(content) {
						  vm.loader = false;
						  saveAs(content, "domoticz_custom_icon_"+vm.iconName+".zip");
					  });
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
        // set canvas size to desired 16x16 for preview (change if you want a different preview size)
        canvas.width = 16;
        canvas.height = 16;
        // draw image scaled to 16x16
        ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
        dataURL = canvas.toDataURL(outputFormat || 'image/png');
        // call the callback with the generated dataURL
        if (typeof callback === 'function') {
          callback(dataURL);
        }
        canvas = null;
    };
    img.onerror = function(){
      // on error call callback with null so caller can handle it
      if (typeof callback === 'function') {
        callback(null);
      }
    };
    img.src = url;
}
// helper: create a small preview from an existing data URL
function createPreviewFromDataUrl(dataUrl, width, height, cb) {
  var img = new Image();
  img.onload = function() {
    var c = document.createElement('canvas');
    c.width = width;
    c.height = height;
    var ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);
    cb(c.toDataURL('image/png'));
  };
  img.onerror = function() { cb(null); };
  img.src = dataUrl;
}
