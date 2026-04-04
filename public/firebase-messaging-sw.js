// importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// firebase.initializeApp({
//   apiKey: "AIzaSyAQrvIusRkExduf3bXGZRePpHVIQ_WPiMU",
//   authDomain: "animoxkart-7962f.firebaseapp.com",
//   projectId: "animoxkart-7962f",
//   storageBucket: "animoxkart-7962f.appspot.com",
//   messagingSenderId: "218901776540",
//   appId: "1:218901776540:web:6410f5c192b6b887020559"
// });

// const messaging = firebase.messaging();

// // Handle background messages

// messaging.onBackgroundMessage((payload) => {
//     console.log(
//       '[firebase-messaging-sw.js] Received background message ',
//       payload
//     );
//      // Customize notification here
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.image,
//     data: {
//         url: payload.data.url || '/' // You can set a custom URL here
//       }
//   };
  
//     self.registration.showNotification(notificationTitle, notificationOptions);
//   });


//   // Listen for notification clicks
// self.addEventListener('notificationclick', (event) => {
//     console.log('[firebase-messaging-sw.js] Notification clicked', event);
  
//     // Close the notification after it is clicked
//     event.notification.close();
  
//     // Check if there's a custom URL in the notification's data
//     const url = event.notification.data.url || '/'; // Default to home if no URL is provided
  
//     // Open the URL in a new window/tab or in the same window
//     event.waitUntil(
//       clients.openWindow(url)
//     );
//   });