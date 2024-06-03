import fsPath from 'path'
import isLocal from 'is-local'
import isRelative from 'is-relative'
import sharp from 'sharp'

export default async ({ child,
  path, }) => {
  const { properties: {
    src: url,
  } } = child

  if (!isLocal(url)) {
    return child
  }

  const sourceUrl = isRelative(url) ? fsPath.resolve(path, url) : url
  const extension = fsPath.parse(sourceUrl).ext
  switch (extension) {
    case '.svg': {
      return child
    }
    default: break
  }

  const filename = `_${fsPath.parse(sourceUrl).name}.webp`
  const destination = `${path}/.assets/${filename}`

  await sharp(sourceUrl)
    .webp({ quality: 90 })
    .toFile(destination)

  const newUrl = `.assets/${filename}`
  return {
    ...child,
    properties: {
      ...child.properties,
      src: newUrl
    }
  }
}
