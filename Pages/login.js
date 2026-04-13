export class Login {

  constructor (page) {
    this.page = page;
    this.loginlink = '//a[@href="/login"]';
    this.emailInput = '#Email';
    this.passwordInput = '#Password';
    this.loginButton = 'input.login-button';
    this.loginErrorMessage = '//div[@class="message-error"]';
  }

  async loginUser(email, password) {
    //await this.page.click(this.loginlink);
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    console.log(`Logged in with email: ${email} and password: ${password}`);
  } 
}