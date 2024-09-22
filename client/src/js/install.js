const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {

  event.preventDefault();
  
  deferredPrompt = event;
  
  butInstall.style.display = 'block';

  console.log('beforeinstallprompt event was fired');
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  // Make sure the deferredPrompt is available
  if (!deferredPrompt) {
    return;
  }

  deferredPrompt.prompt();
  
  const { outcome } = await deferredPrompt.userChoice;
  
  console.log(`User response to the install prompt: ${outcome}`);
  
  deferredPrompt = null;
  
  butInstall.style.display = 'none';
});

// TODO: Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('PWA has been installed');
  
  butInstall.style.display = 'none';
});
