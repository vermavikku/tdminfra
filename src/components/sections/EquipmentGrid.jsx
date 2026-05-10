import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { equipmentCards as fallbackEquipmentCards, equipmentFilters as fallbackEquipmentFilters } from '../../data/siteData'
import CircularLoader from '../common/Loader/CircularLoader'
import { assetUrl, fetchJson } from '../../lib/api'
import { slugify } from '../../lib/assets'
import { htmlToText } from '../../lib/html'

const eyebrow = 'inline-flex items-center px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-800 text-xs font-semibold tracking-wide uppercase'

const normalizeCategory = (category) => {
  const code = String(category?.code || '').trim()
  const name = String(category?.name || '').trim()

  if (!code && !name) {
    return null
  }

  return {
    code: code || name,
    name: name || code,
  }
}

const formatCategoryLabel = (value = '') =>
  value
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())

const fallbackCardMap = new Map(fallbackEquipmentCards.map((card) => [card.slug, card]))

const fallbackCategories = fallbackEquipmentFilters
  .filter((label) => label !== 'All')
  .map((label) => ({
    code: label,
    name: label,
  }))

const categoryFallbackImageMap = new Map()
for (const card of fallbackEquipmentCards) {
  const key = String(card.category || '').toLowerCase()
  if (key && !categoryFallbackImageMap.has(key)) {
    categoryFallbackImageMap.set(key, card.image)
  }
}

const buildPaginationItems = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const items = [1]
  const left = Math.max(2, currentPage - 1)
  const right = Math.min(totalPages - 1, currentPage + 1)

  if (left > 2) {
    items.push('ellipsis-left')
  }

  for (let page = left; page <= right; page += 1) {
    items.push(page)
  }

  if (right < totalPages - 1) {
    items.push('ellipsis-right')
  }

  items.push(totalPages)
  return items
}

const EquipmentGrid = ({ compact = false }) => {
  const location = useLocation()
  const pageSize = compact ? 3 : 6
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [categories, setCategories] = useState([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [loadingMachines, setLoadingMachines] = useState(true)
  const [useFallbackData, setUseFallbackData] = useState(false)
  const [machineries, setMachineries] = useState([])
  const [remoteTotalItems, setRemoteTotalItems] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const loadCategories = async () => {
      try {
        const response = await fetchJson('/categories/dropdown/list', {
          signal: controller.signal,
        })

        if (!isMounted) {
          return
        }

        const nextCategories = Array.isArray(response?.data)
          ? response.data.map(normalizeCategory).filter(Boolean)
          : []

        setCategories(nextCategories.length ? nextCategories : fallbackCategories)
        setUseFallbackData(false)
      } catch {
        if (!isMounted || controller.signal.aborted) {
          return
        }

        setCategories(fallbackCategories)
        setUseFallbackData(true)
        setActiveFilter('ALL')
      } finally {
        if (isMounted) {
          setLoadingCategories(false)
        }
      }
    }

    loadCategories()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  useEffect(() => {
    if (loadingCategories) {
      return
    }

    if (useFallbackData) {
      return
    }

    let isMounted = true
    const controller = new AbortController()

    const loadMachineries = async () => {
      setLoadingMachines(true)

      try {
        const params = new URLSearchParams({
          page: String(currentPage),
          limit: String(pageSize),
        })

        if (activeFilter !== 'ALL') {
          params.set('category_code', activeFilter)
        }

        const response = await fetchJson(`/machineries?${params.toString()}`, {
          signal: controller.signal,
        })

        if (!isMounted) {
          return
        }

        const categoryMap = new Map(categories.map((category) => [category.code, category.name]))
        const nextMachineries = Array.isArray(response?.data)
          ? response.data.map((item) => {
              const title = String(item?.title || '').trim()
              const slug = slugify(title || String(item?.id || ''))
              const fallbackCard = fallbackCardMap.get(slug)
              const categoryCode = String(item?.category_code || '').trim()
              const categoryLabel = categoryMap.get(categoryCode) || fallbackCard?.category || formatCategoryLabel(categoryCode)
              const fallbackImage = categoryFallbackImageMap.get(String(categoryLabel).toLowerCase()) || fallbackCard?.image || '/logo/tdm-logo.jpeg'

              return {
                id: item?.id,
                title: title || 'Untitled Equipment',
                slug,
                category: categoryLabel,
                categoryCode,
                image: assetUrl(item?.image_url || fallbackImage),
                descriptionHtml: String(item?.description || '').trim(),
                detail: htmlToText(item?.description || '') || fallbackCard?.detail || `Contact us for more information about ${title || 'this equipment'}.`,
              }
            })
          : []

        setMachineries(nextMachineries)
        setRemoteTotalItems(Number(response?.total) || nextMachineries.length)
      } catch {
        if (!isMounted || controller.signal.aborted) {
          return
        }

        setUseFallbackData(true)
        setActiveFilter('ALL')
        setCurrentPage(1)
      } finally {
        if (isMounted) {
          setLoadingMachines(false)
        }
      }
    }

    loadMachineries()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [activeFilter, categories, currentPage, loadingCategories, pageSize, useFallbackData])

  const availableCategories = useMemo(() => (
    useFallbackData ? fallbackCategories : categories
  ), [categories, useFallbackData])

  const filteredFallbackCards = useMemo(() => {
    if (!useFallbackData) {
      return []
    }

    return fallbackEquipmentCards.filter((card) => {
      if (activeFilter === 'ALL') {
        return true
      }

      return card.category === activeFilter
    })
  }, [activeFilter, useFallbackData])

  const fallbackCardsForPage = useMemo(() => {
    if (!useFallbackData) {
      return []
    }

    const start = (currentPage - 1) * pageSize
    const end = start + pageSize

    return filteredFallbackCards.slice(start, end).map((card) => ({
      id: card.slug,
      title: card.title,
      slug: card.slug,
      category: card.category,
      categoryCode: card.category,
      image: card.image,
      detail: card.detail,
    }))
  }, [currentPage, filteredFallbackCards, pageSize, useFallbackData])

  const filterOptions = useMemo(() => [
    { code: 'ALL', name: 'All' },
    ...availableCategories,
  ], [availableCategories])

  const totalItems = useFallbackData ? filteredFallbackCards.length : remoteTotalItems
  const isLoading = loadingCategories || (!useFallbackData && loadingMachines)
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const paginationItems = useMemo(
    () => buildPaginationItems(currentPage, totalPages),
    [currentPage, totalPages],
  )

  const cards = useMemo(() => {
    if (isLoading) {
      return []
    }

    if (useFallbackData) {
      return fallbackCardsForPage
    }

    return machineries
  }, [fallbackCardsForPage, isLoading, machineries, useFallbackData])

  const showPagination = !compact && totalPages > 1 && !isLoading
  const showCompactCta = location.pathname !== '/equipments' && !compact

  return (
    <section className={`py-14 sm:py-16 md:py-24 ${compact ? 'pt-10 sm:pt-12' : ''}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-8 max-w-2xl animate-fade-up">
          <span className={eyebrow}>
            Our Fleet
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
            Some of our equipments
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 animate-fade-up" style={{ animationDelay: '80ms' }}>
          {filterOptions.map((filter) => (
            <button
              key={filter.code}
              type="button"
              className={`min-h-[40px] sm:min-h-[42px] px-3 sm:px-4 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeFilter === filter.code
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600'
              }`}
              onClick={() => {
                setActiveFilter(filter.code)
                setCurrentPage(1)
              }}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {isLoading ? (
          <CircularLoader label="Loading equipments" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.length === 0 ? (
              <div className="sm:col-span-2 lg:col-span-3 border border-slate-200/80 bg-white rounded-2xl p-6 sm:p-8 text-center shadow-lg shadow-slate-900/5">
                <p className="text-base sm:text-lg font-medium text-slate-900">No equipments found for this category.</p>
                <p className="mt-2 text-sm text-slate-600">Try another filter or come back once more equipment is added.</p>
                {activeFilter !== 'ALL' ? (
                  <button
                    type="button"
                    className="mt-4 inline-flex items-center justify-center min-h-[44px] px-5 rounded-full bg-blue-600 text-white text-sm font-medium shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-all"
                    onClick={() => {
                      setActiveFilter('ALL')
                      setCurrentPage(1)
                    }}
                  >
                    Show All
                  </button>
                ) : null}
              </div>
            ) : null}

            {cards.map((card, index) => (
              <article
                key={card.slug || card.id || card.title}
                className="border border-slate-200/80 bg-white rounded-2xl overflow-hidden shadow-lg shadow-slate-900/5 animate-fade-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-sky-50 p-4">
                  <img src={card.image} alt={card.title} className="w-full h-full object-contain" />
                </div>
                <div className="p-4 sm:p-5">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold">
                    {card.category}
                  </span>
                  <h3 className="mt-2.5 text-base sm:text-lg font-semibold text-slate-900 leading-tight">{card.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 equipment-summary">{card.detail}</p>
                  <Link
                    to={`/equipments/${card.id}`}
                    className="inline-flex items-center justify-center min-h-[44px] px-4 mt-4 rounded-full border border-slate-300 bg-white text-slate-800 text-sm font-medium hover:bg-slate-900 hover:!text-white transition-all"

                  >
                    View Equipment
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {showPagination && (
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-up" style={{ animationDelay: '120ms' }}>
            <p className="text-sm text-slate-600">
              Showing {Math.min((currentPage - 1) * pageSize + 1, totalItems)}-
              {Math.min(currentPage * pageSize, totalItems)} of {totalItems} equipments
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="min-h-[40px] px-4 rounded-full border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:bg-blue-600 hover:text-white hover:border-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                onClick={() => setCurrentPage((value) => Math.max(1, value - 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>

              <div className="flex flex-wrap items-center gap-2">
                {paginationItems.map((item) => (
                  typeof item === 'number' ? (
                    <button
                      key={item}
                      type="button"
                      className={`min-w-10 h-10 px-3 rounded-full text-sm font-medium transition-all ${
                        currentPage === item
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                          : 'border border-slate-200 bg-white text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                      }`}
                      onClick={() => setCurrentPage(item)}
                    >
                      {item}
                    </button>
                  ) : (
                    <span key={item} className="px-1 text-slate-400 text-sm">
                      ...
                    </span>
                  )
                ))}
              </div>

              <button
                type="button"
                className="min-h-[40px] px-4 rounded-full border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:bg-blue-600 hover:text-white hover:border-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                onClick={() => setCurrentPage((value) => Math.min(totalPages, value + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {showCompactCta && (
          <div className="flex justify-center mt-10 animate-fade-up" style={{ animationDelay: '180ms' }}>
            <Link
              to="/equipments"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full bg-blue-600 text-white font-medium shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all"
              style={{ color: '#fff' }}
            >
              See All Equipments
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default EquipmentGrid
