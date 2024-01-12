# Getting Started

```zsh
npm install
npm run start
```

Navigate to `http://localhost:3000`

This project uses Express as backend server with `web-push` package to send notifications to client. On client side a service worker configured to subscribe and handle notifications.

# Testing on Mobile Device
First install `ngrok` package which will create a proxy for us.
```zsh
npm install ngrok -g
```
Then run the project and start the ngrok proxy.
```zsh
npm run start
ngrok http 3000
```
Then you will be able to access the web page via the the displayed URL (Forwarding) in console. 


Investigation
-
In order to support push notifications on client, first we need to configure a service-worker which will be used to subscribe, unsubscribe and handle notifications in general. The Notification and Push API capabilities differs widely depending on the OS and Browser - which is a problem for us.

Base requirement(s):
- Service Worker to sub/unsub and handle notifications.

## Compability
Here is the general overview of browser compability: 
https://caniuse.com/notifications
https://caniuse.com/mdn-api_pushmanager

### Android
Without diving much deeper, it seems push notifications work properly on Android based devices. I was able to receive push notifications and do custom actions based on notification when user clicks it.

For Android the requirements are following:
- User needs to allow notification permission for browser.
- User needs to allow notification permission for the webpage.

### iOS
As with every other thing, iOS makes things complicated for no reason. Push API has partial support only works with new iOS devices - requiring minimum iOS 16.4 which release on March 27 2023. The global usage of this is 9.97% which is not bad. **BUT!!** Push notifications would **only work if user added the web page to the home screen** as PWA application. This is a huge friction for user (user needs to do it manually) and we would probably need some guidance text explaining how to do it. We must configure the application as a Progressive Web App (PWA) so that users can add it to their home screen.

![iOS Add to Home Screen](https://firebasestorage.googleapis.com/v0/b/first-class-blog.appspot.com/o/posts%2Ffcm-for-safari-add-to-home-08-2023_1600x800.webp?alt=media&token=e3a362bd-4811-4872-bfce-3de192465220)

So, in summary the requirements are following:
- User needs to add webpage to the "Home Screen" as PWA app.
- User needs to allow notification permission for app.

### Desktop
For desktop things are looking better, all major browsers have proper support. Except for macOS which only has support after macOS Ventura which release on September 12, 2022.

#### Resources
https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification#specifications
https://firebase.blog/posts/2023/08/fcm-for-safari
https://hilla.dev/blog/send-web-push-notifications-java/ (Spring Boot)