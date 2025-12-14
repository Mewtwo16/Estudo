import express from 'express'
import dotenv from 'dotenv'
import router from './router'
dotenv.config()
const app = express()
const PORT = process.env.PORT ?? 3000

app.use(express.json)
app.use(express.urlencoded({ extended: true }))

app.use(router)

app.listen(PORT, () => {
  console.log(`Servidor online na porta ${PORT}`)
})

export default app
