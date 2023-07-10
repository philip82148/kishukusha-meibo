import { AppBar, Link, Toolbar } from '@mui/material'
import { useRouter } from 'next/router'
import type { ChangeEventHandler, MouseEventHandler } from 'react'

export const HomeHeader: React.FC = () => {
  const { basePath } = useRouter()

  const onFileInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files?.length) {
      const csvUrl = URL.createObjectURL(e.target.files[0])
      window.open(`${basePath}/output?csvUrl=${encodeURIComponent(csvUrl)}`, 'output', 'popup')
    }
  }

  const onFileInputClick: MouseEventHandler<HTMLInputElement> = (e) => {
    ;(e.target as HTMLInputElement).value = ''
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: 'rgb(246, 248, 250)',
        borderBottom: '1px solid #ddd',
        color: 'text.primary',
        fontSize: '1.2em',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ height: 80, justifyContent: 'center' }}>
        <label>
          CSV UTF-8で保存したCSVファイルを選択してください
          <input
            type="file"
            name="input-csv"
            accept=".csv"
            onChange={onFileInputChange}
            onClick={onFileInputClick}
            style={{ marginLeft: 10 }}
          />
        </label>
        <Link
          href={basePath + '/example.csv'}
          download="example.csv"
          sx={{
            p: '4px 16px',
            borderRadius: '4px',
            border: '1px solid #c5c5c5',
            bgcolor: '#f0f0f0',
            textDecoration: 'none',
            color: 'inherit',
            fontSize: '0.8em',
          }}
        >
          サンプルCSVをダウンロード
        </Link>
      </Toolbar>
    </AppBar>
  )
}
