document.getElementById('fileInput').addEventListener('change', handleFileUpload);
document.getElementById('addButton').addEventListener('click', addItem);
document.getElementById('downloadButton').addEventListener('click', downloadJson);

let jsonData = [];

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            jsonData = JSON.parse(e.target.result);
            displayJson();
            updateJsonOutput();
        }
        reader.readAsText(file);
    }
}

function displayJson() {
    const jsonDisplay = document.getElementById('jsonDisplay');
    jsonDisplay.innerHTML = '';
    jsonData.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `
            <pre>${JSON.stringify(item, null, 2)}</pre>
            <button class="deleteButton" onclick="deleteItem(${index})">Delete</button>
        `;
        jsonDisplay.appendChild(itemDiv);
    });
}

function addItem() {
    const newItem = prompt('Enter new item in JSON format:');
    try {
        const jsonObject = JSON.parse(newItem);
        jsonData.push(jsonObject);
        displayJson();
        updateJsonOutput();
    } catch (error) {
        alert('Invalid JSON format');
    }
}

function deleteItem(index) {
    jsonData.splice(index, 1);
    displayJson();
    updateJsonOutput();
}

function updateJsonOutput() {
    const jsonOutput = document.getElementById('jsonOutput');
    jsonOutput.value = JSON.stringify(jsonData, null, 2);
}

function downloadJson() {
    const jsonString = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'updated_json.json';
    a.click();
    URL.revokeObjectURL(url);
}
