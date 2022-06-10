import useSWR from 'swr';

import Loading from '../../../components/Loading';
import FolderButton from '../folderButton/FolderButton';
import styles from './FolderGrid.module.css';

import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../../services/context';

export default function FolderGrid() {
  const { data: device } = useSWR('/api/devices/A73HK2');

  const { currentFolder } = useContext(GlobalContext);

  useEffect(() => {
    // If no folder is selected then select the first one by default
    if (!currentFolder._id) currentFolder.setId(device.layout.folders[0]._id);
  });

  return (
    <div className={styles.container}>
      {device ? device.layout.folders.map((folder) => <FolderButton key={folder._id} folder={folder} />) : <Loading />}
    </div>
  );
}
