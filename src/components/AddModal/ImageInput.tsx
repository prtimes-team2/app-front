import { CameraAlt } from '@mui/icons-material';
import { Button } from '@mui/material';
import { ChangeEvent } from 'react';

interface DoubleChangeProps {
  url: string;
  onChange: (file: File) => void;
}

export const ImageInput = ({ url, onChange }: DoubleChangeProps) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    // 選択されたファイルを処理するコードを追加
    if (!event.target.files) {
      return;
    }
    const selectedFile = event.target.files[0];

    onChange(selectedFile);
  };

  return (
    <div>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="custom-file"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="custom-file">
        <Button
          sx={{
            borderRadius: 2,
            padding: 2,
            border: '1px dashed',
            width: '100%',
          }}
          component="span"
        >
          {/* props.urlが空だったら、カメラアイコン,そうでなければ画像を表示 */}
          {url ? (
            <img src={url} alt="" width="100%" />
          ) : (
            <CameraAlt sx={{ fontSize: 40 }} />
          )}
        </Button>
      </label>
    </div>
  );
};
