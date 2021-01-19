import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/react';

const DownloadButton = () => {
  const router = useRouter();

  const handleDownloadButton = async () => {
    let a = document.createElement('a');
    a.target= 'iframe';
    a.download = '';
    a.href= `${process.env.NODE_ENV === 'production' ? 'https' : 'http'}://${process.env.NEXT_PUBLIC_CONNECTION_URL}/api/download/${router.query.id}`;
    a.click();
  }

  return (
    <>
      {/*iframe hack to avoid opening the download in a new tab*/}
      <iframe name="iframe" style={{ display: 'none' }}></iframe>
      <Button ml="10px" size="sm" onClick={handleDownloadButton}>Download</Button>
    </>
  )
}

export default connect()(DownloadButton);
