let display = document.getElementById("display");
let themeToggle = document.getElementById("themeToggle");
let historyList = document.getElementById("historyList");

// Load theme
let savedTheme = localStorage.getItem("theme") || "light";
document.body.classList.add(savedTheme);
themeToggle.innerText = savedTheme === "dark" ? "☀️" : "🌙";

// Load history
let history = JSON.parse(localStorage.getItem("history")) || [];
updateHistoryUI();

function append(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let result = eval(display.value);
        addToHistory(display.value + " = " + result);
        display.value = result;
    } catch {
        display.value = "Error";
    }
}

function addToHistory(entry) {
    history.push(entry);
    localStorage.setItem("history", JSON.stringify(history));
    updateHistoryUI();
}

function updateHistoryUI() {
    historyList.innerHTML = "";
    history.slice(-5).reverse().forEach(item => {
        let li = document.createElement("li");
        li.innerText = item;
        historyList.appendChild(li);
    });
}

// Theme toggle
themeToggle.addEventListener("click", () => {
    if (document.body.classList.contains("light")) {
        document.body.classList.replace("light", "dark");
        localStorage.setItem("theme", "dark");
        themeToggle.innerText = "☀️";
    } else {
        document.body.classList.replace("dark", "light");
        localStorage.setItem("theme", "light");
        themeToggle.innerText = "🌙";
    }
});

// Keyboard support
document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key) || "+-*/.".includes(e.key)) {
        append(e.key);
    } else if (e.key === "Enter") {
        calculate();
    } else if (e.key === "Backspace") {
        deleteLast();
    } else if (e.key === "Escape") {
        clearDisplay();
    }
});