const chatBox = document.querySelector(".chat-box");
const textArea = document.querySelector("input");

const btn = document.querySelector("button");

function scrollToBottom(element) {
    element.scroll({ top: element.scrollHeight, behavior: 'smooth' });
  }

function submitText() {
    if (textArea.value != "") {
        const inputText = document.createElement("p");
        inputText.classList.add("chat-input");
        inputText.textContent = textArea.value;
        chatBox.appendChild(inputText);
        responseText(textArea.value);
        textArea.value = "";
        scrollToBottom(chatBox);
    }
}

function responseText(txtValue) {
    const outputText = document.createElement("p");
    outputText.classList.add("chat-output");
    const inputText = txtValue;

    fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText })
    })
    .then(response => response.json())
    .then(data => {
        outputText.textContent = "Suggested emoji: \"" + data.response + "\"";
        chatBox.appendChild(outputText);
        scrollToBottom(chatBox);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


btn.addEventListener("click", submitText)

textArea.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        submitText();
    }
})