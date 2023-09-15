import { defineStore } from 'pinia';

interface Config {
  top_icon?: string;
  bottom_title?: string;
  bottom_icon?: string;
  background?: string;
  server_port?: number | null;
  websocket_port?: number | null;
  accountCodeExpireTime?: number | null;
  serverUrl?: string;
  socketUrl?: string;
}

interface ConfigState {
  config: Config;
}

export const useConfigStore = defineStore('server-config', {
  state: (): ConfigState => ({
    config: {},
  }),
  getters: {
    getConfig(): Config {
      return this.config;
    },
  },
  actions: {
    setConfig(info: Config) {
      this.config = info ?? null;
    },
  },
});
