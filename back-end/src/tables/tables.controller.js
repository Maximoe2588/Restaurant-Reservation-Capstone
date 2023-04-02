const service = require("./tables.service");

async function list(req, res) {
    const tables = await service.list();
    res.locals.data = tables;
    const { data } = res.locals;
    res.json({ data: data });
}


    async function create(req, res) {
    const data = await service.create(req.body.data);
    res.status(201).json({ data });
}


    async function read(req, res) {
    const { table } = res.locals;
    res.json({ data: table });
}