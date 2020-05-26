const paragraphObserver = () => {
  const elements = document.querySelectorAll("p");

  let options = {
    rootMargin: "0px",
    threshold: 0.3,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  }, options);

  elements.forEach((element) => {
    observer.observe(element);
  });
};

export default paragraphObserver;
