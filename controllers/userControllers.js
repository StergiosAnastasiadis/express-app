const authUser = async (req, res) => {
    const { email, password } = req.body
    res.json({ email, password })
}

const registerUser = (req, res) => {
    const { email, password, firstname, lastname } = req.body

    res.json({ email, password, firstname, lastname })
}

export {
    authUser,
    registerUser
}