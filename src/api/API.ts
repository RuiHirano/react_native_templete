/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  name: string,
  description: string,
  email: string,
  avatar: ImageInput,
  birthday?: string | null,
  sex: string,
  settings: SettingsInput,
};

export type ImageInput = {
  id: string,
  uri: string,
  size: number,
};

export type SettingsInput = {
  initAccountBalance: number,
  language: string,
  notification: NotificationInput,
  instruments: Array< string | null >,
  plan: string,
  device: string,
};

export type NotificationInput = {
  email: boolean,
  push: boolean,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  email?: ModelStringInput | null,
  birthday?: ModelStringInput | null,
  sex?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  email?: string | null,
  avatar?: ImageInput | null,
  birthday?: string | null,
  sex?: string | null,
  settings?: SettingsInput | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateForexTransactionInput = {
  id?: string | null,
  orderTime: string,
  closeTime: string,
  side: string,
  isRecord: boolean,
  instrument: string,
  lot: number,
  price: number,
  takeProfit: number,
  stopLoss: number,
  close: number,
  pl: number,
  preComment: string,
  postComment: string,
  tags: Array< string | null >,
  images: Array< ImageInput | null >,
  userId: string,
};

export type ModelForexTransactionConditionInput = {
  orderTime?: ModelStringInput | null,
  closeTime?: ModelStringInput | null,
  side?: ModelStringInput | null,
  isRecord?: ModelBooleanInput | null,
  instrument?: ModelStringInput | null,
  lot?: ModelFloatInput | null,
  price?: ModelFloatInput | null,
  takeProfit?: ModelFloatInput | null,
  stopLoss?: ModelFloatInput | null,
  close?: ModelFloatInput | null,
  pl?: ModelFloatInput | null,
  preComment?: ModelStringInput | null,
  postComment?: ModelStringInput | null,
  tags?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  and?: Array< ModelForexTransactionConditionInput | null > | null,
  or?: Array< ModelForexTransactionConditionInput | null > | null,
  not?: ModelForexTransactionConditionInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateForexTransactionInput = {
  id: string,
  orderTime?: string | null,
  closeTime?: string | null,
  side?: string | null,
  isRecord?: boolean | null,
  instrument?: string | null,
  lot?: number | null,
  price?: number | null,
  takeProfit?: number | null,
  stopLoss?: number | null,
  close?: number | null,
  pl?: number | null,
  preComment?: string | null,
  postComment?: string | null,
  tags?: Array< string | null > | null,
  images?: Array< ImageInput | null > | null,
  userId?: string | null,
};

export type DeleteForexTransactionInput = {
  id: string,
};

export type CreateAccountTransactionInput = {
  id?: string | null,
  time: string,
  type: string,
  amount: number,
  comment: string,
  tags: Array< string | null >,
  images: Array< ImageInput | null >,
  userId: string,
};

export type ModelAccountTransactionConditionInput = {
  time?: ModelStringInput | null,
  type?: ModelStringInput | null,
  amount?: ModelIntInput | null,
  comment?: ModelStringInput | null,
  tags?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  and?: Array< ModelAccountTransactionConditionInput | null > | null,
  or?: Array< ModelAccountTransactionConditionInput | null > | null,
  not?: ModelAccountTransactionConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateAccountTransactionInput = {
  id: string,
  time?: string | null,
  type?: string | null,
  amount?: number | null,
  comment?: string | null,
  tags?: Array< string | null > | null,
  images?: Array< ImageInput | null > | null,
  userId?: string | null,
};

export type DeleteAccountTransactionInput = {
  id: string,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  email?: ModelStringInput | null,
  birthday?: ModelStringInput | null,
  sex?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelForexTransactionFilterInput = {
  id?: ModelIDInput | null,
  orderTime?: ModelStringInput | null,
  closeTime?: ModelStringInput | null,
  side?: ModelStringInput | null,
  isRecord?: ModelBooleanInput | null,
  instrument?: ModelStringInput | null,
  lot?: ModelFloatInput | null,
  price?: ModelFloatInput | null,
  takeProfit?: ModelFloatInput | null,
  stopLoss?: ModelFloatInput | null,
  close?: ModelFloatInput | null,
  pl?: ModelFloatInput | null,
  preComment?: ModelStringInput | null,
  postComment?: ModelStringInput | null,
  tags?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  and?: Array< ModelForexTransactionFilterInput | null > | null,
  or?: Array< ModelForexTransactionFilterInput | null > | null,
  not?: ModelForexTransactionFilterInput | null,
};

export type ModelAccountTransactionFilterInput = {
  id?: ModelIDInput | null,
  time?: ModelStringInput | null,
  type?: ModelStringInput | null,
  amount?: ModelIntInput | null,
  comment?: ModelStringInput | null,
  tags?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  and?: Array< ModelAccountTransactionFilterInput | null > | null,
  or?: Array< ModelAccountTransactionFilterInput | null > | null,
  not?: ModelAccountTransactionFilterInput | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    id: string,
    name: string,
    description: string,
    email: string,
    avatar:  {
      __typename: "Image",
      id: string,
      uri: string,
      size: number,
    },
    birthday: string | null,
    sex: string,
    settings:  {
      __typename: "Settings",
      initAccountBalance: number,
      language: string,
      notification:  {
        __typename: "Notification",
        email: boolean,
        push: boolean,
      },
      instruments: Array< string | null >,
      plan: string,
      device: string,
    },
    forexTransactions:  {
      __typename: "ModelForexTransactionConnection",
      items:  Array< {
        __typename: "ForexTransaction",
        id: string,
        orderTime: string,
        closeTime: string,
        side: string,
        isRecord: boolean,
        instrument: string,
        lot: number,
        price: number,
        takeProfit: number,
        stopLoss: number,
        close: number,
        pl: number,
        preComment: string,
        postComment: string,
        tags: Array< string | null >,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    accountTransactions:  {
      __typename: "ModelAccountTransactionConnection",
      items:  Array< {
        __typename: "AccountTransaction",
        id: string,
        time: string,
        type: string,
        amount: number,
        comment: string,
        tags: Array< string | null >,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    id: string,
    name: string,
    description: string,
    email: string,
    avatar:  {
      __typename: "Image",
      id: string,
      uri: string,
      size: number,
    },
    birthday: string | null,
    sex: string,
    settings:  {
      __typename: "Settings",
      initAccountBalance: number,
      language: string,
      notification:  {
        __typename: "Notification",
        email: boolean,
        push: boolean,
      },
      instruments: Array< string | null >,
      plan: string,
      device: string,
    },
    forexTransactions:  {
      __typename: "ModelForexTransactionConnection",
      items:  Array< {
        __typename: "ForexTransaction",
        id: string,
        orderTime: string,
        closeTime: string,
        side: string,
        isRecord: boolean,
        instrument: string,
        lot: number,
        price: number,
        takeProfit: number,
        stopLoss: number,
        close: number,
        pl: number,
        preComment: string,
        postComment: string,
        tags: Array< string | null >,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    accountTransactions:  {
      __typename: "ModelAccountTransactionConnection",
      items:  Array< {
        __typename: "AccountTransaction",
        id: string,
        time: string,
        type: string,
        amount: number,
        comment: string,
        tags: Array< string | null >,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser:  {
    __typename: "User",
    id: string,
    name: string,
    description: string,
    email: string,
    avatar:  {
      __typename: "Image",
      id: string,
      uri: string,
      size: number,
    },
    birthday: string | null,
    sex: string,
    settings:  {
      __typename: "Settings",
      initAccountBalance: number,
      language: string,
      notification:  {
        __typename: "Notification",
        email: boolean,
        push: boolean,
      },
      instruments: Array< string | null >,
      plan: string,
      device: string,
    },
    forexTransactions:  {
      __typename: "ModelForexTransactionConnection",
      items:  Array< {
        __typename: "ForexTransaction",
        id: string,
        orderTime: string,
        closeTime: string,
        side: string,
        isRecord: boolean,
        instrument: string,
        lot: number,
        price: number,
        takeProfit: number,
        stopLoss: number,
        close: number,
        pl: number,
        preComment: string,
        postComment: string,
        tags: Array< string | null >,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    accountTransactions:  {
      __typename: "ModelAccountTransactionConnection",
      items:  Array< {
        __typename: "AccountTransaction",
        id: string,
        time: string,
        type: string,
        amount: number,
        comment: string,
        tags: Array< string | null >,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateForexTransactionMutationVariables = {
  input: CreateForexTransactionInput,
  condition?: ModelForexTransactionConditionInput | null,
};

export type CreateForexTransactionMutation = {
  createForexTransaction:  {
    __typename: "ForexTransaction",
    id: string,
    orderTime: string,
    closeTime: string,
    side: string,
    isRecord: boolean,
    instrument: string,
    lot: number,
    price: number,
    takeProfit: number,
    stopLoss: number,
    close: number,
    pl: number,
    preComment: string,
    postComment: string,
    tags: Array< string | null >,
    images:  Array< {
      __typename: "Image",
      id: string,
      uri: string,
      size: number,
    } | null >,
    userId: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      description: string,
      email: string,
      avatar:  {
        __typename: "Image",
        id: string,
        uri: string,
        size: number,
      },
      birthday: string | null,
      sex: string,
      settings:  {
        __typename: "Settings",
        initAccountBalance: number,
        language: string,
        instruments: Array< string | null >,
        plan: string,
        device: string,
      },
      forexTransactions:  {
        __typename: "ModelForexTransactionConnection",
        nextToken: string | null,
      } | null,
      accountTransactions:  {
        __typename: "ModelAccountTransactionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateForexTransactionMutationVariables = {
  input: UpdateForexTransactionInput,
  condition?: ModelForexTransactionConditionInput | null,
};

export type UpdateForexTransactionMutation = {
  updateForexTransaction:  {
    __typename: "ForexTransaction",
    id: string,
    orderTime: string,
    closeTime: string,
    side: string,
    isRecord: boolean,
    instrument: string,
    lot: number,
    price: number,
    takeProfit: number,
    stopLoss: number,
    close: number,
    pl: number,
    preComment: string,
    postComment: string,
    tags: Array< string | null >,
    images:  Array< {
      __typename: "Image",
      id: string,
      uri: string,
      size: number,
    } | null >,
    userId: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      description: string,
      email: string,
      avatar:  {
        __typename: "Image",
        id: string,
        uri: string,
        size: number,
      },
      birthday: string | null,
      sex: string,
      settings:  {
        __typename: "Settings",
        initAccountBalance: number,
        language: string,
        instruments: Array< string | null >,
        plan: string,
        device: string,
      },
      forexTransactions:  {
        __typename: "ModelForexTransactionConnection",
        nextToken: string | null,
      } | null,
      accountTransactions:  {
        __typename: "ModelAccountTransactionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteForexTransactionMutationVariables = {
  input: DeleteForexTransactionInput,
  condition?: ModelForexTransactionConditionInput | null,
};

export type DeleteForexTransactionMutation = {
  deleteForexTransaction:  {
    __typename: "ForexTransaction",
    id: string,
    orderTime: string,
    closeTime: string,
    side: string,
    isRecord: boolean,
    instrument: string,
    lot: number,
    price: number,
    takeProfit: number,
    stopLoss: number,
    close: number,
    pl: number,
    preComment: string,
    postComment: string,
    tags: Array< string | null >,
    images:  Array< {
      __typename: "Image",
      id: string,
      uri: string,
      size: number,
    } | null >,
    userId: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      description: string,
      email: string,
      avatar:  {
        __typename: "Image",
        id: string,
        uri: string,
        size: number,
      },
      birthday: string | null,
      sex: string,
      settings:  {
        __typename: "Settings",
        initAccountBalance: number,
        language: string,
        instruments: Array< string | null >,
        plan: string,
        device: string,
      },
      forexTransactions:  {
        __typename: "ModelForexTransactionConnection",
        nextToken: string | null,
      } | null,
      accountTransactions:  {
        __typename: "ModelAccountTransactionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateAccountTransactionMutationVariables = {
  input: CreateAccountTransactionInput,
  condition?: ModelAccountTransactionConditionInput | null,
};

export type CreateAccountTransactionMutation = {
  createAccountTransaction:  {
    __typename: "AccountTransaction",
    id: string,
    time: string,
    type: string,
    amount: number,
    comment: string,
    tags: Array< string | null >,
    images:  Array< {
      __typename: "Image",
      id: string,
      uri: string,
      size: number,
    } | null >,
    userId: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      description: string,
      email: string,
      avatar:  {
        __typename: "Image",
        id: string,
        uri: string,
        size: number,
      },
      birthday: string | null,
      sex: string,
      settings:  {
        __typename: "Settings",
        initAccountBalance: number,
        language: string,
        instruments: Array< string | null >,
        plan: string,
        device: string,
      },
      forexTransactions:  {
        __typename: "ModelForexTransactionConnection",
        nextToken: string | null,
      } | null,
      accountTransactions:  {
        __typename: "ModelAccountTransactionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAccountTransactionMutationVariables = {
  input: UpdateAccountTransactionInput,
  condition?: ModelAccountTransactionConditionInput | null,
};

export type UpdateAccountTransactionMutation = {
  updateAccountTransaction:  {
    __typename: "AccountTransaction",
    id: string,
    time: string,
    type: string,
    amount: number,
    comment: string,
    tags: Array< string | null >,
    images:  Array< {
      __typename: "Image",
      id: string,
      uri: string,
      size: number,
    } | null >,
    userId: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      description: string,
      email: string,
      avatar:  {
        __typename: "Image",
        id: string,
        uri: string,
        size: number,
      },
      birthday: string | null,
      sex: string,
      settings:  {
        __typename: "Settings",
        initAccountBalance: number,
        language: string,
        instruments: Array< string | null >,
        plan: string,
        device: string,
      },
      forexTransactions:  {
        __typename: "ModelForexTransactionConnection",
        nextToken: string | null,
      } | null,
      accountTransactions:  {
        __typename: "ModelAccountTransactionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAccountTransactionMutationVariables = {
  input: DeleteAccountTransactionInput,
  condition?: ModelAccountTransactionConditionInput | null,
};

export type DeleteAccountTransactionMutation = {
  deleteAccountTransaction:  {
    __typename: "AccountTransaction",
    id: string,
    time: string,
    type: string,
    amount: number,
    comment: string,
    tags: Array< string | null >,
    images:  Array< {
      __typename: "Image",
      id: string,
      uri: string,
      size: number,
    } | null >,
    userId: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      description: string,
      email: string,
      avatar:  {
        __typename: "Image",
        id: string,
        uri: string,
        size: number,
      },
      birthday: string | null,
      sex: string,
      settings:  {
        __typename: "Settings",
        initAccountBalance: number,
        language: string,
        instruments: Array< string | null >,
        plan: string,
        device: string,
      },
      forexTransactions:  {
        __typename: "ModelForexTransactionConnection",
        nextToken: string | null,
      } | null,
      accountTransactions:  {
        __typename: "ModelAccountTransactionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    name: string,
    description: string,
    email: string,
    avatar:  {
      __typename: "Image",
      id: string,
      uri: string,
      size: number,
    },
    birthday: string | null,
    sex: string,
    settings:  {
      __typename: "Settings",
      initAccountBalance: number,
      language: string,
      notification:  {
        __typename: "Notification",
        email: boolean,
        push: boolean,
      },
      instruments: Array< string | null >,
      plan: string,
      device: string,
    },
    forexTransactions:  {
      __typename: "ModelForexTransactionConnection",
      items:  Array< {
        __typename: "ForexTransaction",
        id: string,
        orderTime: string,
        closeTime: string,
        side: string,
        isRecord: boolean,
        instrument: string,
        lot: number,
        price: number,
        takeProfit: number,
        stopLoss: number,
        close: number,
        pl: number,
        preComment: string,
        postComment: string,
        tags: Array< string | null >,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    accountTransactions:  {
      __typename: "ModelAccountTransactionConnection",
      items:  Array< {
        __typename: "AccountTransaction",
        id: string,
        time: string,
        type: string,
        amount: number,
        comment: string,
        tags: Array< string | null >,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  id?: string | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUsersQuery = {
  listUsers:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string,
      description: string,
      email: string,
      avatar:  {
        __typename: "Image",
        id: string,
        uri: string,
        size: number,
      },
      birthday: string | null,
      sex: string,
      settings:  {
        __typename: "Settings",
        initAccountBalance: number,
        language: string,
        instruments: Array< string | null >,
        plan: string,
        device: string,
      },
      forexTransactions:  {
        __typename: "ModelForexTransactionConnection",
        nextToken: string | null,
      } | null,
      accountTransactions:  {
        __typename: "ModelAccountTransactionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetForexTransactionQueryVariables = {
  id: string,
};

export type GetForexTransactionQuery = {
  getForexTransaction:  {
    __typename: "ForexTransaction",
    id: string,
    orderTime: string,
    closeTime: string,
    side: string,
    isRecord: boolean,
    instrument: string,
    lot: number,
    price: number,
    takeProfit: number,
    stopLoss: number,
    close: number,
    pl: number,
    preComment: string,
    postComment: string,
    tags: Array< string | null >,
    images:  Array< {
      __typename: "Image",
      id: string,
      uri: string,
      size: number,
    } | null >,
    userId: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      description: string,
      email: string,
      avatar:  {
        __typename: "Image",
        id: string,
        uri: string,
        size: number,
      },
      birthday: string | null,
      sex: string,
      settings:  {
        __typename: "Settings",
        initAccountBalance: number,
        language: string,
        instruments: Array< string | null >,
        plan: string,
        device: string,
      },
      forexTransactions:  {
        __typename: "ModelForexTransactionConnection",
        nextToken: string | null,
      } | null,
      accountTransactions:  {
        __typename: "ModelAccountTransactionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListForexTransactionsQueryVariables = {
  id?: string | null,
  filter?: ModelForexTransactionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListForexTransactionsQuery = {
  listForexTransactions:  {
    __typename: "ModelForexTransactionConnection",
    items:  Array< {
      __typename: "ForexTransaction",
      id: string,
      orderTime: string,
      closeTime: string,
      side: string,
      isRecord: boolean,
      instrument: string,
      lot: number,
      price: number,
      takeProfit: number,
      stopLoss: number,
      close: number,
      pl: number,
      preComment: string,
      postComment: string,
      tags: Array< string | null >,
      images:  Array< {
        __typename: "Image",
        id: string,
        uri: string,
        size: number,
      } | null >,
      userId: string,
      user:  {
        __typename: "User",
        id: string,
        name: string,
        description: string,
        email: string,
        birthday: string | null,
        sex: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetAccountTransactionQueryVariables = {
  id: string,
};

export type GetAccountTransactionQuery = {
  getAccountTransaction:  {
    __typename: "AccountTransaction",
    id: string,
    time: string,
    type: string,
    amount: number,
    comment: string,
    tags: Array< string | null >,
    images:  Array< {
      __typename: "Image",
      id: string,
      uri: string,
      size: number,
    } | null >,
    userId: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      description: string,
      email: string,
      avatar:  {
        __typename: "Image",
        id: string,
        uri: string,
        size: number,
      },
      birthday: string | null,
      sex: string,
      settings:  {
        __typename: "Settings",
        initAccountBalance: number,
        language: string,
        instruments: Array< string | null >,
        plan: string,
        device: string,
      },
      forexTransactions:  {
        __typename: "ModelForexTransactionConnection",
        nextToken: string | null,
      } | null,
      accountTransactions:  {
        __typename: "ModelAccountTransactionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAccountTransactionsQueryVariables = {
  id?: string | null,
  filter?: ModelAccountTransactionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListAccountTransactionsQuery = {
  listAccountTransactions:  {
    __typename: "ModelAccountTransactionConnection",
    items:  Array< {
      __typename: "AccountTransaction",
      id: string,
      time: string,
      type: string,
      amount: number,
      comment: string,
      tags: Array< string | null >,
      images:  Array< {
        __typename: "Image",
        id: string,
        uri: string,
        size: number,
      } | null >,
      userId: string,
      user:  {
        __typename: "User",
        id: string,
        name: string,
        description: string,
        email: string,
        birthday: string | null,
        sex: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser:  {
    __typename: "User",
    id: string,
    name: string,
    description: string,
    email: string,
    avatar:  {
      __typename: "Image",
      id: string,
      uri: string,
      size: number,
    },
    birthday: string | null,
    sex: string,
    settings:  {
      __typename: "Settings",
      initAccountBalance: number,
      language: string,
      notification:  {
        __typename: "Notification",
        email: boolean,
        push: boolean,
      },
      instruments: Array< string | null >,
      plan: string,
      device: string,
    },
    forexTransactions:  {
      __typename: "ModelForexTransactionConnection",
      items:  Array< {
        __typename: "ForexTransaction",
        id: string,
        orderTime: string,
        closeTime: string,
        side: string,
        isRecord: boolean,
        instrument: string,
        lot: number,
        price: number,
        takeProfit: number,
        stopLoss: number,
        close: number,
        pl: number,
        preComment: string,
        postComment: string,
        tags: Array< string | null >,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    accountTransactions:  {
      __typename: "ModelAccountTransactionConnection",
      items:  Array< {
        __typename: "AccountTransaction",
        id: string,
        time: string,
        type: string,
        amount: number,
        comment: string,
        tags: Array< string | null >,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser:  {
    __typename: "User",
    id: string,
    name: string,
    description: string,
    email: string,
    avatar:  {
      __typename: "Image",
      id: string,
      uri: string,
      size: number,
    },
    birthday: string | null,
    sex: string,
    settings:  {
      __typename: "Settings",
      initAccountBalance: number,
      language: string,
      notification:  {
        __typename: "Notification",
        email: boolean,
        push: boolean,
      },
      instruments: Array< string | null >,
      plan: string,
      device: string,
    },
    forexTransactions:  {
      __typename: "ModelForexTransactionConnection",
      items:  Array< {
        __typename: "ForexTransaction",
        id: string,
        orderTime: string,
        closeTime: string,
        side: string,
        isRecord: boolean,
        instrument: string,
        lot: number,
        price: number,
        takeProfit: number,
        stopLoss: number,
        close: number,
        pl: number,
        preComment: string,
        postComment: string,
        tags: Array< string | null >,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    accountTransactions:  {
      __typename: "ModelAccountTransactionConnection",
      items:  Array< {
        __typename: "AccountTransaction",
        id: string,
        time: string,
        type: string,
        amount: number,
        comment: string,
        tags: Array< string | null >,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser:  {
    __typename: "User",
    id: string,
    name: string,
    description: string,
    email: string,
    avatar:  {
      __typename: "Image",
      id: string,
      uri: string,
      size: number,
    },
    birthday: string | null,
    sex: string,
    settings:  {
      __typename: "Settings",
      initAccountBalance: number,
      language: string,
      notification:  {
        __typename: "Notification",
        email: boolean,
        push: boolean,
      },
      instruments: Array< string | null >,
      plan: string,
      device: string,
    },
    forexTransactions:  {
      __typename: "ModelForexTransactionConnection",
      items:  Array< {
        __typename: "ForexTransaction",
        id: string,
        orderTime: string,
        closeTime: string,
        side: string,
        isRecord: boolean,
        instrument: string,
        lot: number,
        price: number,
        takeProfit: number,
        stopLoss: number,
        close: number,
        pl: number,
        preComment: string,
        postComment: string,
        tags: Array< string | null >,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    accountTransactions:  {
      __typename: "ModelAccountTransactionConnection",
      items:  Array< {
        __typename: "AccountTransaction",
        id: string,
        time: string,
        type: string,
        amount: number,
        comment: string,
        tags: Array< string | null >,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateForexTransactionSubscription = {
  onCreateForexTransaction:  {
    __typename: "ForexTransaction",
    id: string,
    orderTime: string,
    closeTime: string,
    side: string,
    isRecord: boolean,
    instrument: string,
    lot: number,
    price: number,
    takeProfit: number,
    stopLoss: number,
    close: number,
    pl: number,
    preComment: string,
    postComment: string,
    tags: Array< string | null >,
    images:  Array< {
      __typename: "Image",
      id: string,
      uri: string,
      size: number,
    } | null >,
    userId: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      description: string,
      email: string,
      avatar:  {
        __typename: "Image",
        id: string,
        uri: string,
        size: number,
      },
      birthday: string | null,
      sex: string,
      settings:  {
        __typename: "Settings",
        initAccountBalance: number,
        language: string,
        instruments: Array< string | null >,
        plan: string,
        device: string,
      },
      forexTransactions:  {
        __typename: "ModelForexTransactionConnection",
        nextToken: string | null,
      } | null,
      accountTransactions:  {
        __typename: "ModelAccountTransactionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateForexTransactionSubscription = {
  onUpdateForexTransaction:  {
    __typename: "ForexTransaction",
    id: string,
    orderTime: string,
    closeTime: string,
    side: string,
    isRecord: boolean,
    instrument: string,
    lot: number,
    price: number,
    takeProfit: number,
    stopLoss: number,
    close: number,
    pl: number,
    preComment: string,
    postComment: string,
    tags: Array< string | null >,
    images:  Array< {
      __typename: "Image",
      id: string,
      uri: string,
      size: number,
    } | null >,
    userId: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      description: string,
      email: string,
      avatar:  {
        __typename: "Image",
        id: string,
        uri: string,
        size: number,
      },
      birthday: string | null,
      sex: string,
      settings:  {
        __typename: "Settings",
        initAccountBalance: number,
        language: string,
        instruments: Array< string | null >,
        plan: string,
        device: string,
      },
      forexTransactions:  {
        __typename: "ModelForexTransactionConnection",
        nextToken: string | null,
      } | null,
      accountTransactions:  {
        __typename: "ModelAccountTransactionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteForexTransactionSubscription = {
  onDeleteForexTransaction:  {
    __typename: "ForexTransaction",
    id: string,
    orderTime: string,
    closeTime: string,
    side: string,
    isRecord: boolean,
    instrument: string,
    lot: number,
    price: number,
    takeProfit: number,
    stopLoss: number,
    close: number,
    pl: number,
    preComment: string,
    postComment: string,
    tags: Array< string | null >,
    images:  Array< {
      __typename: "Image",
      id: string,
      uri: string,
      size: number,
    } | null >,
    userId: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      description: string,
      email: string,
      avatar:  {
        __typename: "Image",
        id: string,
        uri: string,
        size: number,
      },
      birthday: string | null,
      sex: string,
      settings:  {
        __typename: "Settings",
        initAccountBalance: number,
        language: string,
        instruments: Array< string | null >,
        plan: string,
        device: string,
      },
      forexTransactions:  {
        __typename: "ModelForexTransactionConnection",
        nextToken: string | null,
      } | null,
      accountTransactions:  {
        __typename: "ModelAccountTransactionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateAccountTransactionSubscription = {
  onCreateAccountTransaction:  {
    __typename: "AccountTransaction",
    id: string,
    time: string,
    type: string,
    amount: number,
    comment: string,
    tags: Array< string | null >,
    images:  Array< {
      __typename: "Image",
      id: string,
      uri: string,
      size: number,
    } | null >,
    userId: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      description: string,
      email: string,
      avatar:  {
        __typename: "Image",
        id: string,
        uri: string,
        size: number,
      },
      birthday: string | null,
      sex: string,
      settings:  {
        __typename: "Settings",
        initAccountBalance: number,
        language: string,
        instruments: Array< string | null >,
        plan: string,
        device: string,
      },
      forexTransactions:  {
        __typename: "ModelForexTransactionConnection",
        nextToken: string | null,
      } | null,
      accountTransactions:  {
        __typename: "ModelAccountTransactionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAccountTransactionSubscription = {
  onUpdateAccountTransaction:  {
    __typename: "AccountTransaction",
    id: string,
    time: string,
    type: string,
    amount: number,
    comment: string,
    tags: Array< string | null >,
    images:  Array< {
      __typename: "Image",
      id: string,
      uri: string,
      size: number,
    } | null >,
    userId: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      description: string,
      email: string,
      avatar:  {
        __typename: "Image",
        id: string,
        uri: string,
        size: number,
      },
      birthday: string | null,
      sex: string,
      settings:  {
        __typename: "Settings",
        initAccountBalance: number,
        language: string,
        instruments: Array< string | null >,
        plan: string,
        device: string,
      },
      forexTransactions:  {
        __typename: "ModelForexTransactionConnection",
        nextToken: string | null,
      } | null,
      accountTransactions:  {
        __typename: "ModelAccountTransactionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAccountTransactionSubscription = {
  onDeleteAccountTransaction:  {
    __typename: "AccountTransaction",
    id: string,
    time: string,
    type: string,
    amount: number,
    comment: string,
    tags: Array< string | null >,
    images:  Array< {
      __typename: "Image",
      id: string,
      uri: string,
      size: number,
    } | null >,
    userId: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      description: string,
      email: string,
      avatar:  {
        __typename: "Image",
        id: string,
        uri: string,
        size: number,
      },
      birthday: string | null,
      sex: string,
      settings:  {
        __typename: "Settings",
        initAccountBalance: number,
        language: string,
        instruments: Array< string | null >,
        plan: string,
        device: string,
      },
      forexTransactions:  {
        __typename: "ModelForexTransactionConnection",
        nextToken: string | null,
      } | null,
      accountTransactions:  {
        __typename: "ModelAccountTransactionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
