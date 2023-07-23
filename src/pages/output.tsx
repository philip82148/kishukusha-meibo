import { Button, FormLabel, Stack, Switch } from '@mui/material'
import { parse } from 'csv-parse/sync'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import type { ChangeEventHandler } from 'react'
import { useState, useEffect } from 'react'

import { Meibo } from '@/components/Meibo'
import type { MeiboData } from '@/lib/meibo'
import { getMeiboData } from '@/lib/meibo'

const Output: NextPage = () => {
  const router = useRouter()
  const { csvUrl } = router.query as { csvUrl: string }
  const [meiboData, setMeiboData] = useState<MeiboData>()

  useEffect(() => {
    if (csvUrl) {
      void fetch(csvUrl)
        .then(async (response) => await response.text())
        .then((csvString) => {
          const csvRows = parse(csvString)
          const meiboData = getMeiboData(csvRows)
          setMeiboData(meiboData)

          URL.revokeObjectURL(csvUrl)
        })
    }
  }, [csvUrl])

  const [isOfficial, setIsOfficial] = useState<boolean>(false)
  const onToggleChanged: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsOfficial(e.target.checked)
  }

  const onPrintButtonClick = (): void => {
    window.print()
  }

  return (
    <>
      <Head>
        <title>{`舎生名簿生成器 - ${new Date().toISOString()}`}</title>
      </Head>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{
          mt: '40px',
          fontSize: '2em',
          '@media print': {
            display: 'none',
          },
        }}
      >
        <FormLabel>
          <Stack direction="row" alignItems="center">
            <Switch onChange={onToggleChanged} />
            学生部用
          </Stack>
        </FormLabel>
        <Button variant="outlined" onClick={onPrintButtonClick} sx={{ ml: 6 }}>
          印刷する
        </Button>
      </Stack>
      {meiboData && <Meibo meiboData={meiboData} isOfficial={isOfficial} />}
      <style jsx global>{`
        @page {
          size: A3 landscape;
          margin: 0;
        }

        html,
        body {
          width: 2067px;
        }

        .paper {
          width: 2067px;
          height: 1461px;
          position: relative;
          vertical-align: middle;
          font-size: 14px;
          font-family: '游明朝体', 'Yu Mincho', YuMincho;
          word-break: break-word;
        }

        table {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          table-layout: fixed;
          border-collapse: collapse;
        }

        tr {
          height: 170px;
        }

        th,
        td {
          text-align: center;
          vertical-align: middle;
          border: 1px solid #000;
          padding: 10px;
        }

        span {
          display: inline-block;
        }

        .部屋番号 {
          width: calc(15px * 2 + 22px);
        }

        .名前 {
          width: calc(15px * 6 + 22px);
        }

        .学部学科学年,
        .生年月日血液型,
        .携帯帰省先の電話番号,
        .出身高等学校 {
          width: calc(15px * 8 + 22px);
        }

        .帰省先の住所 {
          width: calc(15px * 10 + 22px);
        }

        .携帯PCのメールアドレス {
          width: calc(15px * 12 + 22px);
        }

        .original {
          width: calc(15px * 12 + 22px);
        }

        .official .学部学科学年,
        .official .出身高等学校,
        .official .帰省先の住所,
        .official .携帯PCのメールアドレス {
          width: calc(15px * 18 + 22px);
        }

        .official .original {
          display: none;
        }
      `}</style>
    </>
  )
}

export default Output
