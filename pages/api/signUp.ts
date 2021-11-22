import type { NextApiRequest, NextApiResponse } from 'next';
import mongoClient from '../../connect/mongo';

export default function signUp(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  const { loginID, loginPW, loginName } = JSON.parse(req.body);

  try {
    mongoClient.connect(async err => {
      const isDub = await mongoClient
        .db('note')
        .collection('user')
        .findOne({
          id: loginID
        })
        .then(res => res);

      if (isDub) {
        res.send({ result: false, message: '중복된 아이디입니다!' });

        return;
      }

      mongoClient.db('note').collection('user').insertOne({
        name: loginName,
        id: loginID,
        pw: loginPW
      });

      res.send({ result: true, message: '회원가입 성공' });
      mongoClient.close();
    });
  } catch (err) {
    res.send({ result: false, message: '서버에러' });
  }
}
