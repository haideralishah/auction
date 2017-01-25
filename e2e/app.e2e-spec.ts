import { ReduxIntroPage } from './app.po';

describe('redux-intro App', function() {
  let page: ReduxIntroPage;

  beforeEach(() => {
    page = new ReduxIntroPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
