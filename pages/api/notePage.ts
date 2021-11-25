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
    if (req.method === 'POST') {
      try {
        mongoClient.connect(async err => {
          const { pageId, owner, contentId, content, type } = req.query;
          if (type === 'title') {
            await mongoClient
              .db('note')
              .collection('file')
              .updateOne({ id: pageId, owner }, { $set: { title: content } });
          } else {
            await mongoClient
              .db('note')
              .collection('file')
              .updateOne({ id: pageId, owner, 'contents.id': contentId }, { $set: { content } });
          }
        });
      } catch (err) {}
    }
  });
}
