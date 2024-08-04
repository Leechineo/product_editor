import { update } from './update'
import { create } from './create'
import { restore } from './restore'
import { get } from './get'

export const draft = (nuxt) => {
  const _create = () => {
    return create(nuxt)
  }
  const _update = () => {
    return update(nuxt)
  }
  const _restore = () => {
    return restore(nuxt)
  }
  const _get = () => {
    return get(nuxt)
  }
  return {
    create: _create,
    update: _update,
    restore: _restore,
    get: _get
  }
}
