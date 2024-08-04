import { create } from './create'
import { _delete } from './delete'
import { get } from './get'
import { update } from './update'

export const Stock = (nuxt) => {
  const _get = async (id) => {
    return await get(nuxt, id)
  }
  const _create = async (category) => {
    return await create(nuxt, category)
  }
  const __delete = async (id) => {
    return await _delete(nuxt, id)
  }
  const _update = async (id, category) => {
    return await update(nuxt, id, category)
  }
  return {
    get: _get,
    create: _create,
    delete: __delete,
    update: _update
  }
}
