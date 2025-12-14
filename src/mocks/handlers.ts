import { http, HttpResponse } from 'msw';

// Define the Base URL to match the one in src/api/client.ts
const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const handlers = [
  // Mock Get User Detail
  http.get(`${BASE_URL}/users/:id`, ({ params }) => {
    const { id } = params;

    // Simulate 404 for specific ID
    if (id === '99999') {
      return new HttpResponse(null, { status: 404, statusText: 'Not Found' });
    }
    
    // Simulate 500 for specific ID
    if (id === '500') {
      return new HttpResponse(null, { status: 500, statusText: 'Internal Server Error' });
    }

    return HttpResponse.json({
      id: Number(id),
      name: 'Mocked User',
      username: 'mockuser',
      email: 'mock@example.com',
      address: {
        street: 'Mock Street',
        suite: 'Apt. 123',
        city: 'Mock City',
        zipcode: '12345-6789',
        geo: {
          lat: '-37.3159',
          lng: '81.1496',
        },
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Mock Company',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets',
      },
    });
  }),
];
