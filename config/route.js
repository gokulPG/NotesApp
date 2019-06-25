const express=require('express')
const router=express.Router()
const notesController=require('../app/controllers/notesController')
const {authenticateUser}=require('../app/middlewares/authentication')

// Notes Route

router.get('/notes',authenticateUser,notesController.list)
router.post('/notes', authenticateUser,notesController.create)
router.get('/notes/:id',authenticateUser,notesController.show)
router.put('/notes/:id',authenticateUser,notesController.update)
router.delete('/notes/:id',authenticateUser,notesController.destroy)
router.delete('/notes/removetag', authenticateUser,notesController.removeTag)


module.exports=router