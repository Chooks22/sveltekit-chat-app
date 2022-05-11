import jwt from 'jsonwebtoken'

export type Throwable<T> = [T, null] | [null, Error]

export function createToken(payload: App.Session): Promise<Throwable<string>> {
  return new Promise(res => {
    jwt.sign(payload, process.env.JWT_KEY, (err, encoded) => {
      if (err) {
        res([null, err])
      } else {
        res([encoded!, null])
      }
    })
  })
}

export function verifyToken(token: string): Promise<Throwable<App.Session>> {
  return new Promise(res => {
    jwt.verify(token, process.env.JWT_KEY, (err, encoded) => {
      if (err) {
        res([null, err])
      } else {
        res([encoded as App.Session, null])
      }
    })
  })
}
