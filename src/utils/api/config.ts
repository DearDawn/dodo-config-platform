import { DATA_DIR, ROOT_INIT_FILE, FS_CONFIG } from '@/constant/api';
import dayjs from 'dayjs';
import path from 'path';

import jsonfile from 'jsonfile';
import {
  T_ITEM_INIT_CONFIG,
  T_ITEM_LOG_CONFIG,
  T_ROOT_INIT_CONFIG,
} from '@/types/api';
import { LOG_OPTION } from '@/types/enum';

export const getLogContent = (
  config: T_ITEM_INIT_CONFIG,
  mode: LOG_OPTION
): T_ITEM_LOG_CONFIG => {
  switch (mode) {
    case LOG_OPTION.create:
      return {
        option: mode,
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        operator: 'system',
        version: 0,
      };

    case LOG_OPTION.update:
      return {
        option: mode,
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        operator: 'system',
        version: config.version_latest,
      };

    case LOG_OPTION.delete:
      return {
        option: mode,
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        operator: 'system',
        version: config.version_latest,
      };

    case LOG_OPTION.rollback:
      return {
        option: mode,
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        operator: 'system',
        version: config.version_current,
      };

    default:
      return {
        option: mode,
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        operator: 'system',
        version: config.version_latest,
      };
  }
};

/** 注册/更新配置项 */
export const registerConfig = async (
  config: T_ITEM_INIT_CONFIG,
  mode: LOG_OPTION
) => {
  if (!config.name.trim()) return;

  const configFile = path.join(DATA_DIR, `${config.name}_init.json`);
  const { log, ...keyConfig } = config;

  const rootConfig = jsonfile.readFileSync(
    ROOT_INIT_FILE,
    FS_CONFIG
  ) as T_ROOT_INIT_CONFIG;

  const nameIndex = rootConfig.config_list.findIndex(
    (it) => it.name === config.name
  );

  switch (mode) {
    case LOG_OPTION.create:
      rootConfig.config_list.push(keyConfig);
      break;
    case LOG_OPTION.update:
      rootConfig.config_list[nameIndex] = keyConfig;
      config.log.push(getLogContent(config, LOG_OPTION.update));
      break;
    case LOG_OPTION.rollback:
      rootConfig.config_list[nameIndex] = keyConfig;
      config.log.push(getLogContent(config, LOG_OPTION.rollback));
      break;
    default:
      break;
  }

  jsonfile.writeFileSync(ROOT_INIT_FILE, rootConfig, FS_CONFIG);
  jsonfile.writeFileSync(configFile, config, FS_CONFIG);
};

/** 移除配置项 */
export const removeConfig = async (config: T_ITEM_INIT_CONFIG) => {
  if (!config.name.trim()) return;

  const configFile = path.join(DATA_DIR, `${config.name}_init.json`);
  const rootConfig = jsonfile.readFileSync(
    ROOT_INIT_FILE,
    FS_CONFIG
  ) as T_ROOT_INIT_CONFIG;

  const nameIndex = rootConfig.config_list.findIndex(
    (it) => it.name === config.name
  );

  if (nameIndex >= 0) {
    rootConfig.config_list.splice(nameIndex, 1);
    config.log.push(getLogContent(config, LOG_OPTION.delete));
  }

  jsonfile.writeFileSync(ROOT_INIT_FILE, rootConfig, FS_CONFIG);
  jsonfile.writeFileSync(configFile, config, FS_CONFIG);
};

export const getConfigByName = async (name = '') => {
  if (!name.trim()) return;

  const configFile = path.join(DATA_DIR, `${name}_init.json`);
  const content = jsonfile.readFileSync(
    configFile,
    FS_CONFIG
  ) as T_ITEM_INIT_CONFIG;

  return content;
};

export const getContentByName = async (name = '') => {
  if (!name.trim()) return;

  const configInfo = await getConfigByName(name);
  const version = configInfo!.version_current || 0;
  const configData = path.join(DATA_DIR, `${name}_${version}.json`);
  const content = jsonfile.readFileSync(configData, FS_CONFIG);

  return { configInfo, content };
};

export const getHistoryContent = async (name = '', version = 0) => {
  if (!name.trim()) return;

  const configData = path.join(DATA_DIR, `${name}_${version}.json`);
  const content = jsonfile.readFileSync(configData, FS_CONFIG);

  return { content };
};

/** 初始化根配置 */
export const initConfig = async (error = false) => {
  if (!error) return;

  const rootConfig: T_ROOT_INIT_CONFIG = {
    name: 'dodo-config',
    desc: '呆呆的配置版本',
    date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    config_list: [],
  };

  jsonfile.writeFileSync(ROOT_INIT_FILE, rootConfig, FS_CONFIG);
};
