import dayjs from 'dayjs';

import { ConfigType } from '@nestjs/config';
import { Inject } from '@nestjs/common';

import { CustomersJwtConfig } from '@project/lib/config/customers';
import { RefreshTokenPayload } from '@project/lib/shared/app/types';

import { RefreshTokenRepository } from './refresh-token.repository';
import { RefreshTokenEntity } from './refresh-token.entity';
import { parseTime } from '@project/lib/shared/helpers';

export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    @Inject(CustomersJwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof CustomersJwtConfig>
  ) {}

  public async createRefreshSession(payload: RefreshTokenPayload) {
    const {value, unit} = parseTime(this.jwtOptions.refreshTokenExpiresIn);
    const refreshToken = new RefreshTokenEntity({
      tokenId: payload.tokenId,
      userId: payload.sub,
      expiresIn: dayjs().add(value, unit).toDate()
    });

    return this.refreshTokenRepository.save(refreshToken);
  }

  public async deleteRefreshSession(id: string) {
    await this.deleteExpiredRefreshTokens();
    return this.refreshTokenRepository.deleteByTokenId(id)
  }

  public async isExists(id: string) {
    const refreshToken = await this.refreshTokenRepository.findByTokenId(id);
    return (refreshToken !== null);
  }
  public async deleteExpiredRefreshTokens() {
    return this.refreshTokenRepository.deleteExpiredTokens();
  }
}
