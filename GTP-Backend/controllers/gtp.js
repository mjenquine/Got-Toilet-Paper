const gtp = require('express').Router()
const Gtp = require('../models/gtp.js')

// I.N.D.U.C.E.S. //
// Index Route //
gtp.get('/', (req, res) => {
  Gtp.find({}, (err, foundGtp) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(foundGtp)
  })
})

// New Route //


// Delete Route //
gtp.delete('/:id', (req, res) => {
  Gtp.findByIdAndRemove(req.params.id, (err, deletedGtp) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(deletedGtp)
  })
})

// Update Route //
gtp.put('/:id', (req, res) => {
  Gtp.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedGtp) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(updatedGtp)
  })
})

// Create Route //
gtp.post('/', (req, res)=> {
    Gtp.create(req.body, (error, createdGtp)=>{
        if(error){
            res.status(400).json({error: error.message})
        }
        res.status(200).send(createdGtp)
    })
})

// Edit Route //

// Show Route //

module.exports = gtp
