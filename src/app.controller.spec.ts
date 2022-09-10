import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return Landing Page', () => {
      expect(appController.landing()).toBe(
        '<h4>Welcome to CustomerGreen API</h4><h5><a href="/api-docs">Documentation</a></h5>',
      );
    });
  });
});
