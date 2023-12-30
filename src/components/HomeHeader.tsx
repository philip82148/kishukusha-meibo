import { Box, Container, Link, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import { type ChangeEventHandler, type MouseEventHandler, useState } from 'react'

export const HomeHeader: React.FC = () => {
  const { basePath } = useRouter()

  const [csvUrl, setCsvUrl] = useState<string>()

  const onFileInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (csvUrl) URL.revokeObjectURL(csvUrl)
    if (e.target.files?.length) {
      setCsvUrl(URL.createObjectURL(e.target.files[0]))
    } else {
      setCsvUrl(undefined)
    }
  }

  const onFileInputClick: MouseEventHandler<HTMLInputElement> = (e) => {
    ;(e.target as HTMLInputElement).value = ''
    if (csvUrl) {
      URL.revokeObjectURL(csvUrl)
      setCsvUrl(undefined)
    }
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 10,
        bgcolor: 'rgb(246, 248, 250)',
        borderBottom: '1px solid #ddd',
        color: 'text.primary',
        fontSize: '1.2em',
        boxShadow: 'none',
      }}
    >
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ height: 80 }}
        >
          <label>
            CSV UTF-8で保存したCSVファイルを選択してください
            <input
              type="file"
              name="input-csv"
              accept=".csv"
              onChange={onFileInputChange}
              onClick={onFileInputClick}
              style={{ marginLeft: 20 }}
            />
          </label>
          <Link
            href={csvUrl && `${basePath}/output?csvUrl=${encodeURIComponent(csvUrl)}`}
            target="output"
            sx={{
              p: '4px 16px',
              borderRadius: '4px',
              border: '1px solid #c5c5c5',
              bgcolor: '#f0f0f0',
              textDecoration: 'none',
              color: 'inherit',
              fontSize: '0.8em',
              wordBreak: 'keep-all',
            }}
          >
            生成
          </Link>
          <Link
            href={basePath + '/example.csv'}
            download="example.csv"
            sx={{
              ml: { lg: 0, xs: 2 },
              p: '4px 16px',
              borderRadius: '4px',
              border: '1px solid #c5c5c5',
              bgcolor: '#f0f0f0',
              textDecoration: 'none',
              color: 'inherit',
              fontSize: '0.8em',
            }}
          >
            <Stack direction="row" flexWrap="wrap" justifyContent="center">
              <span style={{ display: 'inline-block' }}>サンプルCSVを</span>
              <span style={{ display: 'inline-block' }}>ダウンロード</span>
            </Stack>
          </Link>
        </Stack>
      </Container>
    </Box>
  )
}
