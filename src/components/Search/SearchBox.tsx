import { FormControl } from '@mui/base';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';

import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContexts';

import { useEffect, useState } from 'react';

import { Typography } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      // 灰色
      default: '#f5f5f5',
    },
  },
});

import { Container } from '@mui/material';
import { Report } from '../../types/report';
import { SearchResult } from './SearchResult';
export const SearchBox = () => {
  const { reports } = useContext(AuthContext);

  // 検索キーワード
  const [keyword, setKeyword] = useState<string | null>(null);
  // 検索結果
  const [searchResultContent, setSearchResultContent] = useState<Report[]>([]);

  useEffect(() => {
    // クエリの取得
    // 開いているページのURLを取得
    const url = new URL(window.location.href);
    // クエリを取得
    const query = url.searchParams.get('keyword');
    console.log(query, 'query');
    setKeyword(query);
    // todo - 検索のリクエスト
    const result = [] as Report[];

    reports.forEach((report: Report) => {
      result.push({ ...report });
    });

    setSearchResultContent(result);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Container
          sx={{
            width: '100%',
            height: '120px',
            bgcolor: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '5px',
          }}
        >
          {/* 検索インプット */}
          <Paper
            component="form"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 400,
            }}
          >
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <FormControl>
              <InputBase
                name="keyword"
                sx={{ ml: 1, flex: 1 }}
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                placeholder="スポットを検索"
                inputProps={{ 'aria-label': 'search google maps' }}
              />
            </FormControl>
          </Paper>
          {/* フィルター */}
          {/* searchResultContentの配列の長さを表示する */}
          {/* 横向きのflexにする要素は左右に表示 */}
          <Container
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{
                fontSize: '21px',
                color: '#D9D9D9',
                fontWeight: 'semiBold',
                margin: '0px',
                width: '30%',
              }}
            >
              {searchResultContent.length}件
            </Typography>

            {/* 横一列に */}
            <Container
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '70%',
              }}
            >
              <FilterAltIcon />
              <p>詳しく絞りこみ</p>
            </Container>
          </Container>
        </Container>
        {/* 検索結果 */}
        <SearchResult result={searchResultContent} />
      </div>
    </ThemeProvider>
  );
};
