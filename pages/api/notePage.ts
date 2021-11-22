import mongoClient from 'connect/mongo';
import { NextApiRequest, NextApiResponse } from 'next';

export default function note(req: NextApiRequest, res: NextApiResponse) {
  return new Promise<void>(resolve => {
    if (req.method === 'GET') {
      try {
        mongoClient.connect(async err => {
          const contents = await mongoClient
            .db('note')
            .collection('file')
            .findOne({ id: req.query.id, owner: req.query.owner });

          res.send({ contents });
          mongoClient.close();
        });
      } catch (err) {
        res.send({ contents: [] });
        return resolve();
      }
    }
  });
}
