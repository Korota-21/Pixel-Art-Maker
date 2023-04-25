const CASHE_NAME = 'V1'; //it's just a name I can put anything
const filesToCache = [
    '/',
    '/img',
    'https://cdn.jsdelivr.net/npm/rasterizehtml@1.2.3/dist/rasterizeHTML.allinone.js',
    '/index.html',
    '/styles.css',
    '/reset.css',
    '/colorPicker.png',
    '/ts-js/convertToImage.js',
    '/ts-js/html2canvas.js',
    '/ts-js/designs.js',
    '/ts-js/language.js',
    '/ts-js/toggleLines.js'
  ];
this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CASHE_NAME)
        .then(
            function(cache) {
                console.log('opened cache');
                return cache.addAll(filesToCache)
            }
        )
    )
})