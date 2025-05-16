// next-tenant/pages/index.tsx
'use client';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'http://localhost:4001/widget.js';
    script.defer = true;
    script.dataset.clientId = 'acme123';
    script.dataset.color = '#2563eb';
    document.body.appendChild(script);
  }, []);

  const handleEnterStore = async () => {
    const res = await fetch('http://localhost:4001/get-token'); // fakeERP returns a token
    const { token } = await res.json();

    const returnUrl = encodeURIComponent(window.location.href);
    const storefrontUrl = `http://localhost:8000?token=${token}&returnUrl=${returnUrl}`;

    window.location.href = storefrontUrl;
  };

  return (
    <main className='flex gap-4 p-4 flex-col items-center h-screen'>
      <h1>Tenant Portal</h1>
      <button
        onClick={handleEnterStore}
        className='bg-blue-600 text-white px-4 py-2 rounded'
      >
        Enter Store
      </button>
      <h1>Tenant Portal via Widget</h1>
      <div id='widget-container' className='mt-4 text-center' />
    </main>
  );
}
