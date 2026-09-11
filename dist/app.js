// Add grammar topics here. Null values deliberately keep the first version empty.
const topics = [{
  id: 'articles', title: 'Articles',
  rules: [
    { title: 'a / an', text: null },
    { title: 'the', text: null },
    { title: 'no article', text: null }
  ],
  exercises: Array.from({ length: 5 }, () => ({ sentence: null, answer: null }))
}];
const pages = ['about', 'theory', 'practice', 'random', 'forum'];
let selectedTopic = topics[0].id;
const main = document.getElementById('main');
const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function render() {
  const requested = location.hash.slice(1);
  const page = pages.includes(requested) ? requested : 'theory';
  document.querySelectorAll('nav a').forEach(link => {
    if (link.dataset.page === page) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  const label = document.querySelector(`nav a[data-page="${page}"]`).textContent;
  document.title = `${label} · Masha English`;
  main.setAttribute('aria-label', label);
  if (page !== 'theory' && page !== 'practice') {
    main.innerHTML = '<div class="blank"></div>';
    return;
  }
  const topic = topics.find(t => t.id === selectedTopic) || topics[0];
  const body = page === 'theory'
    ? `<div class="rules">${topic.rules.map(rule => `<section class="rule"><h2 lang="en">${escapeHtml(rule.title)}</h2>${rule.text ? `<p class="rule-text">${escapeHtml(rule.text)}</p>` : '<p class="empty-copy">Правило пока не добавлено</p><div class="writing-lines" aria-hidden="true"></div>'}</section>`).join('')}</div>`
    : `<ol class="exercise-list">${topic.exercises.map((exercise, i) => `<li class="exercise"><span class="number" aria-hidden="true">${i + 1}.</span><div><p class="sentence">${exercise.sentence ? escapeHtml(exercise.sentence) : 'Предложение пока не добавлено'}</p>${exercise.answer ? `<details><summary>Показать ответ</summary><p>${escapeHtml(exercise.answer)}</p></details>` : '<div class="answer">Ответ —</div>'}</div></li>`).join('')}</ol>`;
  main.innerHTML = `<div class="workspace"><section class="content"><p class="eyebrow">Grammar</p><div class="title-row"><h1 lang="en">${escapeHtml(topic.title)}</h1><span class="page-note">${page === 'theory' ? 'Quick refresh' : 'Practice · 5 предложений'}</span></div>${body}</section></div>`;

}
window.addEventListener('hashchange', render);
render();
