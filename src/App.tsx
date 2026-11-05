import { useState } from 'react'
import type { Listing, Page } from './types'
import { getListing } from './data/listings'
import CursorGlow from './components/CursorGlow'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './components/HomePage'
import ListingsPage from './components/ListingsPage'
import OwnerPage from './components/OwnerPage'
import SignInPage from './components/SignInPage'
import ListingDetailPage from './components/ListingDetailPage'

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [listingId, setListingId] = useState<number | null>(null)
  const listing = listingId ? getListing(listingId) : undefined

  function goTo(next: Page) {
    setPage(next)
    if (next !== 'detail') setListingId(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function openListing(next: Listing) {
    setListingId(next.id)
    setPage('detail')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app">
      <CursorGlow />
      <Navbar page={page} onNavigate={goTo} />
      {page === 'home' && <HomePage onNavigate={goTo} onOpenListing={openListing} />}
      {page === 'listings' && <ListingsPage onOpenListing={openListing} />}
      {page === 'owner' && <OwnerPage onNavigate={goTo} />}
      {page === 'signin' && <SignInPage />}
      {page === 'detail' && listing && (
        <ListingDetailPage listing={listing} onBack={() => goTo('listings')} onOpen={openListing} />
      )}
      <Footer onNavigate={goTo} />
    </div>
  )
}
