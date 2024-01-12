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