import jsonfile from 'jsonfile';
import path from 'path';

/** 配置文件路径 */
export const DATA_DIR = path.join(process.cwd(), 'public/data');
/** 根配置文件路径 */
export const ROOT_INIT_FILE = path.join(DATA_DIR, '_init.json');
/** 文件默认配置 */
export const FS_CONFIG: jsonfile.JFWriteOptions = {
  encoding: 'utf-8',
  spaces: 2,
};
