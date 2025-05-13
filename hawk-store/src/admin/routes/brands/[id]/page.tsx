import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Container, Heading, Text } from '@medusajs/ui';
import { sdk } from '../../../lib/sdk'; // adjust import if needed
import { Brand } from '../_helpers/types';

type BrandData = {
  brand: Brand[];
};

const BrandDetailPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery<BrandData>({
    queryKey: ['brand', id],
    queryFn: () => sdk.client.fetch(`/admin/brands/${id}`),
  });

  if (isLoading && !data) {
    return <div>Loading...</div>;
  }

  const brand = data?.brand[0];

  if (!brand) {
    return <div>Brand not found</div>;
  }

  return (
    <Container className='p-6'>
      Hello World
      <Heading>{brand.name}</Heading>
      <Text className='text-sm text-gray-500'>ID: {brand.id}</Text>
      {brand.description && <Text className='mt-2'>{brand.description}</Text>}
      <div className='mt-6'>
        <Heading level='h2'>Linked Products</Heading>
        <ul className='mt-2 space-y-2'>
          {brand.products?.length ? (
            brand.products.map((product: any) => (
              <li key={product.id}>
                <a
                  href={`/app/products/${product.id}`}
                  className='text-blue-600 underline hover:text-blue-800'
                >
                  {product.title}
                </a>
              </li>
            ))
          ) : (
            <Text>No products linked to this brand.</Text>
          )}
        </ul>
      </div>
    </Container>
  );
};

export default BrandDetailPage;
