import pjson from '../../package.json';

export default async function version(req, res) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      res.statusCode = 200;
      res.json(pjson.version);
      resolve();
    }, 3000);
  });
}
