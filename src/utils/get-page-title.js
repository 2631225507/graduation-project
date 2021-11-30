import defaultSettings from '@/settings'

const title = defaultSettings.title || '莆田力宁体育用品'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
