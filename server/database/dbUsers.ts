import prisma from '@libs/prismadb'

// Esta función crea o verifica el usuario de OAuth
export const oAUthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: oAuthEmail,
    },
  })
  if (user) {
    const { id, name, email } = user
    return { id, name, email }
  }
  const newUser = await prisma.user.create({
    data: {
      email: oAuthEmail,
      name: oAuthName,
      hashedPassword: '@',
    },
  })
  console.log('CREATED USER')
  const { id, name, email } = newUser
  return { id, name, email }
}
