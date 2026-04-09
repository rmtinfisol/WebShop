
export class UserRegistration {

  constructor (page) {
    this.page = page;
    this.registerlink = "a.ico-register";
    this.genderMale = '#gender-male';
    this.firstName = '#FirstName';
    this.lastName = '#LastName';
    this.email = '#Email';
    this.password = '#Password';
    this.confirmPassword = '#ConfirmPassword';
    this.registerButton = 'input#register-button';

  }

  async registerNewUser(firstName, lastName, email, password) {
    await this.page.check(this.genderMale);
    await this.page.fill(this.firstName, firstName);
    await this.page.fill(this.lastName, lastName);
    await this.page.fill(this.email, email);
    await this.page.fill(this.password, password);
    await this.page.fill(this.confirmPassword, password);
    await this.page.click(this.registerButton);
  }
}


