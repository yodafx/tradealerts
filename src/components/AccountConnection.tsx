import React, { useState } from 'react';
import { Card, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/lib/upload';

const AccountConnection: React.FC = () => {
  const [fileList, setFileList] = useState<RcFile[]>([]);

  const handleFileUpload = async (file: RcFile) => {
    try {
      // Here you would implement the file processing logic
      // For now, we'll just show a success message
      message.success(`File ${file.name} uploaded successfully`);
      setFileList([]);
    } catch (error) {
      message.error(`An error occurred while uploading the file`);
    }
  };

  return (
    <Card title="Import Trading Data">
      <Upload
        beforeUpload={(file) => {
          setFileList([file]);
          return false;
        }}
        fileList={fileList}
        accept=".csv,.html,.xlsx,.txt"
        onChange={info => {
          if (info.file.status !== 'uploading') {
            handleFileUpload(info.file as RcFile);
          }
        }}
      >
        <Button icon={<UploadOutlined />}>Select Trading File</Button>
      </Upload>
    </Card>
  );
};

export default AccountConnection;