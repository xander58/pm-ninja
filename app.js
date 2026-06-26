let current = 0;
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

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

// Показ toast-уведомления
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 1500);
}

document.getElementById('randomBtn').onclick = randomQ;

document.getElementById('copyBtn').onclick = () => {
    navigator.clipboard.writeText(questions[current].text).then(() => {
        showToast('✅ Скопировано!');
    }).catch(() => {
        showToast('❌ Не удалось скопировать');
    });
};

document.getElementById('favBtn').onclick = () => {
    if (!favorites.includes(questions[current].text)) {
        favorites.push(questions[current].text);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        drawFavs();
        showToast('⭐ Добавлено в избранное');
    } else {
        showToast('Уже в избранном');
    }
};

document.getElementById('search').oninput = (e) => {
    const q = e.target.value.toLowerCase();
    const idx = questions.findIndex(x => x.text.toLowerCase().includes(q));
    if (idx >= 0) render(idx);
};

randomQ();