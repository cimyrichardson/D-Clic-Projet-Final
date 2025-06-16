document.addEventListener("DOMContentLoaded", function () {
  // Barres de compétences
  const skillBars = document.querySelectorAll(".skill-progress");

  function animateSkillBars() {
    document.querySelectorAll(".skill-item").forEach((item) => {
      const percentage = item.querySelector(
        ".skill-info span:last-child"
      ).textContent;
      const bar = item.querySelector(".skill-progress");
      bar.style.width = "0";
      setTimeout(() => {
        bar.style.width = percentage;
      }, 100);
    });
  }

  // Animation des barres de compétences quand la section est visible
  const skillsObserver = new IntersectionObserver(
    function (entries) {
      if (entries[0].isIntersecting) {
        animateSkillBars();
        skillsObserver.unobserve(entries[0].target);
      }
    },
    { threshold: 0.5 }
  );

  const skillsSection = document.querySelector("#skills");
  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }

  // Menu mobile
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    menuToggle.querySelector("i").classList.toggle("fa-times");
    menuToggle.querySelector("i").classList.toggle("fa-bars");
  });

  // Fermer le menu quand on clique sur un lien
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.querySelector("i").classList.remove("fa-times");
      menuToggle.querySelector("i").classList.add("fa-bars");
    });
  });

  // Animation au scroll
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });

  // Navigation fluide
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Validation du formulaire
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      let isValid = true;

      // Validation du nom
      const nameInput = document.getElementById("name");
      const nameError = nameInput.nextElementSibling;

      if (nameInput.value.trim() === "") {
        nameError.textContent = "Le nom est requis";
        isValid = false;
      } else {
        nameError.textContent = "";
      }

      // Validation de l'email
      const emailInput = document.getElementById("email");
      const emailError = emailInput.nextElementSibling;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (emailInput.value.trim() === "") {
        emailError.textContent = "L'email est requis";
        isValid = false;
      } else if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = "Veuillez entrer un email valide";
        isValid = false;
      } else {
        emailError.textContent = "";
      }

      // Validation du message
      const messageInput = document.getElementById("message");
      const messageError = messageInput.nextElementSibling;

      if (messageInput.value.trim() === "") {
        messageError.textContent = "Le message est requis";
        isValid = false;
      } else if (messageInput.value.length < 10) {
        messageError.textContent =
          "Le message doit contenir au moins 10 caractères";
        isValid = false;
      } else {
        messageError.textContent = "";
      }

      // Si tout est valide, on peut soumettre le formulaire
      if (isValid) {
        // Ici, vous pourriez ajouter une requête AJAX pour envoyer les données
        alert("Message envoyé avec succès !");
        contactForm.reset();
      }
    });
  }

  // Changement de couleur de la navbar au scroll
  window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.backgroundColor = "white";
      navbar.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
    }
  });
});
