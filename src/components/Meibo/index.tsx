import {
  Address,
  BirthDate,
  BloodType,
  Email,
  Grade,
  Highschool,
  Major,
  Name,
  Phone,
  Br,
} from './formatters'

import type { MeiboData, MemberData, RoomData } from '@/lib/meibo'

export const Meibo: React.FC<{
  meiboData: MeiboData
  isOfficial?: boolean
}> = ({ meiboData: { titles, header, sortedRooms }, isOfficial }) => {
  // 7行以下ごとに分ける
  let isFirst = true
  let roomsPerPage: RoomData[] = []
  let rowCount = titles.length
  const pageProps: PageProps[] = []
  for (const room of sortedRooms) {
    if (rowCount + room.length <= 7) {
      rowCount += room.length
      roomsPerPage.push(room)
      continue
    }

    if (isFirst) {
      pageProps.push({ titles, header, rooms: roomsPerPage })
      isFirst = false
    } else pageProps.push({ header, rooms: roomsPerPage })

    rowCount = room.length
    roomsPerPage = [room]
  }
  if (isFirst) pageProps.push({ titles, header, rooms: roomsPerPage })
  else pageProps.push({ header, rooms: roomsPerPage })

  return (
    <div className={isOfficial ? 'official' : ''}>
      {pageProps.map((item, i) => (
        <Page key={i} {...item} />
      ))}
    </div>
  )
}

type PageProps = {
  titles?: string[]
  header: MemberData
  rooms: RoomData[]
}
const Page: React.FC<PageProps> = ({ titles, header, rooms }) => {
  return (
    <div className="paper">
      <table>
        <tbody>
          {titles?.map((title, i) => (
            <tr key={i}>
              <td key={i} colSpan={Object.keys(header).length}>
                <Br>{title}</Br>
              </td>
            </tr>
          ))}
          <tr>
            <th className="部屋番号"></th>
            <Header header={header} />
          </tr>
          {rooms.map((room, i) => (
            <Room key={i} members={room} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

const Room: React.FC<{
  members: MemberData[]
}> = ({ members }) => {
  const [shitsucho, ...otherMembers] = members
  const roomNo = parseInt(shitsucho.部屋番号)

  return (
    <>
      <tr className="member">
        <td className="部屋番号" rowSpan={members.length}>
          {roomNo}
        </td>
        <Member memberData={shitsucho} />
      </tr>
      {otherMembers.map((member, i) => (
        <tr key={i} className="member">
          <Member memberData={member} />
        </tr>
      ))}
    </>
  )
}

const Member: React.FC<{
  memberData: MemberData
}> = ({ memberData }) => {
  return (
    <>
      <td className="名前">
        <Name>{memberData.名前}</Name>
      </td>
      <td className="学部学科学年">
        <span className="学部学科">
          <Major>{memberData.学部学科}</Major>
        </span>
        <br />
        <span className="学年">
          <Grade>{memberData.学年}</Grade>
        </span>
      </td>
      <td className="生年月日血液型">
        <span className="生年月日">
          <BirthDate>{memberData.生年月日}</BirthDate>
        </span>
        <br />
        <span className="血液型">
          <BloodType>{memberData.血液型}</BloodType>
        </span>
      </td>
      <td className="携帯帰省先の電話番号">
        <span className="携帯の電話番号">
          <Phone>{memberData.携帯の電話番号}</Phone>
        </span>
        <br />
        <span className="帰省先の電話番号">
          <Phone>{memberData.帰省先の電話番号}</Phone>
        </span>
      </td>
      <td className="携帯PCのメールアドレス">
        <span className="携帯のメールアドレス">
          <Email>{memberData.携帯のメールアドレス}</Email>
        </span>
        <br />
        <span className="PCのメールアドレス">
          <Email>{memberData.PCのメールアドレス}</Email>
        </span>
      </td>
      <td className="出身高等学校">
        <Highschool>{memberData.出身高等学校}</Highschool>
      </td>
      <td className="帰省先の住所">{<Address>{memberData.帰省先の住所}</Address>}</td>
      {memberData.original1 && (
        <td className="original original1">
          <Br>{memberData.original1}</Br>
        </td>
      )}
      {memberData.original2 && (
        <td className="original original2">
          <Br>{memberData.original2}</Br>
        </td>
      )}
      {memberData.original3 && (
        <td className="original original3">
          <Br>{memberData.original3}</Br>
        </td>
      )}
      {memberData.original4 && (
        <td className="original original4">
          <Br>{memberData.original4}</Br>
        </td>
      )}
    </>
  )
}

const Header: React.FC<{
  header: MemberData
}> = ({ header }) => {
  return (
    <>
      <th className="名前">名前</th>
      <th className="学部学科学年">
        <span className="学部学科">学部学科</span>
        <br />
        <span className="学年">学年</span>
      </th>
      <th className="生年月日血液型">
        <span className="生年月日">生年月日</span>
        <br />
        <span className="血液型">血液型</span>
      </th>
      <th className="携帯帰省先の電話番号">
        <span className="携帯の電話番号">携帯の電話番号</span>
        <span className="帰省先の電話番号">帰省先の電話番号</span>
      </th>
      <th className="携帯PCのメールアドレス">
        <span className="携帯のメールアドレス">携帯のメールアドレス</span>
        <span className="PCのメールアドレス">PCのメールアドレス</span>
      </th>
      <th className="出身高等学校">出身高等学校</th>
      <th className="帰省先の住所">帰省先の住所</th>
      {header.original1 && (
        <th className="original original1">
          <Br>{header.original1}</Br>
        </th>
      )}
      {header.original2 && (
        <th className="original original2">
          <Br>{header.original2}</Br>
        </th>
      )}
      {header.original3 && (
        <th className="original original3">
          <Br>{header.original3}</Br>
        </th>
      )}
      {header.original4 && (
        <th className="original original4">
          <Br>{header.original4}</Br>
        </th>
      )}
    </>
  )
}
