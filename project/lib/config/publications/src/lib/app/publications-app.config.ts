import { registerAs } from '@nestjs/config';

import { getAppConfig } from '@project/lib/shared/helpers';

export default registerAs('publicationsApp', getAppConfig);
