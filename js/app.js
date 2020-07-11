const SECTION_MARGIN_TOP = 32;

const initNavItems = () => {
  const navElement = document.querySelector(".nav-right-section");
  const navList = ["Section 1", "Section 2", "Section 3", "Section 4"];
  const navFragment = document.createDocumentFragment();
  navList.forEach((navItem, index) => {
    const newNavElement = document.createElement("li");
    newNavElement.setAttribute("data-to", `section-${index + 1}`);
    newNavElement.innerText = navItem;
    navFragment.appendChild(newNavElement);
  });
  navElement.appendChild(navFragment);
  navElement.addEventListener("click", handleNavClick);
};

const setActiveSection = (_) => {
  const contentElement = document.querySelector("#content");
  const currentPosition = window.scrollY;
  const navElementList = document.querySelectorAll("[data-to]");
  for (let i = 0; i < contentElement.children.length; i++) {
    const sectionElement = contentElement.children[i];
    const offset = sectionElement.offsetTop - window.innerHeight / 2;
    if (currentPosition >= offset && currentPosition <= offset + sectionElement.scrollHeight) {
      sectionElement.classList = "active";
      navElementList[i].classList = "active";
    } else {
      sectionElement.classList = "";
      navElementList[i].classList = "";
    }
  }
};

const handleNavClick = (event) => {
  const targetSection = event.target.getAttribute("data-to");
  if (!targetSection) return;
  const sectionElement = document.querySelector(`[data-section=${targetSection}]`);
  const offset = sectionElement.offsetTop - SECTION_MARGIN_TOP;
  window.scrollTo({
    top: offset,
    behavior: "smooth",
  });
  setScrollToTopBtnVisibility();
};

const setScrollToTopBtnVisibility = () => {
  const currentPosition = window.scrollY;
  const scrollToTopElement = document.querySelector("#scroll-to-top");
  scrollToTopElement.style = currentPosition > SECTION_MARGIN_TOP ? "" : "display:none";
};

const handleScrollToTopClick = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  setActiveSection();
};

initNavItems();
setActiveSection();
setScrollToTopBtnVisibility();
document.addEventListener("scroll", () => {
  setActiveSection();
  setScrollToTopBtnVisibility();
});
document.querySelector("#scroll-to-top").addEventListener("click", handleScrollToTopClick);
