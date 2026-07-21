import mysql from 'mysql2/promise';

export const pool = process.env.DATABASE_URL
  ? mysql.createPool(process.env.DATABASE_URL)
  : null;

export async function query(text, params = []) {
  if (!pool) {
    throw new Error('DATABASE_URL is not configured.');
  }

  // Convert positional $1, $2 placeholders if present, and remove RETURNING clause for MySQL
  let formattedText = text;
  if (/\$\d+/.test(formattedText)) {
    formattedText = formattedText.replace(/\$\d+/g, '?');
  }
  if (/RETURNING\s+id/gi.test(formattedText)) {
    formattedText = formattedText.replace(/RETURNING\s+id/gi, '');
  }

  const [rows] = await pool.query(formattedText, params);
  
  // Standardize INSERT result structure across database drivers
  if (rows && typeof rows === 'object' && rows.insertId !== undefined) {
    return { rows: [{ id: rows.insertId }] };
  }

  // For SELECT queries, return rows array
  return { rows: Array.isArray(rows) ? rows : [rows] };
}