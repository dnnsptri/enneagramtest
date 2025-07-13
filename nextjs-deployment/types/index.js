/**
 * @typedef {Object} Question
 * @property {number} id - Unieke identifier voor de vraag
 * @property {string} text - De vraag tekst
 * @property {number} type - Het Enneagram type waarmee deze vraag is geassocieerd (1-9)
 */

/**
 * @typedef {Object} EnneagramType
 * @property {number} id - Het type nummer (1-9)
 * @property {string} name - De naam van het type
 * @property {string} description - Beschrijving van het type
 * @property {string[]} strengths - Sterke punten van het type
 * @property {string[]} weaknesses - Uitdagingen/zwakke punten van het type
 */

/**
 * @typedef {Object} Result
 * @property {number} id - Unieke identifier voor het resultaat
 * @property {number[]} scores - Array met scores voor elk type (index 0 is type 1, etc.)
 * @property {number} primaryType - Het primaire Enneagram type
 * @property {number} secondaryType - Het secundaire Enneagram type (tri-type)
 * @property {number} tertiaryType - Het tertiaire Enneagram type (tri-type)
 * @property {Date} created_at - Datum waarop het resultaat is gemaakt
 */

/**
 * @typedef {Object} FormData
 * @property {Object.<string, number>} answers - Object met antwoorden (vraag ID als key, antwoord als waarde)
 */

export {};