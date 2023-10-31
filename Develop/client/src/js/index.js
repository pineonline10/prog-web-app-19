import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // Register the workbox service worker
  const workboxSW = new Workbox('/Develop/client/src-sw.js');

  // Handle service worker registration events
  workboxSW.addEventListener('waiting', (event) => {
    console.log('A new service worker is waiting to control the page.');
    // Prompt the user to reload the page or perform any desired action
  });

  workboxSW.addEventListener('externalwaiting', (event) => {
    console.log('An external service worker is waiting to control the page.');
  });

  workboxSW.addEventListener('controlling', (event) => {
    console.log('The service worker began controlling the page.');
    // If needed, you can prompt user or do other actions here
  });

  // Finally, register the service worker
  workboxSW.register().then((registration) => {
    console.log('Service worker registered successfully:', registration);
  }).catch((error) => {
    console.error('Service worker registration failed:', error);
  });

} else {
  console.error('Service workers are not supported in this browser.');
}
