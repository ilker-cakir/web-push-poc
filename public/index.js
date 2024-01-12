async function subscribe() {
  try {
    const registration = await navigator.serviceWorker.getRegistration(
      "/service-worker.js"
    );
    if (registration.pushManager) {
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          "BCvTk05gHACdttU_r5LyIpeQ_TsMl7PLl518y637mPJwuuZEdunwevK13XMq5Sly37ZR5d2AC6PLxHlU15ZMnxw"
        ),
      });
      await fetch("/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
          "Content-Type": "application/json",
        },
      });

      return console.log("Subscribed for notifications!");
    }
    console.log("NOT Subscribed for notifications!");
  } catch (error) {
    console.error("Error subscribing:", error);
  }
}
async function unsubscribe() {
  // Check if the browser supports service workers and push notifications
  if ("serviceWorker" in navigator && "PushManager" in window) {
    navigator.serviceWorker.ready.then(function (registration) {
      // Get the push subscription
      registration.pushManager.getSubscription().then(function (subscription) {
        // Check if a subscription exists
        if (subscription) {
          // Unsubscribe from push notifications
          subscription
            .unsubscribe()
            .then(function (successful) {
              if (successful) {
                console.log("Unsubscribed from push notifications");
              } else {
                console.error("Failed to unsubscribe from push notifications");
              }
            })
            .catch(function (error) {
              console.error(
                "Error unsubscribing from push notifications:",
                error
              );
            });
        } else {
          console.warn(
            "No subscription found. You might not be subscribed to push notifications."
          );
        }
      });
    });
  }
}

async function init() {
  await navigator.serviceWorker.register("/service-worker.js");
}

async function permission() {
  return Notification.requestPermission();
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

init();
