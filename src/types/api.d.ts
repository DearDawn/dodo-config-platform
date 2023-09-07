import { LOG_OPTION } from './enum';

export type T_ROOT_INIT_CONFIG = {
  name: string;
  desc: string;
  date: string;
  config_list: T_ITEM_INIT_KEY_CONFIG[];
};

export type T_ITEM_INIT_KEY_CONFIG = {
  name: string;
  desc: string;
  /** 最新版本 */
  version_latest: number;
  /** 当前版本 */
  version_current: number;
};

export type T_ITEM_INIT_CONFIG = {
  log: T_ITEM_LOG_CONFIG[];
} & T_ITEM_INIT_KEY_CONFIG;

export type T_ITEM_LOG_CONFIG = {
  option: LOG_OPTION;
  date: string;
  operator: string;
  version: number;
};

export type T_ITEM_VERSION_CONFIG = {
  date: string;
  operator: string;
  version: number;
};
