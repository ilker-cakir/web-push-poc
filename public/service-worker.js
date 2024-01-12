self.addEventListener("push", (event) => {
  console.log("push:event", event.data.text());
  const data = JSON.parse(event.data.text());

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "./icon-512.png",
      // badge: "./icon-512.png",
      tag: "test-notification",
      // actions: [
      //   {
      //     action: "view-content",
      //     title: "Yes",
      //   },
      //   {
      //     action: "go-home",
      //     title: "No",
      //   },
      // ],
    })
  );
});

self.addEventListener("notificationclick", function (event) {
  console.log("On notification click: ", event.notification.tag);
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (client.url == "/" && "focus" in client) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow("/");
      })
  );
});
