const butInstall = document.getElementById('buttonInstall');

// Variable to hold the 'beforeinstallprompt' event
let deferredPrompt;

// Logic for installing the PWA
// Event handler for the 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (event) => {
  console.log('beforeinstallprompt fired');
  // Prevent the prompt from immediately appearing
  event.preventDefault();
  // Save the event for later use
  deferredPrompt = event;
  // Make the install button visible
  butInstall.style.display = 'block';
});

// Event handler for the install button click
butInstall.addEventListener('click', async () => {
  console.log('Install button clicked');
  // Hide the install button
  butInstall.style.display = 'none';
  // Show the install prompt
  if (deferredPrompt) {
    deferredPrompt.prompt();
    // Wait for the user's choice
    const choiceResult = await deferredPrompt.userChoice;
    // Check the choice
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    // Clear the saved prompt
    deferredPrompt = null;
  }
});

// Event handler for the 'appinstalled' event
window.addEventListener('appinstalled', (event) => {
  console.log('App installed');
  // Additional logic, such as updating the UI to indicate the app is installed, can go here.
});
