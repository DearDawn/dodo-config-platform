import { ContentRes } from '@/pages/api/config/content.page';
import { CreateRes } from '@/pages/api/config/create.page';
import { DeleteRes } from '@/pages/api/config/delete.page';
import { HistoryRes } from '@/pages/api/config/history.page';
import { ListDataRes } from '@/pages/api/config/list.page';
import { LogRes } from '@/pages/api/config/log.page';
import { RollbackRes } from '@/pages/api/config/rollback.page';
import { UpdateRes } from '@/pages/api/config/update.page';
import { VersionRes } from '@/pages/api/config/version.page';
import qs from 'qs';
type TPath = string | `/${string}`;

const myGet = <T>(
  path: TPath,
  query?: Record<string, unknown>,
  req?: RequestInit
): Promise<T> => {
  const _url = `http://localhost:3000${path}`;
  const url = query ? `${_url}?${qs.stringify(query)}` : _url;

  return fetch(url, req)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
      return {};
    });
};

const myPost = <T>(
  path: string,
  body?: Record<string, unknown>,
  req?: RequestInit
): Promise<T> => {
  const url = `http://localhost:3000${path}`;

  return fetch(url, { ...req, body: JSON.stringify(body), method: 'POST' })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
      return {};
    });
};

const URL = {
  list: '/api/config/list',
  content: '/api/config/content',
  history: '/api/config/history',
  create: '/api/config/create',
  update: '/api/config/update',
  delete: '/api/config/delete',
  rollback: '/api/config/rollback',
  log: '/api/config/log',
  version: '/api/config/version',
} satisfies Record<string, `/api/${string}`>;

export const API = {
  fetchList: async (): Promise<ListDataRes> => {
    return myGet(URL.list);
  },
  fetchOne: async (query: { name: string }): Promise<ContentRes> => {
    return myGet(URL.content, query);
  },
  fetchHistory: async (query: {
    name: string;
    version: number;
  }): Promise<HistoryRes> => {
    return myGet(URL.history, query);
  },
  createOne: async (data: {
    name: string;
    content?: string;
  }): Promise<CreateRes> => {
    return myPost(URL.create, data);
  },
  updateOne: async (data: {
    name: string;
    content: string;
  }): Promise<UpdateRes> => {
    return myPost(URL.update, data);
  },
  rollback: async (data: {
    name: string;
    version: number;
  }): Promise<RollbackRes> => {
    return myPost(URL.rollback, data);
  },
  deleteOne: async (data: { name: string }): Promise<DeleteRes> => {
    return myPost(URL.delete, data);
  },
  log: async (query: { name: string }): Promise<LogRes> => {
    return myGet(URL.log, query);
  },
  version: async (query: { name: string }): Promise<VersionRes> => {
    return myGet(URL.version, query);
  },
};
