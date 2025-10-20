export const scrollToSection = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    // Calculate offset for fixed navbar (64px height + some padding)
    const navbarHeight = 80;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
};

export const handleHashScroll = (hash: string) => {
  if (hash) {
    const elementId = hash.substring(1); // Remove the '#'
    // Add a small delay to ensure the page has rendered
    setTimeout(() => {
      scrollToSection(elementId);
    }, 100);
  }
};
