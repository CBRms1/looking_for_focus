const middleware = require('../utils/middleware')
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}, 'username points id')
    res.json(users)
})

usersRouter.post('/', async (req, res) => {
    const { username, password, password2 } = req.body

    // ! content missing
    if (!username || !password) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    // ! small content
    if (username.length < 3 || password.length < 5) {
        return res.status(400).json({
            error: 'small content'
        })
    }

    // ! large content
    if (username.length > 25 || password.length > 30) {
        return res.status(400).json({
            error: 'large content'
        })
    }

    // ! user already exists
    const alreadyExists = await User.exists({ username: username })
    if (alreadyExists) {
        return res.status(400).json({
            error: 'user already exists'
        })
    }

    // ! passwords are not compatible
    if (password !== password2) {
        return res.status(400).json({
            error: 'passwords are not compatible'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        passwordHash
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser)
})

usersRouter.patch('/:id', middleware.userExtractor, async(req, res) => {
    const id = req.params.id
    const points = req.body.points

    if (req.user.id !== id) {
        return res.status(403).json({ error: 'forbidden' })
    }

    const updatedUser = await User.findByIdAndUpdate(
        id,
        { points: points },
        { new: true, runValidators: true }
    )

    if (!updatedUser) {
        return res.status(404).end()
    }

    res.status(200).json(updatedUser)
})

module.exports = usersRouter