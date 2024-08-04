import { getMatches } from '@tauri-apps/api/cli'

async function getJwt () {
  const matches = await getMatches()
  return matches.args.jwtToken.value
}

export default function ({ $axios }) {
  $axios.onRequest(async (config) => {
    const token = await getJwt()
    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`
    }
    return config
  })
}
