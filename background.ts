chrome.tabs.onActivated.addListener(async () => {
  try {
    // Send message to the content_script that the active tab has changed.
    // The content_script uses this message to check whether the injected buttons and the extension
    // storage are synced: if not, the state of the injected buttons must be updated accordingly.
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        message: "changed-tab"
      })
    })
  } catch (error) {
    console.error(error)
  }
})

export {}
