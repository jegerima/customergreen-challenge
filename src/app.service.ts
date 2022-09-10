import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  landing(): string {
    return '<h4>Welcome to CustomerGreen API</h4><h5><a href="/api-docs">Documentation</a></h5>';
  }
}
