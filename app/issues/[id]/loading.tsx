import { Flex, Card, Box } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LoadingIssueDetailPage = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton />
      <Flex gap={'2'} my='2'>
        <Skeleton width='3rem' />
        <Skeleton width='5rem' />
      </Flex>
      <Card className='prose mt-4'>
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
