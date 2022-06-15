import { useState, createContext } from 'react';

/* * */
/* APPSTATE */
/* Context that holds the device data and screens state. */
/* Explanation needed. */
/* * */

export const Appstate = createContext();

export default function AppstateProvider({ children }) {
  //
  // DEVICE DATA
  // This state variable holds all the data and device settings.
  const [deviceData, setDeviceData] = useState();

  // CURRENT FOLDER ID
  // The folder that is selected at the moment.
  const [currentFolder, setCurrentFolder] = useState();

  // CURRENT USER
  // The user that is logged in the app at the moment.
  const [currentUser, setCurrentUser] = useState();

  // OVERLAY COMPONENT
  // The component that is in display at the moment.
  const [overlayComponent, setOverlayComponent] = useState();

  // CONTEXT
  const contextValue = {
    device: deviceData,
    setDevice: setDeviceData,
    hasDevice: !(deviceData === null || deviceData === undefined),

    currentFolder: (() => deviceData?.layout.folders.find((folder) => folder._id === currentFolder?._id))(),
    setCurrentFolder: setCurrentFolder,
    hasCurrentFolder: !(currentFolder === null || currentFolder === undefined),

    currentUser: (() => deviceData?.users.find((user) => user._id === currentUser?._id))(),
    setCurrentUser: setCurrentUser,
    hasCurrentUser: !(currentUser === null || currentUser === undefined),

    overlay: overlayComponent,
    setOverlay: setOverlayComponent,
    hasOverlay: !(overlayComponent === null || overlayComponent === undefined),
  };

  return <Appstate.Provider value={contextValue}>{children}</Appstate.Provider>;
}
