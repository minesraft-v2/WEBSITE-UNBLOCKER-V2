document.getElementById('toggleBtn').addEventListener('click', async () => {
  // Get all installed extensions, apps, and themes
  const extensions = await chrome.management.getAll();
  
  // Get our own extension's ID so we don't accidentally disable ourselves
  const self = await chrome.management.getSelf();

  for (const ext of extensions) {
    // Only disable extensions, skip apps/themes, and ignore this manager extension
    if (ext.type === 'extension' && ext.id !== self.id && ext.enabled) {
      await chrome.management.setEnabled(ext.id, false);
    }
  }
  
  alert('All other extensions have been disabled!');
});
