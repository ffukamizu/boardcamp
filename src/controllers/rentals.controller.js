import { db } from '../database/database.connection.js';
import dayjs from 'dayjs';

export async function getRentals(req, res) {
    try {
        const rentals = await db.query(
            `
            SELECT rentals.*, 
                JSON_BUILD_OBJECT("id", customers.id, "name", customers.name as customer, 
                JSON_BUILD_OBJECT("id", games.id, "name", games.name) as game,
                TO_CHAR(rentals."rentDate", 'YYYY-MM-DD') AS "rentDate",
                TO_CHAR(rentals."returnDate", 'YYYY-MM-DD') AS "returnDate",
            FROM rentals
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON rentals."gameId" = games.id;
            `
        );

        res.status(200).send(rentals.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function postRentals(req, res) {
    const { customerId, gameId, daysRented } = req.body;

    try {
        const customers = await db.query(
            `
            SELECT *
            FROM customers
            WHERE id = $1;
            `,
            [customerId]
        );

        if (customers.rows.length === 0) return res.sendStatus(404);

        const games = await db.query(
            `
            SELECT *
            FROM games
            WHERE id = $1;
            `,
            [gameId]
        );

        if (games.rows.length === 0) return res.sendStatus(404);

        const rentals = await db.query(
            `
            SELECT COUNT(*)
            FROM rentals
            WHERE "gameId" = $1 AND "returnDate" IS null;
            `,
            [gameId]
        );

        if (Number(rented.rows[0].count) >= Number(game.rows[0].stockTotal)) {
            return res.status(400).send('No copies available');
        }

        await db.query(
            `
            INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate, "originalPrice", "delayFee")
            VALUES ($1, $2, $3, $4, $5, $6, $7);
            `,
            [customerId, gameId, dayjs().format('YYYY-MM-DD'), daysRented, null, daysRented * game.rows[0].pricePerDay, null]
        );

         res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function postRentalsId(req, res) {
    const { id } = req.params;

    try {
        const rentals = await db.query(
            `
            SELECT *
            FROM rentals
            WHERE "id" = $1;
            `,
            [id]
        );

        if (rentals.rows.length === 0) return res.sendStatus(404);

        if (rentals.rows[0].returnDate !== null) return res.sendStatus(400);

        const returnDate = dayjs(Date.now()).format('YYYY-MM-DD');

        const feePerDay = Number(rentals.rows[0].originalPrice) / Number(rentals.rows[0].daysRented);

        const returnDateObj = dayjs(returnDate);
        const rentDateObj = dayjs(rentals.rows[0].rentDate);

        const timeDifferenceMs = returnDateObj.diff(rentDateObj);

        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const daysDifference = Math.round(timeDifferenceMs / millisecondsPerDay);

        const delayFee = Math.max(feePerDay * daysDifference, 0);

        await db.query(
            `
            UPDATE rentals
            SET "returnDate" = $1, "delayFee" = $2 
            WHERE "id" = $3;
            `,
            [returnDate, delayFee, id]
        );

        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deleteRentals(req, res) {
    const { id } = req.params;

    try {
        const rentals = await db.query(
            `
            SELECT *
            FROM rentals
            WHERE "id" = $1;
            `,
            [id]
        );

        if (rentals.rows.length === 0) return res.sendStatus(404);

        if (rentals.rows[0].returnDate === null) return res.sendStatus(400);

        await db.query(
            `
            DELETE FROM rentals
            WHERE "id" = $1;
            `,
            [id]
        );

        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
}
