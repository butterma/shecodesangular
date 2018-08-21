import { ForumsModule } from './forums.module';

describe('ForumsModule', () => {
  let forumsModule: ForumsModule;

  beforeEach(() => {
    forumsModule = new ForumsModule();
  });

  it('should create an instance', () => {
    expect(forumsModule).toBeTruthy();
  });
});
