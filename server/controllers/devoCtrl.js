module.exports = {
  createDevo: async (req, res) => {
    const db = req.app.get("db");
    const { date, book, chapter, verses, analysis, prayers, id } = req.body;

    await db.posts.devos.add_devo({
      date,
      book,
      chapter,
      verses,
      analysis,
      prayers,
      id,
    });

    res.sendStatus(200);
  },
  readDevos: async (req, res) => {
    const db = req.app.get("db");
    const id = req.params.userId;

    const devos = await db.posts.devos.get_devos({ id });

    res.status(200).send(devos);
  },
  editDevos: async (req, res) => {
    const db = req.app.get("db");
    const { date, book, chapter, verses, analysis, prayers, id } = req.body;
    const devosId = req.params.id;

    await db.posts.devos.edit_devo({
      date,
      book,
      chapter,
      verses,
      analysis,
      prayers,
      id,
      devosId,
    });

    res.sendStatus(200);
  },
  readDevo: async (req, res) => {
    const db = req.app.get("db");
    const id = req.params.userId;
    const devosId = req.params.id;

    const devo = await db.posts.devos.get_devo({ id, devosId });

    res.status(200).send(devo);
  },
  deleteDevo: async (req, res) => {
    const db = req.app.get("db");
    const id = req.params.userId;
    const devosId = req.params.id;

    await db.posts.devos.delete_devo({ id, devosId });

    res.sendStatus(200);
  },
  getDevoBasedOn: async (req, res) => {
    const db = req.app.get("db");
    const { date, userId } = req.params;

    const devos = await db.posts.devos.get_devos_anything([userId, date]);

    res.status(200).send(devos);
  },
};
