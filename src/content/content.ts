
window.onload = () => {
    const [HTML_BTN, CSS_BTN, CONFIG_BTN] = Array.from(document.querySelectorAll("main>div>div>button")) as HTMLButtonElement[];

    const getButton = document.createElement("button");
    getButton.setAttribute("style", "display:none");
    getButton.id = "tailwind-ai-get"

    const setButton = document.createElement("button");
    setButton.setAttribute("style", "display:none");
    setButton.id = "tailwind-ai-set"

    const resultDiv = document.createElement("div");
    resultDiv.id = "tailwind-ai-result";
    resultDiv.setAttribute("style", "display:none");

    document.body.appendChild(getButton);
    document.body.appendChild(setButton);
    document.body.appendChild(resultDiv);
    //@ts-expect-error these are global variables im setting
    window.HTML_BTN = HTML_BTN;
    //@ts-expect-error these are global variables im setting
    window.CSS_BTN = CSS_BTN;
    //@ts-expect-error these are global variables im setting
    window.CONFIG_BTN = CONFIG_BTN;
    //@ts-expect-error these are global variables im setting
    window.getButton = getButton;
    //@ts-expect-error these are global variables im setting
    window.setButton = setButton;
    //@ts-expect-error these are global variables im setting
    window.resultDiv = resultDiv;
}
