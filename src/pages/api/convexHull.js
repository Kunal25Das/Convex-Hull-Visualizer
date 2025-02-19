export default function handler(req, res) {
  if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { points } = req.body;
  if (!points || points.length < 3) {
      return res.status(400).json({ message: 'At least 3 points required' });
  }

  function crossProduct(o, a, b) {
      return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  }

  function jarvisMarch(points) {
      let hull = [];
      let leftMost = points.reduce((left, p) => (p.x < left.x ? p : left), points[0]);
      let current = leftMost;

      do {
          hull.push(current);
          let next = points[0];

          for (let i = 1; i < points.length; i++) {
              if (next === current || crossProduct(current, next, points[i]) < 0) {
                  next = points[i];
              }
          }
          current = next;
      } while (current !== hull[0]);

      return hull;
  }

  const hull = jarvisMarch(points);
  return res.status(200).json({ hull });
}
