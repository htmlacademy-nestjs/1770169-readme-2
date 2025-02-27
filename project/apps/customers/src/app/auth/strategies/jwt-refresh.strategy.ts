import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { CustomersJwtConfig } from '@project/lib/config/customers';
import { RefreshTokenPayload } from '@project/lib/shared/app/types';

import { AuthService } from '../auth.service';
import { RefreshTokenService } from '../../refresh-token/refresh-token.service';
import { TokenNotExistsExceptions } from '../exceptions/token-not-exists.exception';

export class JWTRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @Inject(CustomersJwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof CustomersJwtConfig>,
    private readonly authService: AuthService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtOptions.refreshTokenSecret,
    })
  }

  public async validate(payload: RefreshTokenPayload) {
    if(!await this.refreshTokenService.isExists(payload.tokenId)) {
      throw new TokenNotExistsExceptions(payload.tokenId)
    }
    await this.refreshTokenService.deleteRefreshSession(payload.tokenId);
    await this.refreshTokenService.deleteExpiredRefreshTokens();

    return this.authService.getUserByEmail(payload.email);
  }
}
