import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { HomeHeader } from '@/components/HomeHeader'

const Home: NextPage = () => {
  const { basePath } = useRouter()

  return (
    <>
      <HomeHeader />
      <div className="manual">
        <h2>
          1.
          <a href="https://www.google.com/intl/ja_jp/forms/about/">Google Forms</a>で回答を募集する
        </h2>
        <div className="caption">
          <p>
            下記の項目を質問する。
            <br />
            オリジナル質問以外のセルは回答のフォーマットが多少崩れていても自動整形される。
          </p>
          <div className="notes">
            <p className="title">質問する項目</p>
            <ul>
              <li>部屋番号</li>
              <li>名前(性と名の間にスペースを入れてもらうこと)</li>
              <li>学部学科</li>
              <li>学年</li>
              <li>生年月日</li>
              <li>血液型</li>
              <li>携帯の電話番号</li>
              <li>帰省先の電話番号(ない場合は「なし」と答えてもらうこと)</li>
              <li>携帯のメールアドレス</li>
              <li>
                PCのメールアドレス(携帯と別のものを書いてもらうことが望ましいが、別のものがない場合は「同上」または「なし」と答えてもらうこと)
              </li>
              <li>出身高等学校(「〇〇県〇立〇〇高等学校」のように答えてもらうこと)</li>
              <li>帰省先の住所(「郵便番号 住所」のように答えてもらうこと)</li>
              <li>オリジナル質問(4つ)</li>
            </ul>
            <p className="title">自動整形の対象となるものの例</p>
            <ul>
              <li>部屋番号「201号室」-&gt;「201」</li>
              <li>学年「2」-&gt;「2年」</li>
              <li>生年月日「2001/12/2」-&gt;「2001年12月2日」</li>
              <li>血液型「A」-&gt;「A型」</li>
              <li>電話番号「0123456789」-&gt;「0123-45-6789」(「市外局番-市内局番-加入者番号」)</li>
              <li>
                住所「2230051神奈川県横浜市港北区箕輪町1丁目11番地19号慶應義塾大学日吉寄宿舎308」
                <br />
                -&gt;「〒223-0051 神奈川県横浜市港北区箕輪町1-11-19 慶應義塾大学日吉寄宿舎 308号室」
              </li>
            </ul>
          </div>
        </div>
        <h2>2.結果のスプレッドシートを編集する</h2>
        <img src={basePath + '/images/spreadsheet.png'} alt="スプレッドシートの例" />
        <div className="caption">
          <p>Google Formsの結果をスプレッドシートに出力し、それを写真のように編集する。</p>
          <div className="notes">
            <p className="title">注意事項</p>
            <ul>
              <li>
                列(アルファベット)の順番は写真と同じようにする。行(数字)の順番は気にしなくてよい。
              </li>
              <li>見出し行のA列に「部屋番号」と入れること。</li>
              <li>見出し行はA列とオリジナル質問(K-N列)以外は読み取られないので何でもよい。</li>
              <li>見出し行より上の行はA列の文字がそのまま入る。</li>
              <li>見出し行より下の行は全て舎生の情報の行になる。</li>
              <li>オリジナル質問以外のセルは自動的に整形される。</li>
              <li>
                自動整形がうまくいかなかった場合は、スプレッドシート上で改行を行う。
                <br />
                改行が一つでも入っているセルは自動整形されない。
                <br />
                電話番号の場合はハイフンを入れると自動整形されない。
              </li>
            </ul>
          </div>
        </div>
        <h2>3.CSVとして出力する</h2>
        <img src={basePath + '/images/download-as-csv.png'} alt="CSVとしてダウンロード" />
        <div className="caption">
          <p>
            Windows環境だとこのCSVをエクセルで開くと文字化けしていると思うが、そのままで問題ない。
            <br />
            文字コードUTF-8(またはBOM付き)タイプのCSVが必要である。
            <br />
            もし、名簿がうまく生成されなかったときは、エクセルを使ってCSV UTF-8に保存しなおすこと。
          </p>
        </div>

        <h2>4.このページのヘッダーのボタンを押して出力したCSVを選択し、舎生名簿を生成する</h2>
        <div className="warning">
          <div>
            <h3>注意</h3>
            <p>游明朝がインストールされてないMacなどでは正しく生成されません！</p>
          </div>
        </div>
        <img src={basePath + '/images/generate.png'} alt="舎生名簿生成" />
        <div className="caption">
          <p>
            入力CSVを選択すると、新しいタブが開き、生成された舎生名簿のページが開く。
            <br />
            ページを印刷したりPDFに変換したりするなどして保存する(上の学生部用のトグルボタンなどは自動的に消える)。
            <br />
          </p>
        </div>
        <h2>
          5.ポップアップがブロックされて生成できなかった場合は解除し、もう一度CSVファイルを選択する
        </h2>
        <img src={basePath + '/images/arrow-popup.png'} alt="ポップアップを許可" />
        <div className="caption">
          <p>
            ポップアップがブロックされた場合は「ポップアップとリダイレクトを常に許可する」を選択し、もう一度ファイル選択を押して(同じ)CSVファイルを選択し、舎生名簿を生成する。
            <br />
            なお、舎生名簿生成後にCSVデータを編集し舎生名簿の再生成を行う場合も、CSVファイルの再選択を行う必要がある。
          </p>
        </div>
      </div>
      <style jsx>{`
        .manual {
          width: 80%;
          margin: 115px auto 90px;
          padding: 1px;
        }

        .manual h2 {
          padding: 30px 28px 10px;
          border-bottom: 3px solid #333;
        }

        .manual img {
          width: 100%;
          margin-bottom: -12%;
        }

        .caption {
          position: relative;
          z-index: 1;
          padding: 56px 0;
          margin-bottom: 90px;
          text-align: center;
          background: linear-gradient(0, #fff, rgba(255, 255, 255, 0.8));
        }

        .notes {
          max-width: 900px;
          padding: 40px 80px;
          border-radius: 10px;
          background-color: #dadada;
          margin: 35px auto 0;
          text-align: start;
        }

        .notes .title {
          display: inline-block;
          margin: 10px 0 15px 40px;
          padding: 0 12px 3px;
          border-bottom: 2px solid #333;
        }

        .notes .title:not(:first-child) {
          margin-top: 26px;
        }
        .warning {
          max-width: 900px;
          padding: 20px;
          border-radius: 10px;
          border: 1px solid #d0d0d0;
          margin: 35px auto;
          text-align: center;
        }

        .warning div {
          width: fit-content;
          margin: 0 auto;
          text-align: start;
        }
      `}</style>
    </>
  )
}
export default Home
