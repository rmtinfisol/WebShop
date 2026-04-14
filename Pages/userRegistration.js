
export class UserRegistration {

  constructor(page) {
    this.page = page;
    this.registerlink = "a.ico-register";
    this.genderMale = '#gender-male';
    this.genderFemale = '#gender-female';
    this.firstName = '#FirstName';
    this.lastName = '#LastName';
    this.email = '#Email';
    this.password = '#Password';
    this.confirmPassword = '#ConfirmPassword';
    this.registerButton = 'input#register-button';
    this.registrationSuccessMessage = '.result';
    this.continueButton = '//input[@value="Continue"]';
    this.userMyAccountInfoHeading = '.page-title > h1';

  }

  newUserRegistrationData = {
    gender: "Male",
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe1e@example.com',
    password: 'Password123'
  };

  async registerNewUser({ gender, firstName, lastName, email, password }) {

    if (gender === "Male") {
      await this.page.check(this.genderMale);
    } else {
      await this.page.check(this.genderFemale);
    }
    await this.page.fill(this.firstName, firstName);
    await this.page.fill(this.lastName, lastName);
    await this.page.fill(this.email, email);
    await this.page.fill(this.password, password);
    await this.page.fill(this.confirmPassword, password);
    await this.page.click(this.registerButton);
  }

  async registerNewUserwithRandomData() {

    const gender = Math.random() < 0.5 ? 'male' : 'female';
    const firstName = Math.random().toString(36).substring(2, 7);
    const lastName = Math.random().toString(36).substring(2, 7);
    const email = `${firstName}.${lastName}@example.com`;
    const password = 'Password123';


    if (gender === "Male") {
      await this.page.check(this.genderMale);
    } else {
      await this.page.check(this.genderFemale);
    }
    await this.page.fill(this.firstName, firstName);
    await this.page.fill(this.lastName, lastName);
    await this.page.fill(this.email, email);
    await this.page.fill(this.password, 'Password123');
    await this.page.fill(this.confirmPassword, 'Password123');
    await this.page.click(this.registerButton);
    return { gender, firstName, lastName, email, password };
  }

  clickContinueButton() {
    return this.page.click(this.continueButton);
  }

}


