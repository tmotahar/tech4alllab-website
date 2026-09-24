const content = window.tech4allContent;

const icon = (type) => {
  const icons = {
    access: '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="8" r="4"/><path d="M10 17c9-3 19-3 28 0M24 12v25M14 40l10-16 10 16"/></svg>',
    motion: '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="16"/><path d="M24 8c8 5 11 13 8 24M12 16c8 0 15 7 15 15M8 27h32"/></svg>',
    data: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 35V23M18 35V12M29 35V19M40 35V7"/><path d="M6 40h36"/></svg>',
    people: '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="17" cy="16" r="6"/><circle cx="33" cy="18" r="5"/><path d="M6 39c1-9 5-14 11-14s11 5 12 14M28 28c8-3 13 2 14 11"/></svg>'
  };
  return icons[type] || icons.access;
};

document.querySelector('#principles').innerHTML = content.principles.map(item => `
  <article class="principle reveal"><span>${item.number}</span><h3>${item.title}</h3><p>${item.text}</p></article>`).join('');

document.querySelector('#research-grid').innerHTML = content.researchAreas.map(item => `
  <article class="research-card reveal"><div class="research-icon">${icon(item.icon)}</div><h3>${item.title}</h3><p>${item.text}</p></article>`).join('');

document.querySelector('#project-list').innerHTML = content.projects.map(item => `
  <article class="project-item reveal"><div class="project-number ${item.accent}">${item.number}</div><div class="project-body"><span>${item.tag}</span><h3>${item.title}</h3><p>${item.text}</p></div><div class="project-arrow" aria-hidden="true">↗</div></article>`).join('');

const peopleGrid = document.querySelector('#people-grid');

const personCard = (person) => `
  <article class="person-card reveal">
    <img class="avatar-photo" src="${person.image}" alt="${person.name}">
    <div class="person-info">
      <span>${person.role}</span>
      <h3>${person.name}</h3>
      <p>${person.bio}</p>
      ${person.website ? `<a class="person-website" href="${person.website}" target="_blank" rel="noopener noreferrer">Website ↗</a>` : ''}
    </div>
  </article>
`;

const director = content.people.filter(person => person.category === "director");
const phdStudents = content.people.filter(person => person.category === "phd");
const mastersStudents = content.people.filter(person => person.category === "masters");

peopleGrid.innerHTML = `
  <div class="people-section director-section">
    <h3 class="people-group-title">Lab Director</h3>
    <div class="people-row director-row">
      ${director.map(personCard).join('')}
    </div>
  </div>

  <div class="people-section">
    <h3 class="people-group-title">PhD Students</h3>
    <div class="people-row student-row">
      ${phdStudents.map(personCard).join('')}
    </div>
  </div>

  <div class="people-section">
    <h3 class="people-group-title">Master's Students</h3>
    <div class="people-row student-row">
      ${mastersStudents.map(personCard).join('')}
    </div>
  </div>
`;

document.querySelector('#publication-list').innerHTML = content.publications.map(pub => `
  <article class="publication reveal"><div><span class="pub-year">${pub.year}</span><span class="pub-venue">${pub.venue}</span></div><h3>${pub.title}</h3><p>${pub.note}</p></article>`).join('');

document.querySelector('#year').textContent = new Date().getFullYear();

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#main-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
