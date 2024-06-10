import fs from 'fs'

export default ({ path }) => {
  try {
    if (!path || !path.length) {
      return false
    }
    if (!fs.lstatSync(path).isDirectory()) {
      return false
    }

    const targetPath = `${path}/notifiles.config.js`
    const exists = fs.existsSync(targetPath)
    return exists
  } catch (e) {
    return false
  }
}
