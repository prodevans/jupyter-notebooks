import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import {
  Menu
} from '@phosphor/widgets';

import {
  ICommandPalette
} from '@jupyterlab/apputils';

import {
  PageConfig, URLExt
} from '@jupyterlab/coreutils';

import {
  IMainMenu
} from '@jupyterlab/mainmenu';


import '../style/index.css';

/**
 * The command IDs used by the plugin.
 */
export
namespace CommandIDs {
  export
    const controlPanel: string = 'hub:control-panel';

  export
    const logout: string = 'hub:logout';
};


/**
 * Activate the jupyterhub extension.
 */
function activateHubExtension(app: JupyterLab, palette: ICommandPalette, mainMenu: IMainMenu): void {

  // This config is provided by JupyterHub to the single-user server app
  // in a dictionary: app.web_app.settings['page_config_data'].
  let hubHost = PageConfig.getOption('hub_host');
  let hubPrefix = PageConfig.getOption('hub_prefix');
  let baseUrl = PageConfig.getOption('baseUrl');

  // if (!hubPrefix) {
  //   console.log('jupyterlab-hub: No configuration found.');
  //   return;
  // }

  console.log('jupyterlab-hub: Found configuration ',
    { hubHost: hubHost, hubPrefix: hubPrefix });

  const category = 'Hub';
  const { commands } = app;

  commands.addCommand(CommandIDs.controlPanel, {
    label: 'Control Panel',
    caption: 'Open the Hub control panel in a new browser tab',
    execute: () => {
      window.open(hubHost + URLExt.join('/', 'home'), '_blank');
    }
  });

  commands.addCommand(CommandIDs.logout, {
    label: 'Logout',
    caption: 'Log out of the Hub',
    execute: () => {
      window.location.href = hubHost + URLExt.join(baseUrl, 'logout');
    }
  });

  // Add commands and menu itmes.
  let menu = new Menu({ commands });
  menu.title.label = category;
  [
    CommandIDs.controlPanel,
    CommandIDs.logout,
  ].forEach(command => {
    palette.addItem({ command, category });
    menu.addItem({ command });
  });
  mainMenu.addMenu(menu, { rank: 100 });
}

/**
 * Initialization data for the hub extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'hub',
  autoStart: true,
  requires: [
    ICommandPalette,
    IMainMenu,
  ],
  activate: activateHubExtension
};

export default extension;
