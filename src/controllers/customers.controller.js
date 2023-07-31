import { db } from '../database/database.connection.js';

export async function getCustomers(req, res) {
    try {
        const customers = await db.query(
            `
            SELECT * 
            FROM customers
            `
        );

        res.status(200).send(customers.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getCustomersId(req, res) {
    const { id } = req.params;

    try {
        const customers = await db.query(
            `
            SELECT *, TO_CHAR(birthday, 'YYYY-MM-DD') AS birthday 
            FROM customers 
            WHERE id = $1;
            `,
            [id]
        );

        if (customers.rows.length === 0) return res.sendStatus(404);

        res.status(200).send(customers.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function postCustomers(req, res) {
    const { name, phone, cpf, birthday } = req.body;

    try {
        const customers = await db.query(
            `
        SELECT *
        FROM customers
        WHERE cpf = $1
        `,
            [cpf]
        );

        if (customers.rows.length !== 0) return res.status(409).send('CPF already registered');

        await db.query(
            `
        INSERT INTO customers ("name", "phone", "cpf", "birthday")
        VALUES ($1, $2, $3, $4);
        `,
            [name, phone, cpf, birthday]
        );
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function putCustomers(req, res) {
    const { name, phone, cpf, birthday } = req.body;
    const { id } = req.params;

    try {
        const customers = await db.query(
            `
        SELECT *
        FROM customers
        WHERE cpf = $1;
        `,
            [cpf]
        );

        if (customers.rows.length > 0 && customers.rows[0].id !== Number(id)) {
            return res.status(409).send('CPF already registered');
        }

        await db.query(
            `
        UPDATE customers
        SET "name" = $1, "phone" = $2, "cpf" = $3, "birthday" = $4
        WHERE id = $5;
        `,
            [name, phone, cpf, birthday, id]
        );
    } catch (err) {
        res.status(500).send(err.message);
    }
}
