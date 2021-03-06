const router = require('express').Router()
const {Court} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const feelings = await Court.findAll({include: [{all: true}]})
        res.json(feelings)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const court = await Court.findById(req.params.id, {include: [{all: true}]})
        console.log(court)
        res.json(court)
    } catch (error){
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const addUserToCourt = await User.addUser(req.body, { where: {id: req.body.id} })
        res.json(addUserToCourt)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
  try {
      const court = await Court.update(req.body, { where: {id: req.body.id} })
      res.json(court)
  } catch (err){
      next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
      await Court.destroy({where: {id: +req.params.id}})
      res.json(req.params.id)
  } catch (err){
      next(err)
  }
})
