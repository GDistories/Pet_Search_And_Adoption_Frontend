/**
 * @description 缓存
 */
class LocalCache {
  setCache(key: string, value: any) {
    return sessionStorage.setItem(key, JSON.stringify(value))
  }

  getCache(key: string) {
    // obj => string => obj
    let value = sessionStorage.getItem(key) ?? ''

    if (value !== '') {
      return JSON.parse(value)
    }
  }

  deleteCache(key: string) {
    // window.localStorage.removeItem(key)
    return sessionStorage.clear()
  }

  clearCache() {
    // window.localStorage.clear()
    sessionStorage.clear()
  }
}

export default new LocalCache()
