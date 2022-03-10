import { Request, Response } from 'express';
import knex from '../../database/connection';

import aws from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import schemas from '../../config/joiSchemas';

class FilesController {
  async store(req: Request, res: Response) {
    try {
      if (!req.file)
        return res.status(400).send({ message: 'File not received' });

      let { originalname: name, size, key, location: url = '' } = (req.file as any);

      if (!name || !size || !key || !url)
        return res.status(400).send({ message: 'Failed to extract information from file' });

      if (!url) {
        url = `${process.env.APP_URL}/files/${key}`;
      }

      const now = new Date();

      const body: any = {
        name,
        size,
        key,
        url,
        createdAt: now,
        updatedAt: now
      };

      const newFile = await knex('files').insert(body).returning('*');

      return res.json(newFile);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Something went wrong, we will get back to you shortly",
        error: error
      });
    }
  };

  async index(req: Request, res: Response) {
    try {
      let files = await knex('files');
        
      return res.json(files);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Something went wrong, we will get back to you shortly",
        error: error
      });
    }
  };

  async find(req: Request, res: Response) {
    try {
      let url: string | any = req.query.url || "";

      // Valida corpo da requisição com formato esperado
      await schemas.searchFileSchema.query.validateAsync(req.query);

      const file = await knex('files')
        .where('url', url)
        .first();

      if(!file){
        return res.status(404).json({ message: 'File not found.'});
      }

      return res.json(file);
    } catch (error) {
      console.log(error);

      if(error.details){
        return res.status(400).send({ message: error.details[0].message });
      };

      return res.status(500).send({
        message: "Something went wrong, we will get back to you shortly",
        error: error
      });
    }
  };

  async destroy(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const s3 = new aws.S3();

      let file = await knex('files')
        .where('id', id)
        .first();

      if (process.env.STORAGE_TYPE == 's3') {
        await s3.deleteObject({
          Bucket: process.env.BUCKET_NAME as string,
          Key: file.key,
        }).promise();
      } else {
        await promisify(fs.unlink)(
          path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', file.key)
        );
      }

      if (!file)
        return res.status(404).send({ message: 'File not found' });

      file = await knex('files')
        .where('id', id)
        .delete();

      return res.json({
        filesDeleted: file
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Something went wrong, we will get back to you shortly",
        error: error
      });
    }
  };
};

export default new FilesController;