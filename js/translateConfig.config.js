angular
  .module('app', ['ngImgCrop','ngAnimate', 'toastr','pascalprecht.translate'])
  .config(translateConfig);

function translateConfig($translateProvider){

  $translateProvider.preferredLanguage('fr');

  $translateProvider.translations('en', {
    PREVIEW_BUTTON_ON: 'Preview ON button',
    PREVIEW_BUTTON_OFF: 'Preview OFF button',
    BUTTON_LANG_EN: 'English',
    BUTTON_LANG_DE: 'French'
  });

  $translateProvider.translations('fr', {
    PREVIEW_BUTTON_ON: 'Aperçu du bouton ON',
    PREVIEW_BUTTON_OFF: 'Aperçu du bouton OFF',
    BUTTON_LANG_EN: 'Englais',
    BUTTON_LANG_DE: 'Français'
  });

}
