let current = 0;
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}

themeToggle.onclick = () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

function render(i) {
    current = i;
    document.getElementById('question').textContent = questions[current].text;
    document.getElementById('company').textContent = questions[current].company;
    document.getElementById('count').textContent = `${current + 1}/${questions.length}`;
    drawFavs();
}

function randomQ() {
    render(Math.floor(Math.random() * questions.length));
}

function drawFavs() {
    document.getElementById('favCount').textContent = `⭐ ${favorites.length}`;
    document.getElementById('favorites').innerHTML =
        favorites.slice(-10).map(f => `<li>${f}</li>`).join('');
}

document.getElementById('randomBtn').onclick = randomQ;
document.getElementById('copyBtn').onclick = () => navigator.clipboard.writeText(questions[current].text);
document.getElementById('favBtn').onclick = () => {
    if (!favorites.includes(questions[current].text)) {
        favorites.push(questions[current].text);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        drawFavs();
    }
};
document.getElementById('search').oninput = (e) => {
    const q = e.target.value.toLowerCase();
    const idx = questions.findIndex(x => x.text.toLowerCase().includes(q));
    if (idx >= 0) render(idx);
};
randomQ();