import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface propsType {
  questionId: number;
  profileImageUrl: string;
  content: string;
  detail: string;
  address: string;
  displayName: string;
  isFavorite: boolean;
  userId: string;
  reward: number;
}

export const QuestionCard = (props: propsType) => {
  const navigate = useNavigate();

  return (
    <Box marginBottom={1}>
      <Card
        sx={{
          display: 'flex',
          padding: 1,
        }}
      >
        <CardActionArea
          sx={{ flex: '1', display: 'flex' }}
          onClick={() => {
            if (props.address === 'PR TIMES') {
              window.open(`${props.userId}`, '_blank');
            } else {
              navigate('/app/question/' + props.questionId);
            }
          }}
        >
          <Avatar
            alt={props ? props.displayName : 'no profile'}
            src={props && props.profileImageUrl ? props.profileImageUrl : ''}
            sx={{ width: 56, height: 56, marginRight: 2 }}
          />
          <Box sx={{ flex: '1' }} position={'relative'} overflow={'hidden'}>
            <CardContent>
              <Typography
                component="div"
                variant="h6"
                width={'100%'}
                sx={{
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {props.content}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: 1,
                }}
              >
                <Typography
                  component="div"
                  variant="body2"
                  sx={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  もらえるコイン：
                </Typography>
                <Typography
                  component="div"
                  variant="body1"
                  fontWeight={'bold'}
                  sx={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  {props.reward}
                </Typography>
              </Box>
            </CardContent>
          </Box>
        </CardActionArea>
      </Card>
    </Box>
  );
};
