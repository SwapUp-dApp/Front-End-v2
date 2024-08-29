export enum SUE_SWAP_MODE {
  OPEN = 0,
  PRIVATE = 1,
}

export enum SUE_SWAP_OFFER_TYPE {
  PRIMARY = 0,
  COUNTER = 1
}

export enum SUE_SWAP_MODE_TO_STRING {
  value0 = 'open',
  value1 = 'private',
}

export enum SUE_SWAP_OFFER_TYPE_TO_STRING {
  value0 = 'primary',
  value1 = 'counter',
}

export enum SUE_SWAP_STATUS {
  PENDING = 1,
  COMPLETED = 2,
  DECLINED = 3,
  CANCELED = 4,
}

export enum SUE_SWAP_STATUS_TO_STRING {
  value1 = 'pending',
  value2 = 'completed',
  value3 = 'declined',
  value4 = 'canceled',
}

export enum SUE_SWAP_REQUEST_TO_STRING {
  true = 'sent',
  false = 'received'
}