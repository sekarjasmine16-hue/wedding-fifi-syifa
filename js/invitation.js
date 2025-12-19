
/* ===== NAMA TAMU DARI URL ===== */
const params = new URLSearchParams(window.location.search);
const nama = params.get("to");

if (nama) {
    // Membersihkan karakter khusus dan tanda +
    const decodedNama = decodeURIComponent(nama); 
    
    // 1. Tampilkan di teks utama (hanya nama saja)
    const displayNama = document.getElementById("namaTamu");
    if (displayNama) {
        displayNama.innerText = decodedNama; 
    }

    // 2. OTOMATIS ISI INPUT NAMA DI FORM UCAPAN
    // Pastikan di bagian form ucapan, input kamu punya id="nama"
    const inputNama = document.getElementById("nama");
    if (inputNama) {
        inputNama.value = decodedNama;
    }
}

/* ===== COUNTDOWN ===== */
const targetDate = new Date("2026-01-11T00:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff <= 0) return;

  document.getElementById("days").innerText =
    Math.floor(diff / (1000 * 60 * 60 * 24));
  document.getElementById("hours").innerText =
    Math.floor((diff / (1000 * 60 * 60)) % 24);
  document.getElementById("minutes").innerText =
    Math.floor((diff / (1000 * 60)) % 60);
  document.getElementById("seconds").innerText =
    Math.floor((diff / 1000) % 60);
}, 1000);

/* ===== COPY REKENING ===== */
function copyRek() {
  const text = document.getElementById("rekening").innerText;
  navigator.clipboard.writeText(text);
  alert("Nomor rekening disalin");
}

/* ===== ANIMASI SCROLL GAMBAR UCAPAN ===== */
const observerUcapan = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Tambahkan class is-visible saat gambar masuk ke layar
      entry.target.classList.add("is-visible");
    }
  });
}, { 
  threshold: 0.2 // Gambar akan muncul saat 20% bagiannya sudah terlihat di layar
});

// Targetkan gambar di dalam section baru tadi
const imgUcapan = document.querySelector(".img-fade-scroll");
if (imgUcapan) {
  observerUcapan.observe(imgUcapan);
}
/* ===== SCROLL FADE + UP BASED ON SCROLL ===== */
const asset = document.querySelector(".scroll-asset");

window.addEventListener("scroll", () => {
  if (!asset) return;

  const rect = asset.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // Mulai fade saat masuk viewport
  const start = windowHeight * 0.8;
  const end = windowHeight * 0.3;

  if (rect.top < start && rect.top > end) {
    const progress = (start - rect.top) / (start - end);
    asset.style.opacity = progress;
    asset.style.transform = `translateY(${40 - progress * 40}px)`;
  }

  if (rect.top <= end) {
    asset.style.opacity = 1;
    asset.style.transform = "translateY(0)";
  }

  if (rect.top >= start) {
    asset.style.opacity = 0;
    asset.style.transform = "translateY(40px)";
  }
});
/* ===== ASET 2 SCROLL & POPUP ===== */
const section = document.querySelector(".slide-asset-2");
const main = document.querySelector(".asset-main");

const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      main.style.transform = "translateY(0)";
      hand.style.opacity = 1;
      hand.style.transform = "translateX(-50%) scale(1)";
    }
  },
  { threshold: 0.3 }
);

observer.observe(section);
