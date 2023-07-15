import { AsYouType, isValidNumber } from 'libphonenumber-js'
import { Fragment } from 'react'

type FormatterType = React.FC<{ children: string }>

export const Address: FormatterType = ({ children }) => {
  children = sanitize(children)
  if (!shouldFormat(children)) return <Br>{children}</Br>

  const match = children
    .replace(/\s+/g, '')
    .match(
      /^〒?(?<zipCode1>\d{3})-?(?<zipCode2>\d{4})(?<pref>([^\d-]+[都道府県])?)(?<city>([^\d-]+[市群])?)(?<dist>([^\d-]+区)?)(?<town>.*?)(?<no>(\d+(-|丁目))?((\d+|無)(-|番地?))?(\d+(-|の))?\d+号?)(?<building>.*?)(?<roomNo>(\d+(号室?)?)?)$/,
    )

  if (match) {
    const { zipCode1, zipCode2, pref, city, dist, town, building } = match.groups as {
      zipCode1: string
      zipCode2: string
      pref: string
      city: string
      dist: string
      town: string
      building: string
    }
    const no = match?.groups?.no.replace(/丁目|番地?|号|の/g, '-').replace(/-$/, '') ?? ''
    const roomNo = match?.groups?.roomNo.replace(/(号室?)?$/, '号室') ?? ''

    const lines = []

    if (pref.length + city.length + dist.length <= 9) lines.push(pref + city + dist)
    else lines.push(pref + city, dist)

    if (town.length + no.length <= 9) lines.push(town + no)
    else lines.push(town, no)

    if (building || roomNo) {
      if (building.length + roomNo.length <= 9) lines.push(building + roomNo)
      else {
        if (building) lines.push(building)
        if (roomNo) lines.push(roomNo)
      }
    }

    return (
      <>
        <span>
          〒{zipCode1}-{zipCode2}
        </span>
        <br />
        {lines.map((line, i) => (
          <span key={i}>{line}</span>
        ))}
      </>
    )
  }

  return <>{children}</>
}

export const BirthDate: FormatterType = ({ children }) => {
  children = sanitize(children)
  if (!shouldFormat(children)) return <Br>{children}</Br>

  const match = children
    .replace(/\s+/g, '')
    .match(/^(?<year>\d{4})(年|\/)(?<month>\d{1,2})(月|\/)(?<date>\d{1,2})日?$/)

  if (match) {
    const { year, month, date } = match.groups as { year: string; month: string; date: string }
    return <>{`${parseInt(year)}年${parseInt(month)}月${parseInt(date)}日`}</>
  }

  return <>{children}</>
}

export const BloodType: FormatterType = ({ children }) => {
  children = sanitize(children)
  if (!shouldFormat(children)) return <Br>{children}</Br>

  const match = children.replace(/\s+/g, '').match(/^(?<bloodType>A|B|O|AB)型?$/)

  if (match) {
    const { bloodType } = match.groups as { bloodType: string }
    return <>{`${bloodType}型`}</>
  }

  return <>{children}</>
}

export const Br: FormatterType = ({ children }) => {
  return (
    <>
      {children.split(/\r?\n/g).map((part, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {part}
        </Fragment>
      ))}
    </>
  )
}

export const Email: FormatterType = ({ children }) => {
  children = sanitize(children)
  if (!shouldFormat(children)) return <Br>{children}</Br>

  const match = children.replace(/\s+/g, '').match(/^(?<local>[!-?A-~]+)@(?<domain>[!-?A-~]+)$/)

  if (match) {
    const { local, domain } = match.groups as { local: string; domain: string }
    if (local.length + domain.length < 20) return <>{`${local}@${domain}`}</>
    return (
      <>
        <span>{local}</span>
        <span>@{domain}</span>
      </>
    )
  }

  return <Nashi>{children}</Nashi>
}

export const Grade: FormatterType = ({ children }) => {
  children = sanitize(children)
  if (!shouldFormat(children)) return <Br>{children}</Br>

  const match = children.replace(/\s+/g, '').match(/^(?<grade>\d)年?$/)

  if (match) {
    const { grade } = match.groups as { grade: string }

    return <>{`${grade}年`}</>
  }

  return <>{children}</>
}

export const Highschool: FormatterType = ({ children }) => {
  children = sanitize(children)
  if (!shouldFormat(children)) return <Br>{children}</Br>

  const match = children
    .replace(/\s+/g, '')
    .match(
      /^(?<place>(.+[都道府県])?)[都道府県]?(?<establish>((.+市|私)?立)?)(?<name>.+)高(等学)?校$/,
    )

  if (match) {
    const { place, establish, name } = match.groups as {
      place: string
      establish: string
      name: string
    }
    const lines = []
    if (place.length + establish.length <= 7) lines.push(place + establish)
    else lines.push(place, establish)

    if (name.length + '高等学校'.length <= 7) lines.push(name + '高等学校')
    else lines.push(name, '高等学校')

    return (
      <>
        {lines.map((line, i) => (
          <span key={i}>{line}</span>
        ))}
      </>
    )
  }

  return <>{children}</>
}

export const Major: FormatterType = ({ children }) => {
  children = sanitize(children)
  if (!shouldFormat(children)) return <Br>{children}</Br>

  const match = children
    .replace(/\s+/g, '')
    .match(/^(?<faculty>.+学部)(?<depart>(.+学科)?)(?<type>(.+系)?)(?<others>.*)$/)

  if (match) {
    const { faculty, depart, type, others } = match.groups as {
      faculty: string
      depart: string
      type: string
      others: string
    }

    const lines = []
    lines.push(faculty)
    if (depart) lines.push(depart)
    if (type) lines.push(type)
    if (others) lines.push(others)

    return (
      <>
        {lines.map((line, i) => (
          <span key={i}>{line}</span>
        ))}
      </>
    )
  }

  return <>{children}</>
}

export const Name: FormatterType = ({ children }) => {
  children = sanitize(children)
  if (!shouldFormat(children)) return <Br>{children}</Br>

  const parts = children.split(/\s+/)

  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>{part}</span>
      ))}
    </>
  )
}

export const Nashi: FormatterType = ({ children }) => {
  const match = children.replace(/\s+/g, '').match(/^(無し?|なし)$/)

  if (match) return <>{`なし`}</>

  return <>{children}</>
}

export const Phone: FormatterType = ({ children }) => {
  children = sanitize(children)
  if (!shouldFormat(children)) return <Br>{children}</Br>

  const unspacedString = children.replace(/\s+/g, '')

  // 数字と国際電話の+以外のものが入っていればそのまま返す
  if (unspacedString.match(/[^\d+]/)) return <Nashi>{children}</Nashi>

  // 先頭が0と+でなければ0をつける(元がCSVなので)
  const phoneNumber = unspacedString.replace(/^(?!0|\+)/, '0')

  if (!isValidNumber(phoneNumber, 'JP')) return <>{children}</>

  return <>{new AsYouType('JP').input(phoneNumber)}</>
}

// 半角、トリム済み
function sanitize(string: string): string {
  return toHalfWidth(String(string).trim())
}

function toHalfWidth(string: string): string {
  return string.replace(/[！-～]/g, function (match) {
    return String.fromCharCode(match.charCodeAt(0) - 0xfee0)
  })
}

function shouldFormat(string: string): boolean {
  return !string.includes('\n')
}
