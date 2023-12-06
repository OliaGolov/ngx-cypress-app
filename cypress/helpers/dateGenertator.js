class DateGenerator {
    
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