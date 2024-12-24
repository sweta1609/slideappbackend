const express = require('express');
const router = express.Router();
const{
    createNewPresentation,
    getPresentationById,
    editExistingPresentation
 }=require("../controllers/presentation.controller")
const {protect} = require("../middlewares/validateTokenHandler")

router.route("/createnew").post(createNewPresentation)
router.route("/editexisting").post(editExistingPresentation)
router.route('/:id').get(getPresentationById)


module.exports=router;