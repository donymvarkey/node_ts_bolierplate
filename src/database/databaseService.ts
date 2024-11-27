import mongoose from 'mongoose';
import config from '../config';

export default {
  connect: async () => {
    try {
      await mongoose.connect(config.database_url as string);
      return mongoose.connection;
    } catch (err) {
      throw err;
    }
  }
};

