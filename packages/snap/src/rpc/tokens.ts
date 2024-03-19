import { AddTokenParams, ApiParams, Token } from 'src/types';

export const getTokens = async (apiParams: ApiParams): Promise<Token[]> => {
  // const requestParams = apiParams.requestParams as GetTokensParams;
  const tokens: Token[] = apiParams.state?.tokens as Token[];
  if (tokens.length != 0) {
    return tokens;
  } else {
    return [];
  }
};

export const addToken = async (apiParams: ApiParams) => {
  const requestParams = apiParams.requestParams as AddTokenParams;

  let tokens: Token[] = apiParams.state?.tokens as Token[];
  tokens.push(requestParams.token);
  if (apiParams.state) {
    apiParams.state.tokens = tokens;
    await snap.request({
      method: 'snap_manageState',
      params: {
        operation: 'update',
        newState: apiParams.state,
      },
    });
  }
};
