const CacheType = {
  Local: 'Local',
  Session: 'Session'
}

class Cache {
  constructor(type) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage
  }

  getCache(key) {
    if (!key) return console.warn('getCache key cannot be empty')
    const value = this.storage.getItem(key)
    if (value) return JSON.parse(value)
  }

  setCache(key, value) {
    if (!key && !value)
      return console.warn('setCache key and value cannot be empty')

    this.storage.setItem(key, JSON.stringify(value))
  }

  deleteCache(key) {
    if (!key) return console.warn('deleteCache key cannot be empty')

    this.storage.removeItem(key)
  }

  clearCache() {
    this.storage.clear()
  }
}

export const localCache = new Cache(CacheType.Local)
export const sessionCache = new Cache(CacheType.Session)
