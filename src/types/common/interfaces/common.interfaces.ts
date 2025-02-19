import {
  Answer,
  Category,
  Offer,
  QuestionTypesEnum,
  UserResponse,
  UserRoleEnum
} from '~/types'

export interface Pagination {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface ItemsWithCount<T> {
  data: T[]
  pagination: Pagination
}

export interface CommonEntityFields {
  _id: string
  createdAt: Date
  updatedAt: Date
}

export interface CategoryAppearance {
  icon: string
  color: string
}

export interface DataByRole<T> {
  [UserRoleEnum.Student]: T
  [UserRoleEnum.Tutor]: T
}

export interface CategoryInterface extends CommonEntityFields {
  categoryName: string
  appearance: CategoryAppearance
}

export interface CategoryNameInterface {
  _id: string
  categoryName: string
}

export interface SubjectInterface extends CommonEntityFields {
  name: string
  category: string
  totalOffers: DataByRole<number>
}

export interface SubjectNameInterface {
  _id: string
  name: string
}

export interface ReviewInterface extends CommonEntityFields {
  offer: Offer
  author: UserResponse
  comment: string
  rating: number
}

export interface Faq {
  _id?: string
  question: string
  answer: string
}
export interface OutletContext {
  pageRef: React.RefObject<HTMLDivElement> | null
}

export interface Breakpoints {
  isDesktop: boolean
  isLaptopAndAbove: boolean
  isLaptop: boolean
  isTablet: boolean
  isMobile: boolean
}
export interface RouteItem {
  route: string
  path: string
}

export interface AddDocuments {
  maxFileSize: number
  maxAllFilesSize: number
  fileTypes: string[]
  fileSizeError: string
  allFilesSizeError: string
  typeError: string
  maxQuantityFiles: number
}

export interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export interface Media {
  name: string
  path: string
}

export interface File extends CommonEntityFields {
  name: string
  size: number
  url?: string
}

export interface Link {
  name: string
  url: string
}

export interface Lesson extends CommonEntityFields {
  title: string
  category?: {
    name: string
  }
}

export interface Quiz extends CommonEntityFields {
  title: string
  category?: {
    name: string
  }
}

export interface CourseResources {
  _id: string
  title: string
  category?: { _id: string; name: string }
  createdAt: Date
  updatedAt: Date
}

export interface Question {
  _id: string
  title: string
  text: string
  answers: Answer[]
  author: string
  type: QuestionTypesEnum
  category?: Category | null
  createdAt: Date
  updatedAt: Date
}

export interface CreateQuizParams {
  title: string
  description: string
  category: string | null
  items: string[]
}

export interface UpdateQuizParams {
  id: string
  title: string
  description: string
  category: string | null
  items: string[]
}
