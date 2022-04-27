import { Response } from 'express';

export const res: Response = {
  status: (status: number) => {
    return {
      send: (data: any) => {
        return data;
      },
      json: (data: any) => {
        return data;
      },
    };
  },
  json: (data: any) => {
    return data;
  },
} as Response;
