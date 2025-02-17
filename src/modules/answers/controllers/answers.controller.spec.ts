import { Test, TestingModule } from '@nestjs/testing';
import { AnswersService } from '../services/answers.service';
import { AnswersController } from './answers.controller';

describe('ProspectController', () => {
  let controller: AnswersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswersController],
      providers: [AnswersService],
    }).compile();

    controller = module.get<AnswersController>(AnswersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
