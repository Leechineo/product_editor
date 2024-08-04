import { create } from './create'
import { draft } from './draft'
import { get } from './get'
import { update } from './update'

export const Products = (nuxt) => {
  const _get = async (params = {}) => {
    return await get(nuxt, params)
  }
  const _create = async (product) => {
    return await create(nuxt, product)
  }
  const _update = async (id, product) => {
    return await update(nuxt, id, product)
  }
  const _draft = () => {
    return draft(nuxt)
  }
  return {
    get: _get,
    create: _create,
    update: _update,
    draft: _draft()
  }
}
