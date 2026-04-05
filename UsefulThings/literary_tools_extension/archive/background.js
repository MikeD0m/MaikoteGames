chrome.commands.onCommand.addListener((command) => {
  if (command === "toggle-menu") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];

      // Skip restricted pages
      if (!tab.url.startsWith("http") && !tab.url.startsWith("file")) {
        console.log("Cannot inject menu on this page:", tab.url);
        return;
      }

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["inject_menu.js"]
      }).catch(err => console.error("Script injection failed:", err));
    });
  }
});