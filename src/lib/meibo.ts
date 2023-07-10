export type MeiboData = {
  titles: string[]
  header: MemberData
  sortedRooms: RoomData[]
}
export type MemberData = {
  部屋番号: string
  名前: string
  学部学科: string
  学年: string
  生年月日: string
  血液型: string
  携帯の電話番号: string
  帰省先の電話番号: string
  携帯のメールアドレス: string
  PCのメールアドレス: string
  出身高等学校: string
  帰省先の住所: string
  original1?: string
  original2?: string
  original3?: string
  original4?: string
}
export type RoomData = MemberData[]

function toMemberData(csvRow: string[]): MemberData {
  return {
    部屋番号: csvRow[0],
    名前: csvRow[1],
    学部学科: csvRow[2],
    学年: csvRow[3],
    生年月日: csvRow[4],
    血液型: csvRow[5],
    携帯の電話番号: csvRow[6],
    帰省先の電話番号: csvRow[7],
    携帯のメールアドレス: csvRow[8],
    PCのメールアドレス: csvRow[9],
    出身高等学校: csvRow[10],
    帰省先の住所: csvRow[11],
    ...(csvRow[12] ? { original1: csvRow[12] } : {}),
    ...(csvRow[13] ? { original2: csvRow[13] } : {}),
    ...(csvRow[14] ? { original3: csvRow[14] } : {}),
    ...(csvRow[15] ? { original4: csvRow[15] } : {}),
  }
}

export const getMeiboData = (csvRows: string[][]): MeiboData => {
  // A列が部屋番号の行を見出しと認識し、それ以前をtitlesとする
  const titles: string[] = []
  let header: MemberData | undefined
  const memberRows: string[][] = []
  for (const csvRow of csvRows) {
    if (header) {
      memberRows.push(csvRow)
    } else if (csvRow[0].replace(/\s/, '') === '部屋番号') {
      header = toMemberData(csvRow)
    } else {
      titles.push(csvRow[0])
    }
  }

  // メンバーを部屋ごとにまとめる
  const roomNos: number[] = []
  const roomNoToRoom: Record<number, RoomData> = {}
  for (const memberRow of memberRows) {
    const member = toMemberData(memberRow)
    const roomNo = parseInt(member.部屋番号)

    if (!roomNos.includes(roomNo)) {
      roomNos.push(roomNo)
      roomNoToRoom[roomNo] = []
    }

    roomNoToRoom[roomNo].push(member)
  }

  // 部屋順、学年順にソート
  const sortedRooms: RoomData[] = roomNos
    .sort((a, b) => a - b)
    .map((roomNo) => roomNoToRoom[roomNo].sort((a, b) => parseInt(b.学年) - parseInt(a.学年)))

  return { titles, header: header as MemberData, sortedRooms }
}
