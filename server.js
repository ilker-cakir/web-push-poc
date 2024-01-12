const express = require("express");
const webPush = require("web-push");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

// VAPID keys should be generated only once.
// const vapidKeys = webPush.generateVAPIDKeys();

// Replace with your own VAPID keys
const publicVapidKey =
  "BCvTk05gHACdttU_r5LyIpeQ_TsMl7PLl518y637mPJwuuZEdunwevK13XMq5Sly37ZR5d2AC6PLxHlU15ZMnxw";
const privateVapidKey = "o3ExgdfEAnV-ty7UW7sI5TUkePiFDJbYrt4cdYJwU4g";

webPush.setVapidDetails(
  "mailto:ilker.cakir@auto1.com",
  publicVapidKey,
  privateVapidKey
);

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Endpoint to subscribe a user for push notifications
app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  res.status(201).json({});

  // Send a welcome notification
  const payload = JSON.stringify({
    title: "Welcome to Web Push Notifications",
    body: "You will now receive notifications!",
  });

  webPush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));

  setInterval(() => {
    webPush
      .sendNotification(
        subscription,
        JSON.stringify({
          title: "Hello!",
          body: "Wow!",
        })
      )
      .catch((err) => console.error(err));
  }, 15000);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
