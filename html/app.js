// Application version (this would change with updates)
const APP_VERSION = "1.0.0";

// Set version display
document.getElementById("versionNumber").textContent = APP_VERSION;

// Check online status
function updateOnlineStatus() {
  const statusElement = document.getElementById("onlineStatus");
  if (navigator.onLine) {
    statusElement.textContent = "Online Status: Online ✅";
    statusElement.style.color = "green";
  } else {
    statusElement.textContent = "Online Status: Offline ❌";
    statusElement.style.color = "red";
  }
}

// Initial status check
updateOnlineStatus();

// Listen for online/offline events
window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);

// Check for updates button
document.getElementById("checkUpdates").addEventListener("click", () => {
  if (navigator.onLine) {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.update().then(() => {
          console.log("Checking for service worker update");
          alert("Checking for updates...");
          // In a real app, you would implement proper update notification
        });
      });
    }
  } else {
    alert("Cannot check for updates while offline");
  }
});
