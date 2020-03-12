export interface PostType {
  author?: AuthorType
  coverImage?: any
  date?: string
  excerpt?: string
  slug: string
  title: string
}

export interface AuthorType {
  name: string
  picture: {
    url: string
  }
}
