/* eslint-disable no-console */
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

// Initialize CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'],
});

// Helper function to run the middleware
const runCorsMiddleware = (req: NextApiRequest, res: NextApiResponse) =>
  new Promise<void>((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cors(req, res, (result: any) => {
      if (result instanceof Error) {
        reject(result);
      } else {
        resolve();
      }
    });
  });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the CORS middleware before handling the request
  await runCorsMiddleware(req, res);

  if (req.method === 'POST') {
    try {
      const { origin, destination, weight, courier } = req.body;

      // Prepare the form data for Rajaongkir API
      const formData = new URLSearchParams({
        origin,
        destination,
        weight: String(weight),
        courier,
      });

      const apiKey = process.env.NEXT_PUBLIC_RAJAONGKIR_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'API key is missing' });
      }

      // Send the request to Rajaongkir API
      const response = await fetch('https://api.rajaongkir.com/starter/cost', {
        method: 'POST',
        headers: {
          key: apiKey,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });

      // Log the response status for debugging
      // !! DEBUGGING ONLY
      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text(); // Log the response text to see if there's an error
        // !! DEBUGGING ONLY
        console.error('API error response:', errorText);
        throw new Error('Failed to fetch shipping cost');
      }

      // Parse the response JSON
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        // !! DEBUGGING ONLY
        console.error('Error parsing response JSON:', jsonError);
        return res.status(500).json({ error: 'Failed to parse response JSON' });
      }

      // If successful, send the data back to the frontend
      res.status(200).json(data);
    } catch (error) {
      // !! DEBUGGING ONLY
      console.error(error);
      res.status(500).json({ error: 'Failed to calculate shipping cost' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

// import axios from 'axios';
// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === 'POST') {
//     try {
//       const { origin, destination, weight, courier } = req.body;

//       // Send request to Rajaongkir API
//       const response = await axios.post(
//         'https://api.rajaongkir.com/starter/cost',
//         new URLSearchParams({
//           origin,
//           destination,
//           weight: String(weight),
//           courier,
//         }),
//         {
//           headers: {
//             key: process.env.RAJAONGKIR_API_KEY,
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//         }
//       );

//       // Send the shipping cost data back to the frontend
//       res.status(200).json(response.data);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Failed to calculate shipping cost' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method Not Allowed' });
//   }
// }

// export default async function handler2(req, res) {
//   const host = process.env.NEXT_PUBLIC_RAJAONGKIR_HOST;
//   const key = process.env.NEXT_PUBLIC_RAJAONGKIR_KEY;
//   try {
//     const { waybill, courier } = req.body;
//     const response = await fetch(`${host}/waybill`, {
//       method: "POST",
//       body: JSON.stringify({
//         waybill,
//         courier,
//         key,
//       }),
//       headers: { "Content-Type": "application/json" },
//     });
//     const data = await response.json();
//     if (!data?.rajaongkir?.result) {
//       res.status(400).json({ message: data?.rajaongkir?.status?.description });
//     }
//     res.status(200).json(data?.rajaongkir?.result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
