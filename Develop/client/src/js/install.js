const butInstall = document.getElementById('buttonInstall');
let deferredPrompt; // This will store the event to use later

// Handling the `beforeinstallprompt` Event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent Chrome 67 and earlier from showing the default prompt
  event.preventDefault();

  // Save the event for later use
  deferredPrompt = event;

  // Show the install button to the user
  butInstall.style.display = 'block';
});

// Implementing the Click Event Handler for the Install Button
butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    // Show the install prompt to the user
    deferredPrompt.prompt();

    // Wait for the user's response
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the installation');
    } else {
      console.log('User declined the installation');
    }

    // Clear the saved prompt event
    deferredPrompt = null;

    // Hide the install button
    butInstall.style.display = 'none';
  }
});

// Handling the `appinstalled` Event
window.addEventListener('appinstalled', (event) => {
  console.log('App successfully installed!', event);

  // Optionally, hide the install button as the app is now installed
  butInstall.style.display = 'none';
});
