export type Search = {
  productId?: string;
  name?: string;
  url?: string;
};

export type Book = {
  isbn?: string;
  name?: string;
  author?: string;
  publisher?: string;
  prices?: Price[];
  description?: string;
  images?: string[];
  url?: string;
};

export type Price = {
  currency?: 'HKD' | 'TWD';
  amount?: number;
  isDiscounted?: boolean;
};
