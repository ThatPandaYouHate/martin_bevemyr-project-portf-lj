import * as pdfjsLib from 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.mjs';

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs';

const projects = [
  { name: "24SPC Cabin", file: "CAD_portfölj/24SPC Cabin.pdf", desc: "Kabinkonstruktion" },
  { name: "24SPC L 2021", file: "CAD_portfölj/24spc L 2021 samanstälning.pdf", desc: "Sammanställningsritning" },
  { name: "24SPC H2021", file: "CAD_portfölj/24spcH2021_Hel.PDF", desc: "Helritning" },
  { name: "Balkong Bänk", file: "CAD_portfölj/Balkong Bänk.pdf", desc: "Balkongmöbel" },
  { name: "Stor Portfölj", file: "CAD_portfölj/Big_portfölj.pdf", desc: "Samlad portfölj" },
  { name: "Grill Mk 2.1", file: "CAD_portfölj/grill Mk 2.1.pdf", desc: "Grillkonstruktion" },
  { name: "Klaff", file: "CAD_portfölj/klaff.pdf", desc: "Klaffkonstruktion" },
  { name: "Knap 50 Fäste", file: "CAD_portfölj/Knap 50 fäste.pdf", desc: "Fästdetalj" },
  { name: "Köksbänk", file: "CAD_portfölj/köksbänk.pdf", desc: "Köksmöbel" },
  { name: "LEGO Star Wars Cannon", file: "CAD_portfölj/LEGO Star wars empier cannon.pdf", desc: "Hobbyprojekt – LEGO-modell" },
  { name: "Långboard", file: "CAD_portfölj/Långboard.pdf", desc: "Långboard-design" },
  { name: "Mikrofonhållare", file: "CAD_portfölj/Mikrofonhållare med fot-2.pdf", desc: "Mikrofonhållare med fot" },
  { name: "Rullgardin", file: "CAD_portfölj/RullGardin.pdf", desc: "Rullgardinskonstruktion" },
  { name: "Stålböjare", file: "CAD_portfölj/Stål böjare.pdf", desc: "Verktyg för stålböjning" },
  { name: "Super L-Phylla", file: "CAD_portfölj/superLPhylla.pdf", desc: "L-profil konstruktion" },
  { name: "Trucks", file: "CAD_portfölj/Trucks.pdf", desc: "Longboard-trucks" },
];

const grid = document.getElementById('project-grid');

function createCard(project) {
  const card = document.createElement('a');
  card.className = 'project-card';
  card.href = project.file;
  card.target = '_blank';
  card.rel = 'noopener';

  card.innerHTML = `
    <div class="thumb-container">
      <canvas></canvas>
      <span class="loading-spinner">Laddar...</span>
      <div class="thumb-overlay"><span>Öppna PDF</span></div>
    </div>
    <div class="card-body">
      <h3>${project.name}</h3>
      <p>${project.desc}</p>
    </div>
  `;

  grid.appendChild(card);
  renderThumbnail(card.querySelector('canvas'), card.querySelector('.loading-spinner'), project.file);
}

async function renderThumbnail(canvas, spinner, pdfUrl) {
  try {
    const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
    const page = await pdf.getPage(1);

    const containerWidth = canvas.parentElement.clientWidth || 400;
    const baseViewport = page.getViewport({ scale: 1 });
    const scale = (containerWidth / baseViewport.width) * 1.5;
    const viewport = page.getViewport({ scale });

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvasContext: canvas.getContext('2d'),
      viewport,
    }).promise;

    spinner.style.display = 'none';
  } catch {
    spinner.textContent = 'Kunde inte ladda förhandsgranskning';
  }
}

projects.forEach(createCard);

// ─── Mobile nav toggle ───
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ─── Shrink header on scroll ───
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});
