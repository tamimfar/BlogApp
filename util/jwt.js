import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const createToken = ({ userid }, tokenkey) => {


  const token = jwt.sign({ userid }, tokenkey);
  return token

}
export const setCookie = (res, token) => {
  return res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    maxAge: 3 * 24 * 60 * 60 * 1000
  })
}
export const decode = (token) => {

  const decoded = jwt.verify(token, process.env.TokenKey);
  return decoded
}