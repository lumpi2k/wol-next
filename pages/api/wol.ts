import type { NextApiRequest, NextApiResponse } from 'next';
import wakeOnLan from 'wake_on_lan';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const nasMacAddress = process.env.NEXT_PUBLIC_NAS_MAC_ADDRESS;

  if (!nasMacAddress) {
    res.status(500).json({ message: 'NAS MAC address is not defined in the environment variables' });
    return;
  }

  try {
    await wakeOnLan.wake(nasMacAddress);
    res.status(200).json({ message: 'Magic packet sent' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending magic packet: ' + (error as Error).message });
  }
}
