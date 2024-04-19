import React, { useState, useEffect } from 'react';
import { Typography, Input, Button, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';

import { StyledCard, HomeWrapper } from './style';
import { isValidUrl } from 'utils/helpers';
import { CreateShortenedUrl, SetState } from 'redux/slices/url-sclice';

const { Title, Paragraph, Text } = Typography;

const Home = () => {
  const dispatch = useDispatch();

  const {
    auth: { userId },
    url: { url: urlObj, loading, success, err },
  } = useSelector(state => state) || { auth: {}, url: {} };

  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (err) {
      setShortenedUrl('');
      message.error(err);
      setSuccessMessage('');
      dispatch(SetState({ field: 'err', value: false }));
    }
    if (success) {
      setShortenedUrl(urlObj?.shortenedUrl);
      setSuccessMessage('Success! Here is your shortened URL:');
      dispatch(SetState({ field: 'success', value: false }));
    }
  }, [success, err]);

  const handleSaveClick = () => {
    if (!url.trim() || !isValidUrl(url)) message.error('Please Enter A Valid Url');
    else {
      dispatch(CreateShortenedUrl({ url, userId }));
    }
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(shortenedUrl);
    message.success('URL copied to clipboard');
  };

  const handleInputChange = event => setUrl(event.target.value);

  return (
    <HomeWrapper>
      <StyledCard>
        <Typography>
          <Title level={3}>URL Shortner</Title>
          <Paragraph>Enter The URL To Shorten</Paragraph>
        </Typography>
        <Typography>
          <Title level={4} style={{ fontSize: '18px' }}>
            URL
          </Title>
          <Input
            placeholder="Enter Your Url"
            style={{ marginBottom: '10px' }}
            value={url}
            onChange={handleInputChange}
          />
          <Button loading={loading} disabled={successMessage} type="primary" onClick={handleSaveClick}>
            Shorten
          </Button>
        </Typography>
        {successMessage && (
          <Typography style={{ marginTop: '20px' }}>
            <Text type="success">{successMessage}</Text>
            <Paragraph>
              <Text style={{ color: 'green' }}>{shortenedUrl}</Text>
              <Button type="primary" onClick={handleCopyClick} style={{ marginLeft: '10px' }}>
                <CopyOutlined /> Copy
              </Button>
            </Paragraph>
          </Typography>
        )}
      </StyledCard>
    </HomeWrapper>
  );
};

export default Home;
