export default async function handler(req, res) {
  try {
    res.status(200).json({ hello: "world" })
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}