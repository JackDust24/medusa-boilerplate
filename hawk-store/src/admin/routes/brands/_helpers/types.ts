type BrandProduct = {
  id: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
};

type Brand = {
  id: string;
  name: string;
  products: BrandProduct[];
  description: string | null;
  logo: string | null;
  website: string | null;
};

type BrandsResponse = {
  brands: Brand[];
  count: number;
  limit: number;
  offset: number;
};

export type { Brand, BrandsResponse, BrandProduct };
