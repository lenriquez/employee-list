


export class Utils {

  static getAgeFromDate(date: string) {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    return (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) ? age-- : age;
  }
}
