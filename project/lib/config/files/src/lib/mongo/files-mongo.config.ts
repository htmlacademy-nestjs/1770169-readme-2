import { registerAs } from '@nestjs/config';

import { getMongooseConfig } from '@project/lib/shared/helpers';

export default registerAs('filesMongo', getMongooseConfig);
