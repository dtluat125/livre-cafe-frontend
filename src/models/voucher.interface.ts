export interface VoucherInterface {
  _id: string;
  name: string;
  correspondingRank: string;
  available: boolean;
  pointsCost: number;
  percentageDiscount: number;
  maxAmount: number;
  fontColor?: string;
}

export type VoucherPostData = Omit<VoucherInterface, '_id'>;
