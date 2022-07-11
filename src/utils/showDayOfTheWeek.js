export default function showDayOfTheWeek(numberOfDay) {
   switch (numberOfDay) {
      case 0:
         return 'poniedziałek';
      case 1:
         return 'wtorek';
      case 2:
         return 'środa';
      case 3:
         return 'czwartek';
      case 4:
         return 'piątek';
      case 5:
         return 'sobota';
      case 6:
         return 'niedziela';
      default:
         return numberOfDay;
   }
}
