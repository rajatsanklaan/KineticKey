export const photosFolder = '/photos'

export const photos = {
  hero: 'hero.jpg',
  owner: 'owner.jpg',
}

export function photoSrc(fileName: string) {
  return `${photosFolder}/${fileName}`
}
