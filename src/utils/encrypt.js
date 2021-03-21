import bcrypt from 'bcryptjs'

export function encrypt(password){
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  return bcrypt.hashSync(password, salt)
}
