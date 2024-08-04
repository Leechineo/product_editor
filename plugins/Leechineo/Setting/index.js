import { get } from './get'
import { update } from './update'

export const Setting = (nuxt) => {
  const _get = async (name) => {
    return await get(nuxt, name)
  }
  const _update = async (id, category) => {
    return await update(nuxt, id, category)
  }
  return {
    get: _get,
    update: _update
  }
}
