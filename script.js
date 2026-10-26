const distanceInput = document.querySelector("#distance");
const addressInput = document.querySelector("#address");
const estimatePrice = document.querySelector("#estimate-price");
const orderLink = document.querySelector("#order-link");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");

function updateEstimate() {
  const distance = Number.parseFloat(distanceInput.value.replace(",", "."));
  if (!Number.isFinite(distance) || distance <= 0) {
    estimatePrice.innerHTML = "— <small>FCFA</small>";
    orderLink.href = "https://wa.me/22892509487?text=Bonjour%20Blitz%2C%20je%20souhaite%20organiser%20une%20livraison.";
    return;
  }

  const price = distance <= 3.5 ? 500 : Math.ceil(distance * 150);
  estimatePrice.innerHTML = `${price.toLocaleString("fr-FR")} <small>FCFA</small>`;
  estimatePrice.classList.remove("estimate-price-updated");
  requestAnimationFrame(() => estimatePrice.classList.add("estimate-price-updated"));

  const address = addressInput.value.trim();
  const message = [
    "Bonjour Blitz, je souhaite organiser une livraison.",
    address ? `Adresse de livraison : ${address}.` : "",
    `Distance estimée : ${distance.toLocaleString("fr-FR")} km.`,
    `Tarif estimé : ${price.toLocaleString("fr-FR")} FCFA.`,
    "Merci de me confirmer le tarif et les détails."
  ].filter(Boolean).join(" ");
  orderLink.href = `https://wa.me/22892509487?text=${encodeURIComponent(message)}`;
}

distanceInput.addEventListener("input", updateEstimate);
addressInput.addEventListener("input", updateEstimate);

menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  navLinks.classList.toggle("is-open", !expanded);
});

navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();

const revealTargets = document.querySelectorAll(
  ".service-card, .section-copy, .calculator-card, .steps-heading, .step, .coverage-copy, .map-illustration, .hours-row, .cta-inner"
);
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reducedMotion) {
  document.documentElement.classList.add("reveal-ready");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

  revealTargets.forEach((target) => {
    target.classList.add("reveal-on-scroll");
    revealObserver.observe(target);
  });
}
