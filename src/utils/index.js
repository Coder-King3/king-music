// 获取图片URL地址
export function getAssetsUrl(url, suffix = 'png', folder = 'images') {
  return new URL(`../assets/${folder}/${url}.${suffix}`, import.meta.url).href
}

// 防抖函数 - 等待规定的时间后执行函数，等待期间有调用则延迟执行时机，直到不调用函数并等待了规定时间才会调用函数
export function debounce(callback, delay, immediate = false) {
  let timer = null
  let isInvoke = false
  function _debounce(...args) {
    return new Promise((resolve, reject) => {
      try {
        // timer重复执行时清空之前定时器重新设置
        if (timer) clearTimeout(timer)

        let result = undefined
        // 首次立即执行
        if (immediate && !isInvoke) {
          result = callback.apply(this, args)
          resolve(result)
          isInvoke = true
          return
        }

        // 延迟执行对应函数
        timer = setTimeout(() => {
          result = callback.apply(this, args)
          resolve(result)
          timer = null
          isInvoke = false
        }, delay)
      } catch (error) {
        reject(error)
      }
    })
  }

  _debounce.cancel = function () {
    if (timer) clearTimeout(timer)
    timer = null
    isInvoke = false
  }

  return _debounce
}

// 节流函数 -  在固定时间内执行一次函数，不论触发多少次函数，在固定的时间内只会执行一次。
export function throttle(
  callback,
  interval,
  { leading = true, trailing = false } = {}
) {
  let startTime = 0
  let timer = null
  function _throttle(...args) {
    return new Promise((resolve, reject) => {
      try {
        const nowTime = Date.now()
        let result = undefined

        // 首次是否执行
        if (!leading && startTime === 0) startTime = nowTime

        const waitTime = interval - (nowTime - startTime)
        if (waitTime <= 0) {
          if (timer) clearTimeout(timer)
          result = callback.apply(this, args)
          resolve(result)
          startTime = nowTime
          timer = null
          return
        }

        // 尾次是否执行
        if (trailing && !timer) {
          timer = setTimeout(() => {
            result = callback.apply(this, args)
            resolve(result)
            startTime = Date.now()
            timer = null
          }, waitTime)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  _throttle.cancel = function () {
    if (timer) clearTimeout(timer)
    startTime = 0
    timer = null
  }

  return _throttle
}

export function fileDownload(url, fileNmae = 'file-content') {
  const suffix = url.split('.').at(-1)
  fetch(url)
    .then((res) => (res.status === 200 ? res.blob() : Promise.reject(res)))
    .then((blob) => {
      const url = window.URL.createObjectURL(blob)
      console.log(`url:`, url)
      const link = document.createElement('a')
      link.setAttribute('download', `${fileNmae}.${suffix}`)
      link.setAttribute('style', 'display: none;')
      link.href = url
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      // console.log('your file has downloaded!')
    })
    .catch((res) => {
      console.error('something went wrong')
      console.log(`res:`, res)
    })
}
