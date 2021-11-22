import mongoClient from 'connect/mongo';
import { NextApiRequest, NextApiResponse } from 'next';

export default function note(req: NextApiRequest, res: NextApiResponse) {
  return new Promise<void>(resolve => {
    if (req.method === 'GET') {
      try {
        mongoClient.connect(async err => {
          const list = await mongoClient
            .db('note')
            .collection('notes')
            .findOne({ owner: req.query.id })
            .then(res => res.list);

          res.send({ list });
          mongoClient.close();
        });
      } catch (err) {
        res.send({ list: [] });
        return resolve();
      }
    }
  });
}
