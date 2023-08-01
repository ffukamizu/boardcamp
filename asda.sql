SELECT
    id,
    name,
    phone,
    cpf,
    TO_CHAR (birthday, 'YYYY-MM-DD') AS birthday
FROM
    customers