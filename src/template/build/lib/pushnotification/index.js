import fs from 'fs'
import translate from './translate.js'
import checkFileExists from '../../../../lib/fs/checkFileExists.js'

export default async (props) => {

  const { entry } = props
  const { path,
    buildPaths,
    code,
    language } = entry

  const textPath = `${path}/pushnotification.txt`
  if (!(await checkFileExists(textPath))) {
    return {
      entry
    }
  }

  await fs.promises.cp(
    textPath,
    buildPaths.pushNotification.text
  )

  let text = await fs.promises.readFile(buildPaths.pushNotification.text, 'utf8')
  text = translate({ text: text, strings: language.data })
  text = text
    .replaceAll('|%', '{{')
    .replaceAll('%|', '}}')

  await fs.promises.writeFile(
    buildPaths.pushNotification.text,
    text
  )

  return {
    entry: {
      ...entry,
      pushNotification: {
        text,
      }
    },
  }
}
