function addTranslateConfig($translateProvider) {

  $translateProvider.preferredLanguage('en');

  $translateProvider.translations('en', {
    DESCRIPTION: `🤖 🆒 Domoticz custom icon generator, help people to generate custom icon, resize image, crop image 🔪, and generate zip folder 📦 to have amazing 🎉 icons in Domoticz app.
    If you want to contribute to this project: <a target="_blank" href="https://github.com/T3kstiil3/domoticz_custom_icon_generator">Github 🐙</a> or contact me on <a target="_blank" href="https://twitter.com/AurelienLoyer">Twitter 🐦</a>
    <br><br> Enjoy 🤩`,
    ICONE_NAME: 'Icon name',
    PREVIEW_BUTTON_ON: 'Preview ON button',
    PREVIEW_BUTTON_OFF: 'Preview OFF button',
    BUTTON_ON: 'ON Button',
    BUTTON_OFF: 'OFF Button',
    SELECT_IMAGE: 'Select an image file',
    BUTTON_LANG_EN: 'English',
    BUTTON_LANG_DE: 'French',
    WORK_IN_PROGRESS: 'Work in progress (Border radius,Border...)',
    IMAGE_SETTINGS: 'Image settings',
    FINISH: 'To finish',
    GENERATE_ZIP: `Generate zip`,
    CANVAS: `Canvas demo`,
  });

  $translateProvider.translations('fr', {
    DESCRIPTION: `🤖 🆒 Domoticz custom icon generator, vous aide à générer des icônes, changer la taille de vos images, recadrer vos images 🔪, et générer un dossier zip 📦 pour avoir des supers icônes 🎉 dans votre application Domoticz.
    Si vous voulez contribuer au projet: <a target="_blank" href="https://github.com/T3kstiil3/domoticz_custom_icon_generator">Github 🐙</a> ou vous pouvez me contacter sur <a target="_blank" href="https://twitter.com/AurelienLoyer">Twitter 🐦</a>
    <br><br> Enjoy 🤩`,
    ICONE_NAME: `Nom de l'icone`,
    PREVIEW_BUTTON_ON: 'Aperçu du bouton ON',
    PREVIEW_BUTTON_OFF: 'Aperçu du bouton OFF',
    BUTTON_ON: 'Bouton ON',
    BUTTON_OFF: 'Bouton OFF',
    SELECT_IMAGE: 'Sélectionner un fichier image',
    BUTTON_LANG_EN: 'Englais',
    BUTTON_LANG_DE: 'Français',
    IMAGE_SETTINGS: `Réglage de l'image`,
    WORK_IN_PROGRESS: 'En développement (Bord arrondi,Bordure...)',
    FINISH: 'Pour finir',
    GENERATE_ZIP: `Générer le zip`,
    CANVAS: `Rendu canvas`,
  });
}