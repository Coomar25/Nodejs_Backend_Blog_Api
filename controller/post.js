import createConnection from "../config/dbConnect.js";
import validatePostData from "../Request/validatePostData.js";
import joi from "joi";

const db = createConnection();

const generateSlug = (title) => {
  let slug = title.toLowerCase().replace(/\s+/g, "-");
  slug = slug.trim("-");
  if (slug.length < 3) {
    slug = `${slug}-${Math.random().toString(36).substring(2, 5)}`;
  }
  slug = slug.replace(/[^a-z0-9-]+/g, "");
  return slug;
};

export const addPost = async (req, res) => {
  let connection; // varibale lai initialize gareko connection garauna

  try {
    connection = await db.promise().getConnection(); //connection pauuxaam yeha bata
    validatePostData(req.body);
    const { title, description, content, category_id, image, uid } = req.body;
    const slug = generateSlug(title);
    console.log(slug);
    await connection.beginTransaction();
    const currentDate = new Date();
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const sqlSelect = `INSERT INTO posts(title, description, content, slug, category_id, image, date, uid) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    await connection.execute(sqlSelect, [
      title,
      description,
      content,
      slug,
      category_id,
      image,
      formattedDate,
      uid,
    ]);

    await connection.commit();

    res.status(200).json({
      message: "Post has been created",
      response: {
        title,
        description,
        content,
        slug,
        category_id,
        image,
        formattedDate,
        uid,
      },
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
 

    if (error instanceof joi.ValidationError) {   
      const validationErrorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      res.status(400).json({ error: validationErrorMessage });
    } else if (error.code === "ER_DUP_ENTRY") {
      res.status(409).json({ error: "Post with this title already exists" });
    } else {
      console.error(error.message);
      res
        .status(500)
        .send({
            response: error.message
        });
    }


  } finally {
    if (connection) {
      connection.release(); 
    }
  }
};

export const editupdatePost = async (req, res) => {

};
