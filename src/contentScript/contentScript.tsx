import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import "../assets/tailwind.css"

chrome.runtime.sendMessage("I am loading content script", (response) => {
  console.log(response)
  console.log("I am content script")
})

window.onload = (event: Event = null) => {
  init()
}

function init() {
  const appContainer = document.createElement("div")
  appContainer.id = "tailwind-ai-app"
  document.body.appendChild(appContainer)
  if (!appContainer) {
    throw new Error("Can not find AppContainer")
  }
  const root = createRoot(appContainer)
  root.render(<App />)
}
