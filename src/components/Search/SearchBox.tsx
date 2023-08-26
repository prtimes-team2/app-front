// import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { useContext, useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { AuthContext } from '../../contexts/AuthContexts';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Container, Typography } from '@mui/material';
import { Report } from '../../types/report';
import { SearchResult } from './SearchResult';

import {
  getReleaseFromPref,
  prTimesPrefecture,
} from '../../lib/prtimesPrefecture';

export const SearchBox = () => {
  const { reports, user } = useContext(AuthContext);

  // 検索キーワード
  const [keyword, setKeyword] = useState<string | null>(null);
  const [chosenTag, setChosenTag] = useState<string | null>(null);
  // 検索結果
  const [searchResultContent, setSearchResultContent] = useState<Report[]>([]);

  const theme = createTheme({
    palette: {
      background: {
        // 灰色
        default: '#f5f5f5',
      },
    },
  });

  const getData = async () => {
    // クエリの取得
    // 開いているページのURLを取得
    const url = new URL(window.location.href);
    // クエリを取得
    const query = url.searchParams.get('keyword');
    console.log(query, 'query');
    setKeyword(query);
    // todo - 検索のリクエスト
    const result = [] as Report[];

    // 一旦フロントで検索する
    if (!query) {
      result.push(...reports);
    } else {
      // 検索キーワードがreport.title or report.contentに含まれてたらresultに入れる
      reports.forEach((report) => {
        if (
          (report.title && report.title.includes(query as string)) ||
          (report.content && report.content.includes(query as string))
        ) {
          result.push(report);
        }
      });
    }
    // tagでFilterした配列
    const filteredTagArray = [] as Report[];

    console.log(chosenTag, 'chosenTag');
    // タグが指定されている場合は、タグで絞り込む
    if (chosenTag) {
      result.forEach((report) => {
        if (report.tags) {
          filteredTagArray.push(report);
        }
      });
    } else {
      filteredTagArray.push(...result);
    }

    // 検索に利用する都道府県を決める
    const name = user?.prefecture ?? '新潟県';
    // prtimesPrefectureからprefectureのidを取得
    const foundPrefecture = prTimesPrefecture.find(
      (prefecture) => prefecture.name === name
    );
    const searchPrefectureId = foundPrefecture ? foundPrefecture.id : 12;

    const pressArray = await getReleaseFromPref(searchPrefectureId);

    // resultの中にpressArrayの要素をランダムな順番で入れる
    pressArray.forEach((press) => {
      const randomIndex = Math.floor(Math.random() * filteredTagArray.length);
      // pressの値を使ってreport型に変換していく
      filteredTagArray.splice(randomIndex, 0, {
        id: press.release_id,
        address: 'PR TIMES',
        //会社名
        author: press.company_name,
        // subtitle
        content: press.subtitle,
        // タイトル
        title: press.title,
        lat: 0,
        lng: 0,
        tags: [],
        imageUrls: [press.main_image],
        created_at: '',
        user_id: press.url,
      });
    });

    //重複を削除
    const uniqueArray = filteredTagArray.filter(
      (item, index) =>
        filteredTagArray.findIndex((item2) => item.id === item2.id) === index
    );

    // idを使ってその都道府県の投稿を取得する
    setSearchResultContent(uniqueArray);
  };

  useEffect(() => {
    getData();
  }, [reports]);

  const tags = ['Food', 'Shop', 'view', 'その他'];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Container
          sx={{
            width: '100%',
            height: '145px',
            bgcolor: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'start',
            marginBottom: '5px',
          }}
        >
          {/* 検索インプット */}
          <Container
            component="form"
            sx={{
              marginTop: '5px',
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              height: '40px',
              backgroundColor: '#EBEAEA',
              borderRadius: '32px',
            }}
          >
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon sx={{ color: '#000' }} />
            </IconButton>
            <FormControl>
              <InputBase
                name="keyword"
                sx={{
                  ml: 1,
                  flex: 1,
                  color: '#000',
                  textAlign: 'center',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: '100%',
                }}
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                placeholder="スポットを検索"
                inputProps={{ 'aria-label': 'search google maps' }}
              />
            </FormControl>
          </Container>
          {/* フィルター */}
          {/* ボタンを4つ並べる */}
          <Grid
            container
            spacing={1}
            sx={{
              marginTop: '10px',
            }}
          >
            {/* tagsを.map */}
            {tags.map((tag) => (
              <Grid item xs={3} key={tag}>
                <Container
                  onClick={() => {
                    setChosenTag(tag);
                    getData();
                  }}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '90px',
                    border: '1px solid #FFE792',
                    height: '30px',
                    backgroundColor: chosenTag === tag ? '#FFE792' : 'white',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '12px',
                      fontFamily: 'Inter',
                      fontWeight: 600,
                      lineHeight: '100%',
                    }}
                  >
                    {tag}
                  </Typography>
                </Container>
              </Grid>
            ))}
          </Grid>
          {/* searchResultContentの配列の長さを表示する */}
          {/* 横向きのflexにする要素は左右に表示 */}
          <Container
            sx={{
              marginTop: '15px',
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Container
              sx={{
                fontSize: '25px',
                color: '#D9D9D9',
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: '1',
                width: '30%',
                fontFamily: 'Inter',
                justifyContent: 'flex-start',
              }}
            >
              <CountUp start={0} end={searchResultContent.length} />件
            </Container>
            <Container
              sx={{
                width: '70%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              {/* <FilterAltIcon />
              <Typography
                sx={{
                  fontSize: '12px',
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  lineHeight: '100%',
                }}
              >
                詳しく絞りこみ
              </Typography> */}
            </Container>
          </Container>
        </Container>
        {/* 検索結果 */}
        <SearchResult result={searchResultContent} />
      </div>
    </ThemeProvider>
  );
};
