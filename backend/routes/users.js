import express from "express";

import {createUser, deleteUser, getAllUser, getUser, updateUser} from '../controllers/user'

import { verifyToken } from "../utils/verifytoken";
const router = express.Router();

router.get('/checkauthentication', verifyToken, (req,res,next) => {
    res.send('hello user, you are logged in')
})

//createUser
router.post('/', createUser)

//updateUser
router.put('/:id', updateUser)

//deleteUser
router.delete('/:id', deleteUser)

//get id User
router.get('/:id', getUser)

//get all User
router.get('/', getAllUser)

export default router