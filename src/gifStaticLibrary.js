import config from './config'

import flatten from 'lodash/array/flatten'
import shuffle from 'lodash/collection/shuffle'

import GifLibrary from './gifLibrary'

const URLS = [
  ['cat-double-take.gif', 'https://media.giphy.com/media/Zg44yLGbvXCjm/giphy.gif'],
  ['chewbacca-smash.gif', 'https://media.giphy.com/media/10juQ7fAaQjuHS/giphy.gif'],
  ['pool-slide-fail.gif', 'https://media.giphy.com/media/EG7bbilpEg6nS/giphy.gif'],
  ['cat-drinking.gif', 'https://media.giphy.com/media/WXNqe78uXxmKs/giphy.gif'],
  ['bar-worm.gif', 'https://media.giphy.com/media/xTk9ZEXFhScuvjX9bW/giphy.gif'],
  ['sabrina-cat-slap.gif', 'https://media.giphy.com/media/eHHjV2uahglMY/giphy.gif'],
  ['dog-crazy-tongue.gif', 'https://media.giphy.com/media/z66wZincEFYYg/giphy.gif'],
  ['creepy-sports-cheer.gif', 'https://media.giphy.com/media/11LplzzRswXDgs/giphy.gif'],
  'http://media.giphy.com/media/KOS39Lrl3c4iA/giphy.gif',
  'http://media.giphy.com/media/6JvVrxP6osBdC/giphy.gif',
  'http://media.giphy.com/media/gzeYiFabZIteo/giphy.gif',
  'http://33.media.tumblr.com/tumblr_m9imsbCaLa1rxlmf0o1_500.gif',
  'http://33.media.tumblr.com/tumblr_m9gmnw0gLf1rxlmf0o1_500.gif',
  'http://33.media.tumblr.com/260d62ce36d2b5967f940f4378ac6478/tumblr_inline_npyn8iaOGM1raprkq_500.gif',
  'http://media.giphy.com/media/JqsPn9iLt2hEI/giphy.gif',
  'http://media.giphy.com/media/mlMy72avA5GM0/giphy.gif',
  'http://media.giphy.com/media/Zko99XD5cP8By/giphy.gif',
  'http://media.giphy.com/media/P34fLBYz8fSco/giphy.gif',
  'http://media.giphy.com/media/EBSiCEsg4giZO/giphy.gif',
  'http://media.giphy.com/media/10hkBpr5ua7mCc/giphy.gif',
  'http://media.giphy.com/media/Bhgb35SZjLW00/giphy.gif',
  'http://media.giphy.com/media/V5iE42pj3B6kE/giphy.gif',
  'http://media.giphy.com/media/rVeXubAormu8o/giphy.gif',
  'http://media.giphy.com/media/vDZACy278sqT6/giphy.gif',
  'http://media.giphy.com/media/YZtALRQ1wHdUQ/giphy.gif',
  'http://media.giphy.com/media/oqpicLkw58HAc/giphy.gif',
  'http://media3.giphy.com/media/ELPtC7diADV2o/giphy.gif',
  'http://38.media.tumblr.com/bf1db33233b87ecc9eb8eaaaaf59b8aa/tumblr_inline_nnwea2azzD1raprkq_500.gif',
  'http://media.giphy.com/media/icJi1WogcfJJu/giphy.gif',
  'http://media.giphy.com/media/d0HZQ47wnCovu/giphy.gif',
  'https://media.giphy.com/media/Q8OIR3s0hT5p6/giphy.gif',
  'https://media.giphy.com/media/26tPoyDhjiJ2g7rEs/giphy.gif',
  'https://media.giphy.com/media/26tOVXZALFoZdJ42I/giphy.gif',
  'https://media.giphy.com/media/QoQ2XRLi6Wity/giphy.gif',
  'https://media.giphy.com/media/Kan1AHHJmMRYA/giphy.gif',
  'https://media.giphy.com/media/6xgslyYQCyLa8/giphy.gif',
  'https://media.giphy.com/media/3o85xEjFxdWsjRGBUY/giphy.gif',
  'https://media.giphy.com/media/YCfq5ZJtlEbQc/giphy.gif',
  'https://media.giphy.com/media/8I7a41uPPoFSU/giphy.gif',
  'https://media.giphy.com/media/FwpecpDvcu7vO/giphy.gif',
  'https://media.giphy.com/media/qVVVfmHDMBZug/giphy.gif',
  'https://media.giphy.com/media/pRLlVsvRNIkg/giphy.gif',
  'https://media.giphy.com/media/5f98bs5zssg48/giphy.gif',
  'https://media.giphy.com/media/5xtDarKod5wgCsDvVUk/giphy.gif',
  'https://media.giphy.com/media/F6m56vjog5w5O/giphy.gif',
  'https://media.giphy.com/media/kDmsG1ei4P1Yc/giphy.gif',
  'https://media.giphy.com/media/5yaCPstUOV9Kw/giphy.gif',
  'https://media.giphy.com/media/EcB3xTOOLThjG/giphy.gif',
  'https://media.giphy.com/media/Bs7enjEVtXPk4/giphy.gif',
  'https://media.giphy.com/media/j3CpFpRKlq3a8/giphy.gif',
  'https://media.giphy.com/media/kanT1ZarQwtI4/giphy.gif',
  'https://media.giphy.com/media/xTiTnooneW4SYfch8Y/giphy.gif',
  'https://media.giphy.com/media/l41lR9cLxFqcJI4co/giphy.gif',
  'https://media.giphy.com/media/keZQh4mo600pi/giphy.gif',
  'https://media.giphy.com/media/xTiTnpXjPcsCmljq4E/giphy.gif',
  'https://media.giphy.com/media/qqSJWZi167ozu/giphy.gif',
  'https://media.giphy.com/media/tsIFjie7obBM4/giphy.gif',
  'https://media.giphy.com/media/5FhJdxmOCCIXm/giphy.gif',
  'https://media.giphy.com/media/13pDQ1xN6Tu3a8/giphy.gif',
  'https://media.giphy.com/media/AAHUIzS2Oo8UM/giphy.gif'
]

class GifStaticLibrary extends GifLibrary {

  constructor() {
    super()
    this._gifIndex = -1
    this._gifs = GifStaticLibrary._build(URLS)
  }

  static _build(urls) {

    const isRemote = function(url) {
      return url.match(/^http/i)
    }

    const isLocal = function(url) {
      return !isRemote(url)
    }

    return shuffle(
      urls
      .map(urlOrArray => {
        return flatten(Array.isArray(urlOrArray) ? urlOrArray : [urlOrArray], true)
      })
      .map(urlAlternates => {
        const localUrls   = urlAlternates.filter(isLocal).map(url => `${ config.static.localUrlPrefix }${ url }`)
        const remoteUrls  = urlAlternates.filter(isRemote)
        return config.static.preferLocalFiles ? localUrls.concat(remoteUrls) : remoteUrls.concat(localUrls)
      })
    )
  }

  getNextSet() {
    if (this._gifs.length) {
      this._gifIndex = (this._gifIndex + 1) % this._gifs.length
      return this._gifs[this._gifIndex]
    }
  }

}

export default GifStaticLibrary
