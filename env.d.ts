declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string
    DATABASE_URL: string
    JWT_KEY: string
  }
}
