export class Addresses {

  constructor (page) {
    this.page = page;
    this.leftMenuAddressLink = "li a[href='/customer/addresses'][class='inactive']";
    this.userAccountinfo = '.header-links a.account';
    this.myAccountPageHeadingInfo = '.page-title > h1';
    this.addNewAddressButton = 'input.add-address-button';
    this.firstName = '#Address_FirstName';
    this.lastName = '#Address_LastName';
    this.email = '#Address_Email';
    this.company = '#Address_Company';
    this.country = 'select#Address_CountryId';
    this.city = '#Address_City';
    this.address1 = '#Address_Address1';
    this.zipPostalCode = "input[name='Address.ZipPostalCode']";
    this.phoneNumber = '#Address_PhoneNumber';
    this.saveButton = 'input[value="Save"]';
    this.addressList = '.address-list .address-item';
    this.editButton = 'input.edit-address-button';
  }

  addressData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe1e@example.com',
    company: 'Example Inc.',
    country: 'Austria',
    city: 'Vienna',
    address1: 'Vienna Street 1',
    zipPostalCode: '1234',
    phoneNumber: '00 11 22 33 44 55'

  }

  async addNewAddress(addressData) {
    const { firstName, lastName, email, company, country, city, address1, zipPostalCode, phoneNumber } = addressData;
    await this.page.locator(this.firstName).fill(firstName);
    await this.page.locator(this.lastName).fill(lastName);
    await this.page.locator(this.email).fill(email);
    await this.page.locator(this.company).fill(company);
    await this.page.locator(this.country).selectOption(country);
    await this.page.locator(this.city).fill(city);
    await this.page.locator(this.address1).fill(address1);
    await this.page.locator(this.zipPostalCode).fill(zipPostalCode);
    await this.page.locator(this.phoneNumber).fill(phoneNumber);
    await this.page.locator(this.saveButton).click();
    return addressData;
  }

  async getFirstAddressAdded(addressentry) {
    const { firstName, lastName, email, company, country, city, address1, zipPostalCode, phoneNumber } = addressentry;
    const addressEntry = this.page.locator('.address-list .address-item').first();
    return addressEntry;
  }

  async updateFirstAddressEntry(newAddressData) {
    const { firstName, lastName, email, company, country, city, address1, zipPostalCode, phoneNumber } = newAddressData;
    //await this.page.locator(this.addressList).first().locator(this.editButton).click();
    await this.page.locator(this.firstName).fill(firstName);
    await this.page.locator(this.lastName).fill(lastName);
    await this.page.locator(this.email).fill(email);
    await this.page.locator(this.company).fill(company);
    await this.page.locator(this.country).selectOption(country);
    await this.page.locator(this.city).fill(city);
    await this.page.locator(this.address1).fill(address1);
    await this.page.locator(this.zipPostalCode).fill(zipPostalCode);
    await this.page.locator(this.phoneNumber).fill(phoneNumber);
    await this.page.locator(this.saveButton).click();
    return newAddressData;

  }


}