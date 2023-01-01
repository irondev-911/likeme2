const pool = require("../db");

const getAllPosts = async (req, res) => {
    try {
        const result = await pool.query("SELECT id, titulo, descripcion, img, likes FROM posts ORDER BY id;")
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.json({ message: "Hemos tenido problemas con la petición" })
    }
}

const createPost = async (req, res) => {
    try {
        const { titulo, url, descripcion } = req.body;
        const sql = "INSERT INTO posts(titulo, img, descripcion) VALUES($1, $2, $3) RETURNING *";
        const result = await pool.query(sql, [titulo, url, descripcion])
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Hemos tenido problemas para procesar la petición en el servidor" })
    }
}

const updatePost = async (req, res) => {

    try {
        const id = req.params.id;
        let counter = 0;
        const sql = "UPDATE posts SET likes=$1 WHERE id=$2";
        const result = await pool.query("SELECT likes FROM posts WHERE id = $1", [id])
        if (result.rows[0].likes === null) {
            console.log(result.rows[0]);
            counter = 1;
        } else {
            counter = result.rows[0].likes + 1;
        }
        await pool.query(sql, [counter, id]);
        res.status(200).json({ message: "updated" })
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Hemos tenido problemas para procesar la petición en el servidor" })
    }
}
const deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = "DELETE FROM posts WHERE id = $1";
        await pool.query(sql, [id]);
        res.status(204).send()

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Hemos tenido problemas para procesar la petición en el servidor" })
    }
}

module.exports = {
    getAllPosts,
    createPost,
    updatePost,
    deletePost
}
