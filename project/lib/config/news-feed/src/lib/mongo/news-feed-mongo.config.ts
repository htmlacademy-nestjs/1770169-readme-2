import { registerAs } from '@nestjs/config';

import { getMongooseConfig } from '@project/lib/shared/helpers';

export const NewsFeedMongoConfig = registerAs('newsFeedMongo', getMongooseConfig);
