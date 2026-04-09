import express from 'express'

export const utilitiesRouter = express.Router()

// Recurso correspondiente a /health
utilitiesRouter.get('/health', (req, res, next) => {
  // Devuelve un json explicito
  res.json({
    status: 'ok',
    date: new Date().toISOString(),
  })
})
