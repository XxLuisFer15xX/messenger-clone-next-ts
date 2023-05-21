import bcrypt from 'bcrypt'

import prisma from '@/libs/prismadb'
import { NextApiRequest, NextApiResponse } from 'next'

type Data =
  | { message: string }
  | {
      user: object
    }

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case 'POST':
      return register(req, res)

    default:
      res.status(400).json({
        message: 'Bad request',
      })
  }
}

export const register = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) => {
  try {
    const { email, name, password } = req.body
    console.log({ email, name, password })
    if (!email || !name || !password) {
      return res.status(400).json({ message: 'Missing info' })
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    console.log({ hashedPassword })
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    })
    return res.status(200).json({ user })
  } catch (error) {
    console.log(error, 'REGISTRATION_ERROR')
    return res.status(400).json({ message: 'Internal Server Error' })
  }
}

export default handler
