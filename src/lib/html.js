export const htmlToText = (html = '') => {
  const source = String(html || '').trim()

  if (!source) {
    return ''
  }

  if (typeof DOMParser !== 'undefined') {
    try {
      const parsed = new DOMParser().parseFromString(source, 'text/html')
      return (parsed.body.textContent || '').replace(/\s+/g, ' ').trim()
    } catch {
      // Fall back to the regex path below.
    }
  }

  return source
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export const stripLeadingHeading = (html = '', headingText = 'Equipment Overview') => {
  const source = String(html || '').trim()

  if (!source || typeof DOMParser === 'undefined') {
    return source
  }

  try {
    const parser = new DOMParser()
    const document = parser.parseFromString(source, 'text/html')
    const firstElement = document.body.firstElementChild

    if (
      firstElement &&
      /^h[1-6]$/i.test(firstElement.tagName) &&
      firstElement.textContent?.trim().toLowerCase() === headingText.trim().toLowerCase()
    ) {
      firstElement.remove()
      return document.body.innerHTML.trim()
    }
  } catch {
    // If parsing fails, return the original HTML unchanged.
  }

  return source
}
