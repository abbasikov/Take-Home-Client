import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Modal, Input, Button, message, Tooltip } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';

import { SetState, GetUserUrlHistory, UpdateUserUrl, DeleteUserUrl } from 'redux/slices/url-sclice';

const HistoryScreen = () => {
  const dispatch = useDispatch();

  const {
    auth: { userId },
    url: { urlHistory = [], loading, success, err, message: messageText },
  } = useSelector(state => state) || { auth: {}, url: {} };

  useEffect(() => {
    dispatch(GetUserUrlHistory({ userId }));
  }, []);

  useEffect(() => {
    setData(urlHistory);
  }, [urlHistory]);

  useEffect(() => {
    if (success) {
      message.success(messageText);
      dispatch(GetUserUrlHistory({ userId }));
      dispatch(SetState({ field: 'success', value: false }));
      dispatch(SetState({ field: 'message', value: false }));
    }
    if (err) {
      dispatch(SetState({ field: 'err', value: false }));
      return message.error(err);
    }
    closeEditModal();
    closeDeleteModal();
  }, [success, err]);

  const [data, setData] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [editedUrl, setEditedUrl] = useState('');

  const openEditModal = url => {
    setSelectedUrl(url);
    setEditedUrl(url.shortenedUrl);
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
    setSelectedUrl(null);
    setEditedUrl('');
  };

  const openViewModal = url => {
    setSelectedUrl(url);
    setViewModalVisible(true);
  };

  const openDeleteModal = url => {
    setSelectedUrl(url);
    setDeleteModalVisible(true);
  };

  const closeViewModal = () => {
    setViewModalVisible(false);
    setSelectedUrl(null);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
    setSelectedUrl(null);
  };

  const handleEditUrl = () => dispatch(UpdateUserUrl({ urlId: selectedUrl?._id }));

  const handleDeleUrl = () => dispatch(DeleteUserUrl({ urlId: selectedUrl?._id }));

  const columns = [
    {
      title: 'Actual URL',
      dataIndex: 'actualUrl',
      key: 'actualUrl',
      render: text => (
        <a href={text} target="_blank">
          {text}
        </a>
      ),
    },
    {
      title: 'Shortened URL',
      dataIndex: 'shortenedUrl',
      key: 'shortenedUrl',
      render: text => (
        <a href={text} target="_blank">
          {text}
        </a>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: date => moment(date).format('YYYY MMMM DD'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <span>
          <Tooltip title="Edit Url">
            <EditOutlined style={{ marginRight: 8, cursor: 'pointer' }} onClick={() => openEditModal(record)} />
          </Tooltip>
          <Tooltip title="View Url History">
            <EyeOutlined style={{ cursor: 'pointer' }} onClick={() => openViewModal(record)} />
          </Tooltip>
          <Tooltip title="Delete Url">
            <DeleteOutlined style={{ marginLeft: 8, cursor: 'pointer' }} onClick={() => openDeleteModal(record)} />
          </Tooltip>
        </span>
      ),
    },
  ];

  const urlHistoryColumns = [
    { title: 'Previous URL', dataIndex: 'previousUrl', key: 'previousUrl' },
    { title: 'Current URL', dataIndex: 'currentUrl', key: 'currentUrl' },
    {
      title: 'Updated Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: date => moment(date).format('YYYY MMMM DD'),
    },
  ];

  return (
    <div>
      <h1>History</h1>
      <Table columns={columns} dataSource={data} rowKey="_id" />

      <Modal
        title="Edit URL"
        visible={editModalVisible}
        onCancel={closeEditModal}
        footer={[
          <Button key="cancel" onClick={closeEditModal}>
            Cancel
          </Button>,
          <Button loading={loading} disabled={loading} key="update" type="primary" onClick={handleEditUrl}>
            Update
          </Button>,
        ]}
      >
        <Input disabled={true} value={editedUrl} onChange={e => setEditedUrl(e.target.value)} />
      </Modal>
      <Modal
        title="URL History"
        visible={viewModalVisible}
        onCancel={closeViewModal}
        footer={[
          <Button key="close" onClick={closeViewModal}>
            Close
          </Button>,
        ]}
        width={800}
      >
        <Table
          dataSource={selectedUrl ? selectedUrl.urlHistory : []}
          columns={urlHistoryColumns}
          rowKey={(record, index) => index}
        />
      </Modal>
      <Modal
        title="Confirm Delete"
        visible={deleteModalVisible}
        onCancel={closeDeleteModal}
        footer={[
          <Button key="cancel" onClick={closeDeleteModal}>
            Cancel
          </Button>,
          <Button loading={loading} disabled={loading} key="delete" type="primary" onClick={handleDeleUrl}>
            Delete
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete this URL?</p>
      </Modal>
    </div>
  );
};

export default HistoryScreen;
