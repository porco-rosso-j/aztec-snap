import { AddTokenParams, ApiParams, Token } from 'src/types';

export const getTokens = async (apiParams: ApiParams): Promise<Token[]> => {
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
  if (
    !checkDuplication(requestParams.token, tokens) &&
    apiParams.state?.tokens
  ) {
    tokens.push(requestParams.token);

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

const checkDuplication = (requestedToken: Token, tokens: Token[]): boolean => {
  return tokens.some((t) => t.name === requestedToken.name);
};
