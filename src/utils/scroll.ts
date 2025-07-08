export const scrollToSection = (sectionId: string) => {
  // Special case for contact - scroll to bottom of page
  if (sectionId === 'contact') {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    })
    return
  }
  
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}