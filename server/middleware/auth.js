import jwt from "jsonwebtoken"

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        // if the token.length < 500 => this our token,
        // it token.length > 500 => this belongs to google Auth
        const isCustomAuth = token.length < 500

        let decodedData;
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test')
            req.userId = decodedData?.id

        } else {
            decodedData = jwt.decode(token)
            //  'sub' is method from Google to differnetiate each user
            req.userId = decodedData?.sub
        }

        next()

    } catch (error) {
        console.log(error)
    }
}


export default auth;