import cn from 'classnames';
import styles from './FolderButton.module.css';

import { useContext } from 'react';
import { Appstate } from '../../../context/Appstate';

export default function FolderButton({ folder }) {
  //

  const appstate = useContext(Appstate);

  function handleClick() {
    appstate.setCurrentFolder(folder);
  }

  return (
    <div
      className={cn({
        [styles.categoryBtn]: true,
        [styles.unselected]: folder._id != appstate.currentFolder?._id,
        [styles.selected]: folder._id == appstate.currentFolder?._id,
      })}
      onClick={handleClick}
    >
      <p>{folder.title}</p>
    </div>
  );
}
