export type UserJwt = {
    user: {
      _id: string,
      username: string
    },
    iat: number,
    exp: number
}