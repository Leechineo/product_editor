import { get } from './get'
import { getUrl } from './getUrl'
import { upload } from './upload'

export const Files = (nuxt) => {
  const _get = async (page, filters) => {
    return await get(nuxt, page, filters)
  }
  const _upload = (file, path, params) => {
    return upload(nuxt, file, path, params)
  }
  const _getUrl = (file) => {
    return getUrl(nuxt, file)
  }

  return {
    get: _get,
    upload: _upload,
    getUrl: _getUrl
  }
}
