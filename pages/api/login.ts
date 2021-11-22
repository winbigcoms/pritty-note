import type { NextApiRequest, NextApiResponse } from 'next';
import mongoClient from '../../connect/mongo';

export default function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }
  return new Promise<void>(resolve => {
    const { id, pw } = JSON.parse(req.body);

    try {
      mongoClient.connect(async err => {
        const isRight = await mongoClient
          .db('note')
          .collection('user')
          .findOne({
            id,
            pw
          })
          .then(res => res);

        if (isRight) {
          res.send({ result: true, data: { id: isRight.id, name: isRight.name } });
          return;
        }
        res.send({ result: false });
        mongoClient.close();
      });
    } catch (err) {
      res.send({ result: false, message: '서버에러' });
      return resolve();
    }
  });
}
