import GoalIcon from 'icons/goal.svg';
import AssistsIcon from 'icons/assists.png';
import SaveIcon from 'icons/save.svg';
import YellowCardIcon from 'icons/yellow_card.svg';
import RedCardIcon from 'icons/red_card.svg';
import SubstitutionInIcon from 'icons/substitution_in.svg';
import SubstitutioOutIcon from 'icons/substitution_out.svg';

export default function createMatchEventIcon(matchEventType) {
   switch (matchEventType) {
      case 'Gol':
         return GoalIcon;
      case 'Asysta':
         return AssistsIcon;
      case 'Obrona':
         return SaveIcon;
      case 'Żółta kartka':
         return YellowCardIcon;
      case 'Czerwona kartka':
         return RedCardIcon;
      case 'Wejście na boisko':
         return SubstitutionInIcon;
      case 'Zejście z boiska':
         return SubstitutioOutIcon;
      default:
         return null;
   }
}
