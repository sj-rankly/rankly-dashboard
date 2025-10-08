/**
 * Dynamic favicon utility functions
 * Automatically generates favicon URLs for any company name
 */

/**
 * Converts a company name to a clean domain format
 * @param companyName - The company name to convert
 * @returns Clean domain-friendly string
 */
export const cleanCompanyName = (companyName: string): string => {
  return companyName
    .toLowerCase()
    .replace(/\s+/g, '') // Remove spaces
    .replace(/[^a-z0-9]/g, '') // Remove special characters
    .replace(/^(the|a|an)\s+/i, '') // Remove articles
}

/**
 * Generates multiple domain variations for better favicon detection
 * @param cleanName - Clean company name without spaces/special chars
 * @returns Array of possible domain variations
 */
export const generateDomainVariations = (cleanName: string): string[] => {
  return [
    `${cleanName}.com`,
    `${cleanName}.org`,
    `${cleanName}.net`,
    `${cleanName}.io`,
    `www.${cleanName}.com`,
    `${cleanName}.co`,
    `${cleanName}.ai`
  ]
}

/**
 * Gets a dynamic favicon URL for any company name
 * @param companyName - The company name
 * @param size - Favicon size (default: 16)
 * @returns Favicon URL
 */
export const getDynamicFaviconUrl = (companyName: string, size: number = 16, isDarkMode?: boolean): string => {
  // Special handling for Grok with theme awareness
  if (companyName === 'Grok' && isDarkMode !== undefined) {
    return getGrokFaviconUrl(isDarkMode, size)
  }
  
  // First check for known platform mappings
  const faviconMap: Record<string, string> = {
    'ChatGPT': 'https://chat.openai.com/favicon.ico',
    'Claude': 'https://claude.ai/favicon.ico',
    'Gemini': 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg',
    'Perplexity': 'https://www.perplexity.ai/favicon.ico',
    'Grok': 'https://grok.x.ai/favicon.ico'
  }
  
  // Return specific mapping if available
  if (faviconMap[companyName]) {
    return faviconMap[companyName]
  }
  
  // Fallback to dynamic generation for other companies
  const cleanName = cleanCompanyName(companyName)
  const domainVariations = generateDomainVariations(cleanName)
  
  // Use Google's favicon service with the first domain variation
  // Google's service is smart enough to find favicons for most domains
  return `https://www.google.com/s2/favicons?domain=${domainVariations[0]}&sz=${size}`
}

/**
 * Gets a theme-aware favicon URL for Grok
 * @param isDarkMode - Whether dark mode is active
 * @param size - Favicon size (default: 16)
 * @returns Theme-aware Grok favicon URL
 */
export const getGrokFaviconUrl = (isDarkMode: boolean, size: number = 16): string => {
  if (isDarkMode) {
    // Use a white/light version for dark mode
    return 'https://www.google.com/s2/favicons?domain=x.ai&sz=16&color=white'
  } else {
    // Use the original for light mode
    return 'https://grok.x.ai/favicon.ico'
  }
}

/**
 * Fallback favicon URL for when dynamic favicons fail
 * @param size - Favicon size (default: 16)
 * @returns Generic favicon URL
 */
export const getFallbackFaviconUrl = (size: number = 16): string => {
  return `https://www.google.com/s2/favicons?domain=google.com&sz=${size}`
}

/**
 * Handles favicon loading errors with fallback
 * @param event - The error event from img onError
 */
export const handleFaviconError = (event: React.SyntheticEvent<HTMLImageElement, Event>): void => {
  const target = event.currentTarget
  target.src = getFallbackFaviconUrl()
}

/**
 * Enhanced favicon component props
 */
export interface FaviconProps {
  companyName: string
  size?: number
  className?: string
  alt?: string
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void
}

/**
 * Creates favicon image props for easy use in components
 * @param props - Favicon configuration
 * @returns Image props object
 */
export const createFaviconProps = (props: FaviconProps) => {
  const { companyName, size = 16, className = "w-4 h-4 rounded-sm", alt, onError } = props
  
  return {
    src: getDynamicFaviconUrl(companyName, size),
    alt: alt || companyName,
    className,
    onError: onError || handleFaviconError
  }
}
