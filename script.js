// Variável global para o carrossel de notícias
let currentSlide = 0;
const totalSlides = 3; // Temos 3 slides de exemplo

/**
 * Inicializa o carrossel principal e o timer para avanço automático.
 */
function initCarousel() {
  const track = document.getElementById("news-carousel-track");
  if (track) {
    // Configura o avanço automático a cada 5 segundos
    setInterval(() => {
      moveCarousel(1);
    }, 5000);
  }
}

/**
 * Move o carrossel de notícias (Header) para o slide anterior ou próximo.
 * @param {number} direction - -1 para anterior, 1 para próximo.
 */
function moveCarousel(direction) {
  const track = document.getElementById("news-carousel-track");
  if (!track) return;

  // Calcula o novo slide
  currentSlide += direction;

  // Lógica de loop infinito
  if (currentSlide >= totalSlides) {
    currentSlide = 0;
  } else if (currentSlide < 0) {
    currentSlide = totalSlides - 1;
  }

  // Aplica a transformação CSS
  const offset = -currentSlide * 100;
  track.style.transform = `translateX(${offset}%)`;
}

/**
 * Alterna a visibilidade do menu dropdown Editorias.
 */
function toggleDropdown() {
  const menu = document.getElementById("editorias-menu");
  const arrow = document.getElementById("dropdown-arrow");

  // Verifica se o menu está visível
  const isVisible = menu.classList.contains("show");

  if (isVisible) {
    menu.classList.remove("show");
    arrow.style.transform = "rotate(0deg)";
  } else {
    menu.classList.add("show");
    arrow.style.transform = "rotate(180deg)";
  }
}

// Fecha o dropdown se o usuário clicar fora dele
document.addEventListener("click", (event) => {
  const dropdown = document.getElementById("editorias-dropdown");
  const menu = document.getElementById("editorias-menu");
  const arrow = document.getElementById("dropdown-arrow");

  // Verifica se o clique foi fora do container do dropdown
  if (dropdown && menu && !dropdown.contains(event.target)) {
    if (menu.classList.contains("show")) {
      menu.classList.remove("show");
      arrow.style.transform = "rotate(0deg)";
    }
  }
});

/**
 * Inicializa a navegação do carrossel de Instagram.
 */
function initInstaCarousel() {
  const carousel = document.getElementById("insta-carousel");
  const prevButton = document.getElementById("insta-prev");
  const nextButton = document.getElementById("insta-next");

  if (!carousel || !prevButton || !nextButton) return;

  const scrollAmount = 320; // Largura do post + gap (300px + 20px)

  prevButton.addEventListener("click", () => {
    carousel.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  });

  nextButton.addEventListener("click", () => {
    carousel.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  });
}

/**
 * Lógica para o formulário de newsletter.
 */
function handleNewsletterForm() {
  const form = document.getElementById("newsletter-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // Simula o envio de e-mail e mostra uma mensagem customizada
      const emailInput = form.querySelector('input[type="email"]');
      const message = document.createElement("p");
      message.textContent = `Obrigado por assinar, ${emailInput.value}! Em breve novidades em sua caixa de entrada.`;
      message.style.cssText =
        "margin-top: 15px; color: var(--color-primary); font-weight: bold;";

      // Remove a mensagem anterior, se houver
      const existingMessage =
        form.parentNode.querySelector(".feedback-message");
      if (existingMessage) existingMessage.remove();

      message.classList.add("feedback-message");
      form.parentNode.appendChild(message);

      // Limpa o campo (opcional)
      emailInput.value = "";
    });
  }
}

// Chama todas as funções de inicialização ao carregar a página
window.onload = function () {
  initCarousel();
  initInstaCarousel();
  handleNewsletterForm();
};
