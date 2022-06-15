import Loading from '../../../components/Loading';
import FolderButton from '../folderButton/FolderButton';
import styles from './FolderGrid.module.css';

import { useContext, useEffect } from 'react';
import { Appstate } from '../../../context/Appstate';

export default function FolderGrid() {
  //

  const appstate = useContext(Appstate);

  useEffect(() => {
    // If no folder is selected then select the first one by default
    if (!appstate.hasCurrentFolder) appstate.setCurrentFolder(appstate.device?.layout?.folders[0]);
  });

  return (
    <div className={styles.container}>
      {appstate.hasDevice ? appstate.device.layout.folders.map((folder) => <FolderButton key={folder._id} folder={folder} />) : <Loading />}
    </div>
  );
}
