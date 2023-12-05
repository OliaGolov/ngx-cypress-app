class DateGenerator {
    constructor() {
      this.today = new Date();
      this.currentMonth = this.today.toLocaleString("default", { month: "short" }); // Month is zero-based, so we add 1
      this.currentYear = this.today.getFullYear();
    }
  
    getCurrentDate() {
      return {
        year: this.currentYear,
        month: this.currentMonth,
        day: this.today.getDate()
      };
    }
  
    getRandomDay() {
      const randomDay = Math.floor(Math.random() * this.daysInMonth) + 1;
      return {
        year: this.currentYear,
        month: this.currentMonth,
        day: randomDay
      };
    }
  }
  
  export {DateGenerator}