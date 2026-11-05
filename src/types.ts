export type Page = 'home' | 'listings' | 'owner' | 'signin' | 'detail'

export type Listing = {
  id: number
  title: string
  location: string
  area: string
  city: string
  price: number
  billsIncluded: boolean
  roomType: string
  houseBeds: number
  meta: string
  photo: string
  photoCount: number
  available: string
  landlord: string
  landlordInitial: string
  description: string
  walking: string[]
  amenities: string[]
}
