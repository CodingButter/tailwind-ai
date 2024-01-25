export type ACTIONS = {
    GET_HTML: (value?: string) => Promise<string | void>;
    GET_CSS: (value?: string) => Promise<string | void>;
    GET_CONFIG: (value?: string) => Promise<string | void>;
    SET_HTML: (value?: string) => Promise<string | void>;
    SET_CSS: (value?: string) => Promise<string | void>;
    SET_CONFIG: (value?: string) => Promise<string | void>;
}

export type ACTIONS_KEYS = keyof ACTIONS;