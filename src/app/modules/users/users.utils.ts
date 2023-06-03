import { User } from './users.model'

export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean() // lean to convert in js i and faster process

  return lastUser?.id
}

export const generateUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0')
  // increment
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  return incrementedId
}
