import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/react';

const DownloadButton = () => {
  const router = useRouter();

  const handleDownloadButton = async () => {
    let a = document.createElement('a');
    a.target= '_blank';
    a.href= `${process.env.NODE_ENV === 'production' ? 'https' : 'http'}://${process.env.NEXT_PUBLIC_CONNECTION_URL}/api/download/${router.query.id}`;
    a.click();
  }

  return (
    <Button pos="absolute" top={0} right={0} size="sm" onClick={handleDownloadButton}>Download</Button>
  )
}

export default DownloadButton;
