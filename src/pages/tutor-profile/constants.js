export const responseMock = {
  user: {
    _id: '6406eec81826f1e46fb6e05c',
    role: 'tutor',
    firstName: 'John',
    lastName: 'Doe',
    email: 'nataha-backend-queen@gmail.com',
    categories: [],
    mainSubjects: {
      student: [],
      tutor: [
        {
          _id: '645b9f4a1c0272f5cde0e11e',
          name: 'Danish',
          category: '6459347d943e375d1c0a1912',
          totalOffers: 0
        },
        {
          _id: '6422d995d898aa732d038e8f',
          name: 'Guitar',
          category: '6421ed8ed991d46a84721dfa',
          totalOffers: 4
        },
        {
          _id: '6422ad6a74c1353b96c7c132',
          name: 'Web design',
          category: '6421ed8ed991d46a84721df4',
          totalOffers: 9
        }
      ]
    },
    totalReviews: 0,
    averageRating: 3,
    isEmailConfirmed: true,
    isFirstLogin: true,
    lastLogin: null,
    lastLoginAs: 'student',
    bookmarkedOffers: [],
    createdAt: '2023-03-07T07:59:04.615Z',
    updatedAt: '2023-03-07T07:59:04.615Z',
    reviewStats: {
      reviews: [
        {
          count: 1,
          rating: 1
        },
        {
          count: 1,
          rating: 3
        },
        {
          count: 3,
          rating: 5
        },
        {
          count: 2,
          rating: 4
        }
      ],
      totalReviews: 10,
      averageRating: 4.5
    }
  }
}
