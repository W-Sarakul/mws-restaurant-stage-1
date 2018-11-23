var cacheName = 'v1';
var cacheFiles = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/data/restaurants.json',
  '/source/1-400_small.jpg',
  '/source/1-600_medium.jpg',
  '/source/2-400_small.jpg',
  '/source/2-600_medium.jpg',
  '/source/3-400_small.jpg',
  '/source/3-600_medium.jpg',
  '/source/4-400_small.jpg',
  '/source/4-600_medium.jpg',
  '/source/5-400_small.jpg',
  '/source/5-600_medium.jpg',
  '/source/6-400_small.jpg',
  '/source/6-600_medium.jpg',
  '/source/7-400_small.jpg',
  '/source/7-600_medium.jpg',
  '/source/8-400_small.jpg',
  '/source/8-600_medium.jpg',
  '/source/9-400_small.jpg',
  '/source/9-600_medium.jpg',
  '/source/10-400_small.jpg',
  '/source/10-600_medium.jpg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
        return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          console.log('Found', event.request, ' in cache');
          return response;
        } else {
          console.log('Could not find', event.request, ' in cache, Fetching');
          return fetch(event.request)
          .then(function(response) {
            const cloneResponse = response.clone();
            caches.open('v1').then(function(cache) {
              cache.put(event.request, cloneResponse);
            })
            return response;
          })
          .catch(function(err) {
            console.log(err);
          })
        }

      }
    )
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});
